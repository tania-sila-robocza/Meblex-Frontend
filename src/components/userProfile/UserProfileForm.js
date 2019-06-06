/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field, reduxForm } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';
import FieldX from '../shared/FieldX';
import Button from '../shared/Button';
import { required, maxLength32, postCode, nip } from '../../validationRules';

const postCodeMask = createTextMask({
  pattern: '99-999',
  guide: false,
});

const nipMask = createTextMask({
  pattern: '9999999999',
  guide: false,
});

const UserProfileForm = ({ handleSubmit, error, isLoading }) => {
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

  return (
    <form css={style.form} onSubmit={handleSubmit}>
      {error && <p css={style.formError}>{error}</p>}

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Imię i nazwisko:</h4>
        <Field
          name="name"
          component={FieldX}
          type="text"
          autoComplete="name"
          css={style.formField}
          validate={[required, maxLength32]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Adres:</h4>
        <Field
          name="address"
          component={FieldX}
          type="text"
          autoComplete="street-address"
          css={style.formField}
          validate={[required, maxLength32]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Kod pocztowy:</h4>
        <Field
          name="postCode"
          component={FieldX}
          type="tel"
          autoComplete="postal-code"
          css={style.formField}
          validate={[required, postCode]}
          {...postCodeMask}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Województwo:</h4>
        <Field
          name="state"
          component={FieldX}
          type="text"
          autoComplete="address-level1"
          css={style.formField}
          validate={[required, maxLength32]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Miasto:</h4>
        <Field
          name="city"
          component={FieldX}
          type="text"
          autoComplete="address-level2"
          css={style.formField}
          validate={[required, maxLength32]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>NIP:</h4>
        <Field
          name="nip"
          component={FieldX}
          type="tel"
          css={style.formField}
          validate={[nip]}
          {...nipMask}
        />
      </div>

      <div css={style.submitButton}>
        <Button isLoading={isLoading} type="submit">Aktualizuj dane</Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'userProfile',
  enableReinitialize: true,
})(UserProfileForm);
