/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field, reduxForm, FieldArray, SubmissionError } from 'redux-form';
import { createNumberMask } from 'redux-form-input-masks';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import FieldX from '../shared/FieldX';
import Button from '../shared/Button';
import { required, maxLength32, number, size } from '../../validationRules';
import PartsSubform from './PartsSubform';
import SelectField from './fields/SelectField';
import TextareaField from '../shared/TextareaField';
import FieldWithPreview from './fields/FieldWithPreview';
import * as API from '../../api';

const priceMask = createNumberMask({
  suffix: ' zł',
  decimalPlaces: 2,
  allowEmpty: true,
});

const AddFurnitureForm = ({ handleSubmit, error, reset }) => {
  const [isLoading, setIsLoading] = useState(false);
  const data = useSelector(state => state.data);

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
    const { parts, ...data } = values;
    setIsLoading(true);
    try {
      const res = await API.addFurniture(data);
      if (parts) await API.addParts(parts.map(p => ({ ...p, pieceOfFurnitureId: res.id })));
      reset();
      toast(`✔️ Dodano ${res.name}!`);
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
        <h4 css={style.fieldLabel}>Nazwa mebla:</h4>
        <Field
          name="name"
          component={FieldX}
          type="text"
          css={style.formField}
          validate={[required, maxLength32]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Zdjęcia:</h4>
        <Field
          name="photos"
          component={FieldWithPreview}
          css={style.formField}
          validate={[required]}
          multiple
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Kolor:</h4>
        <Field
          name="colorId"
          component={SelectField}
          css={style.formField}
          validate={[required]}
          parse={value => Number(value)}
        >
          <option disabled />
          {data.colors.map(color => (
            <option key={color.colorId} value={color.colorId}>
              {color.name}
            </option>
          ))}
        </Field>
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Wzór:</h4>
        <Field
          name="patternId"
          component={SelectField}
          css={style.formField}
          validate={[required]}
          parse={value => Number(value)}
        >
          <option disabled />
          {data.patterns.map(p => (
            <option key={p.patternId} value={p.patternId}>
              {p.name}
            </option>
          ))}
        </Field>
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Materiał:</h4>
        <Field
          name="materialId"
          component={SelectField}
          css={style.formField}
          validate={[required]}
          parse={value => Number(value)}
        >
          <option disabled />
          {data.materials.map(m => (
            <option key={m.materialId} value={m.materialId}>
              {m.name}
            </option>
          ))}
        </Field>
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Cena:</h4>
        <Field
          name="price"
          component={FieldX}
          type="tel"
          css={style.formField}
          validate={[required, maxLength32]}
          {...priceMask}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Ilość:</h4>
        <Field
          name="count"
          component={FieldX}
          type="tel"
          css={style.formField}
          parse={value => (Number.isNaN(parseInt(value, 10)) ? null : parseInt(value, 10))}
          validate={[required, maxLength32, number]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Rozmiar (Szer x Wys x Głęb):</h4>
        <Field
          name="size"
          component={FieldX}
          type="text"
          css={style.formField}
          validate={[required, maxLength32, size]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Opis:</h4>
        <Field
          name="description"
          component={TextareaField}
          css={style.formField}
          validate={[required]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Pomieszczenie:</h4>
        <Field
          name="roomId"
          component={SelectField}
          css={style.formField}
          validate={[required]}
        >
          <option disabled />
          {data.rooms.map(room => (
            <option key={room.roomId} value={room.roomId}>
              {room.name}
            </option>
          ))}
        </Field>
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Kategoria:</h4>
        <Field
          name="categoryId"
          component={SelectField}
          css={style.formField}
          validate={[required]}
          parse={value => Number(value)}
        >
          <option disabled />
          {data.categories.map(category => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.name}
            </option>
          ))}
        </Field>
      </div>

      <FieldArray name="parts" component={PartsSubform} />

      <div css={style.submitButton}>
        <Button type="submit" isLoading={isLoading}>Dodaj mebel</Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'addFurnitureForm',
})(AddFurnitureForm);
