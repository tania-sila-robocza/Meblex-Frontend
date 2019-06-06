/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field, reduxForm } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';
import Button from '../shared/Button';
import FieldX from '../shared/FieldX';
import { email, password, required, maxLength32, postCode, nip } from '../../validationRules';

const postCodeMask = createTextMask({
  pattern: '99-999',
  guide: false,
});

const nipMask = createTextMask({
  pattern: '9999999999',
  guide: false,
});


const RegistrationForm = ({ handleSubmit, error, isLoading }) => {
  const style = {
    form: css`
      z-index: 1;
      width: 90%;
      margin-bottom: 100px;
      background: #fff;
      box-shadow: 0px 1px 15px rgba(4, 35, 101, 0.22);
      border-radius: 5px;
      padding: 20px;
    `,

    formError: css`
      color: red;
      font-weight: bold;
      text-align: center;
    `,

    field: css`
      margin: 10px 0;
    `,

    actions: css`
      display: flex;
      justify-content: center;
      margin-top: 20px;
      flex-direction: row;

      & > :first-child {
        margin-left: 0;
      }

      & > :last-child {
        margin-right: 0;
      }
    `,

    button: css`
      /* flex: 1; */
    `,

    title: css`
      margin: 0;
      margin-bottom: 30px;
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
    `,
  };

  return (
    <form css={style.form} onSubmit={handleSubmit}>
      <h4 css={style.title}>Formularz rejestracji</h4>
      {error && <p css={style.formError}>{error}</p>}

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Adres email:</h4>
        <Field
          name="email"
          component={FieldX}
          type="email"
          autoComplete="email"
          css={style.field}
          validate={[required, email]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Hasło:</h4>
        <Field
          name="password"
          component={FieldX}
          type="password"
          autoComplete="new-password"
          css={style.field}
          validate={[required, password]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Imię i nazwisko:</h4>
        <Field
          name="name"
          component={FieldX}
          type="text"
          autoComplete="name"
          css={style.field}
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
          css={style.field}
          validate={[required, maxLength32]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Województwo:</h4>
        <Field
          name="state"
          component={FieldX}
          type="text"
          autoComplete="address-level1"
          css={style.field}
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
          css={style.field}
          validate={[required, maxLength32]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Kod pocztowy:</h4>
        <Field
          name="postcode"
          component={FieldX}
          type="tel"
          autoComplete="postal-code"
          css={style.field}
          {...postCodeMask}
          validate={[required, postCode]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>NIP:</h4>
        <Field
          name="nip"
          component={FieldX}
          type="tel"
          css={style.field}
          {...nipMask}
          validate={[nip]}
        />
      </div>

      <div css={style.actions}>
        <Button type="submit" css={style.button} isLoading={isLoading}>Zarejestruj</Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'registration',
})(RegistrationForm);
