/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field } from 'redux-form';
import { createNumberMask } from 'redux-form-input-masks';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import slugify from 'slugify';
import FieldX from '../shared/FieldX';
import Button from '../shared/Button';
import { required, maxLength32, number } from '../../validationRules';
import { useTheme } from '../../helpers';
import { Icons } from '../../assets';
import SelectField from './fields/SelectField';
import { fetchMaterials } from '../../redux/data';
import * as API from '../../api';


const priceMask = createNumberMask({
  suffix: ' zł',
  decimalPlaces: 2,
  allowEmpty: true,
});

const PartsSubform = ({ fields, meta: { error, submitFailed } }) => {
  const theme = useTheme();
  const colors = useSelector(state => state.data.colors);
  const patterns = useSelector(state => state.data.patterns);
  const materials = useSelector(state => state.data.materials);

  const style = {
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

    partBadge: css`
      padding-left: 50px;
      position: relative;
      margin-bottom: 50px;

      &::before {
        counter-increment: parts;
        content: counter(parts);
        position: absolute;
        left: 0;
        top: 10px;
        width: 30px;
        height: 30px;
        background: ${theme.colors.primary};
        box-shadow: 0px 1px 5px ${theme.colors.shadowDark};
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        color: #fff;
        font-weight: bold;
      }
    `,

    partField: css`
      counter-reset: parts;
      margin-top: 20px;
    `,

    addButton: css`
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    `,

    remove: css`
      width: 20px;
      height: 20px;
      fill: red;
      margin-right: 10px;
      display: inline-block;
      position: absolute;
      left: 5px;
      top: 80px;
    `,
  };

  return (
    <ul css={style.partField}>
      {fields.map((part, index) => (
        <li key={index} css={style.partBadge}>

          <span
            css={style.remove}
            role="button"
            tabIndex={0}
            onClick={() => fields.remove(index)}
          >
            <Icons.Close2 />
          </span>

          <div css={style.fieldWrapper}>
            <h4 css={style.fieldLabel}>Nazwa części:</h4>
            <Field
              name={`${part}.name`}
              component={FieldX}
              type="text"
              autoComplete="name"
              css={style.formField}
              validate={[required, maxLength32]}
            />
          </div>

          <div css={style.fieldWrapper}>
            <h4 css={style.fieldLabel}>Kolor części:</h4>
            <Field
              name={`${part}.colorId`}
              component={SelectField}
              css={style.formField}
              validate={[required]}
              parse={value => Number(value)}
            >
              <option disabled />
              {colors.map(color => (
                <option key={color.colorId} value={color.colorId}>
                  {color.name}
                </option>
              ))}
            </Field>
          </div>

          <div css={style.fieldWrapper}>
            <h4 css={style.fieldLabel}>Wzór części:</h4>
            <Field
              name={`${part}.patternId`}
              component={SelectField}
              css={style.formField}
              validate={[required]}
              parse={value => Number(value)}
            >
              <option disabled />
              {patterns.map(p => (
                <option key={p.patternId} value={p.patternId}>
                  {p.name}
                </option>
              ))}
            </Field>
          </div>

          <div css={style.fieldWrapper}>
            <h4 css={style.fieldLabel}>Materiał części:</h4>
            <Field
              name={`${part}.materialId`}
              component={SelectField}
              css={style.formField}
              validate={[required]}
              parse={value => Number(value)}
            >
              <option disabled />
              {materials.map(m => (
                <option key={m.materialId} value={m.materialId}>
                  {m.name}
                </option>
              ))}
            </Field>
          </div>

          <div css={style.fieldWrapper}>
            <h4 css={style.fieldLabel}>Cena części:</h4>
            <Field
              name={`${part}.price`}
              component={FieldX}
              type="tel"
              css={style.formField}
              validate={[required, maxLength32]}
              {...priceMask}
            />
          </div>

          <div css={style.fieldWrapper}>
            <h4 css={style.fieldLabel}>Ilość części:</h4>
            <Field
              name={`${part}.count`}
              component={FieldX}
              type="tel"
              css={style.formField}
              parse={value => (Number.isNaN(parseInt(value, 10)) ? null : parseInt(value, 10))}
              validate={[required, maxLength32, number]}
            />
          </div>

        </li>
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={() => fields.push({})}
        css={style.addButton}
      >Dodaj część
      </Button>

      {submitFailed && error && <span>{error}</span>}
    </ul>
  );
};

export default PartsSubform;
