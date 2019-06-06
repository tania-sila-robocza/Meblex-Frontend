/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import FieldX from '../shared/FieldX';
import Button from '../shared/Button';
import { required, maxLength32, size } from '../../validationRules';
import ItemResult from '../catalog/ItemResult';
import * as API from '../../api';


const CustomSizeForm = ({ handleSubmit, error, item, reset }) => {
  const [formLoading, setFormLoading] = useState(false);

  const style = {
    furniture: css`
      padding: 0 0 20px;
    `,
    form: css`
      display: flex;
      flex-direction: column;
      background: #fff;
      box-shadow: 0px 1px 15px rgba(4, 35, 101, 0.22);
      border-radius: 5px;
      padding: 20px;
    `,

    formError: css`
      margin-top: -10px;
      margin-bottom: 20px;
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
    setFormLoading(true);
    try {
      await API.addCustomSizeRequest({
        pieceOfFurnitureId: item.id, ...values,
      });

      toast('✔️ Zapytanie zostało wysłane! Jego status możesz śledzić w profilu', {
        autoClose: 5000,
      });
      reset();
    } catch (error) {
      throw new SubmissionError({
        _error: error.title,
        ...error.errors,
      });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <form css={style.form} onSubmit={handleSubmit(submitForm)}>
      {error && <p css={style.formError}>{error}</p>}

      <div>
        <h4 css={style.fieldLabel}>Wybrany mebel:</h4>
        <ItemResult css={style.furniture} data={item} />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Proponowany rozmiar:</h4>
        <Field
          name="size"
          component={FieldX}
          type="text"
          css={style.formField}
          validate={[required, maxLength32, size]}
        />
      </div>

      <div css={style.submitButton}>
        <Button type="submit" isLoading={formLoading}>Wyślij zapytanie</Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'customSize',
})(CustomSizeForm);
