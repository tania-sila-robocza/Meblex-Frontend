/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import slugify from 'slugify';
import { toast } from 'react-toastify';
import FieldX from '../shared/FieldX';
import Button from '../shared/Button';
import { required, maxLength32 } from '../../validationRules';
import FieldWithColor from './fields/FieldWithColor';
import { fetchColors } from '../../redux/data';
import * as API from '../../api';

const colorMask = createTextMask({
  pattern: '#hhhhhh',
  maskDefinitions: {
    h: {
      regExp: /[A-Fa-f0-9]/,
      transform: char => char.toLowerCase(),
    },
  },
  guide: false,
  stripMask: false,
});

const ColorsForm = ({ error, reset, handleSubmit }) => {
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
      await API.addColor({ ...values, slug });
      toast(`✔️ Dodano kolor ${values.name}!`);
      reset();
      dispatch(fetchColors());
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
        <h4 css={style.fieldLabel}>Nazwa koloru:</h4>
        <Field
          name="name"
          component={FieldX}
          type="text"
          css={style.formField}
          validate={[required, maxLength32]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Kod koloru:</h4>
        <Field
          name="hexCode"
          component={FieldWithColor}
          type="text"
          css={style.formField}
          validate={[required, maxLength32]}
          {...colorMask}
        />
      </div>

      <div css={style.submitButton}>
        <Button type="submit" isLoading={isLoading}>Dodaj kolor</Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'colorsForm',
})(ColorsForm);
