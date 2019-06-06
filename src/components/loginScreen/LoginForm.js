/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import FieldX from '../shared/FieldX';
import { email, password, required } from '../../validationRules';


const LoginForm = ({ handleSubmit, error, isLoading }) => {
  const style = {
    form: css`
      z-index: 1;
      width: 90%;
      background: #fff;
      box-shadow: 0px 1px 15px rgba(4, 35, 101, 0.22);
      border-radius: 5px;
      padding: 30px;
    `,

    formError: css`
      color: red;
      font-weight: bold;
      text-align: center;
    `,

    actions: css`
      display: flex;
      justify-content: center;
      margin-top: 20px;
      flex-direction: column;

      & > * {
        width: 100%;
      }
    `,

    loginButton: css`
      flex: 1;
    `,

    title: css`
      margin: 0;
      margin-bottom: 30px;
      text-align: center;
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
  };

  return (
    <form css={style.form} onSubmit={handleSubmit}>
      <h4 css={style.title}>Witaj, <strong>zaloguj się</strong> aby korzystać z aplikacji!</h4>
      {error && <p css={style.formError}>{error}</p>}

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Adres email:</h4>
        <Field
          css={style.field}
          name="email"
          component={FieldX}
          type="email"
          autoComplete="email"
          validate={[required, email]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Hasło:</h4>
        <Field
          css={style.field}
          name="password"
          component={FieldX}
          type="password"
          autoComplete="current-password"
          validate={[required, password]}
        />
      </div>

      <div css={style.actions}>
        <Button css={style.loginButton} type="submit" isLoading={isLoading}>Zaloguj</Button>
        <Button component={Link} variant="secondary" to="/rejestracja">Rejestracja</Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'login',
})(LoginForm);
