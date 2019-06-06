/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import slugify from 'slugify';
import { toast } from 'react-toastify';
import FieldX from '../shared/FieldX';
import Button from '../shared/Button';
import { required, maxLength32 } from '../../validationRules';
import FieldWithPreview from './fields/FieldWithPreview';
import { fetchPatterns } from '../../redux/data';
import * as API from '../../api';


const PatternsForm = ({ handleSubmit, error, reset }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const style = {
    form: css`
      display: flex;
      flex-direction: column;
      background: #fff;
      box-shadow: 0px 1px 15px rgba(4, 35, 101, 0.22);
      border-radius: 5px;
      padding: 20px;
    `,

    formError: css`
      margin-top: 10px;
      margin-bottom: 10px;
      font-weight: bold;
      text-align: center;
      color: red;
    `,

    fieldWrapper: css`
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      margin: 10px 0;
      flex-direction: column;
    `,

    fieldLabel: css`
      margin: 0;
      margin-right: 20px;
      font-size: .9em;
      height: 42px;
      line-height: 42px;
    `,

    formField: css`
      flex: 1;
      min-width: 0;
      width: 100%;
    `,

    submitButton: css`
      margin: 30px 0;
      display: flex;
      flex-direction: column;
    `,
  };

  const submitForm = async (values) => {
    setIsLoading(true);
    try {
      const slug = slugify(values.name, { lower: true });
      const reader = new FileReader();
      reader.readAsDataURL(values.photo.files[0]);
      reader.onload = async () => {
        await API.addPattern({ ...values, slug, photo: reader.result });
        reset();
        toast(`✔️ Dodano wzór ${values.name}!`);
        dispatch(fetchPatterns());
      };
    } catch (error) {
      throw new SubmissionError({
        _error: error.title,
        ...error.errors,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form css={style.form} onSubmit={handleSubmit(submitForm)}>
      {error && <p css={style.formError}>{error}</p>}

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Nazwa wzoru:</h4>
        <Field
          name="name"
          component={FieldX}
          type="text"
          css={style.formField}
          validate={[required, maxLength32]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Zdjęcie wzoru:</h4>
        <Field
          name="photo"
          component={FieldWithPreview}
          css={style.formField}
          validate={[required]}
        />
      </div>

      <div css={style.submitButton}>
        <Button type="submit" isLoading={isLoading}>Dodaj wzór</Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'patternsForm',
})(PatternsForm);
