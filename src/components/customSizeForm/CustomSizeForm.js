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
import { useTheme } from '../../helpers';


const CustomSizeForm = ({ handleSubmit, error, item, reset }) => {
  const [formLoading, setFormLoading] = useState(false);
  const theme = useTheme();

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
      flex-direction: column-reverse;
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

    x: css`
      color: ${theme.colors.primary};
      font-size: 1.2em;
      line-height: 3em;
      margin: 0 10px;
    `,

    submitButton: css`
      margin: 30px 0;
      display: flex;
      flex-direction: column;
    `,

    sizeHint: css`
      margin-bottom: 20px;
      font-size: 0.7em;
    `,

    sizes: css`
      display: flex;
      flex-direction: row;
    `,
  };

  const submitForm = async (values) => {
    setFormLoading(true);
    try {
      await API.addCustomSizeRequest({
        pieceOfFurnitureId: item.id,
        size: `${values.width}x${values.length}x${values.height}`,
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

      <div>
        <h4 css={style.fieldLabel}>Proponowany rozmiar:</h4>
        <span css={style.sizeHint}>(długość ✕ szerokość ✕ wysokość)</span>
      </div>

      <div css={style.sizes}>
        <Field
          name="width"
          component={FieldX}
          type="number"
          css={style.formField}
          wrapperCss={style.fieldWrapper}
          validate={[required, maxLength32]}
        />

        <span css={style.x}>✕</span>

        <Field
          name="length"
          component={FieldX}
          type="number"
          css={style.formField}
          wrapperCss={style.fieldWrapper}
          validate={[required, maxLength32]}
        />

        <span css={style.x}>✕</span>

        <Field
          name="height"
          component={FieldX}
          type="number"
          css={style.formField}
          wrapperCss={style.fieldWrapper}
          validate={[required, maxLength32]}
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
