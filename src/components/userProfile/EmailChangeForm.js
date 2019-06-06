/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field, reduxForm } from 'redux-form';
import FieldX from '../shared/FieldX';
import Button from '../shared/Button';
import { required, email } from '../../validationRules';

const EmailChangeForm = ({ handleSubmit, error, isLoading }) => {
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
        <h4 css={style.fieldLabel}>Adres email:</h4>
        <Field
          name="newemail"
          component={FieldX}
          type="email"
          autoComplete="email"
          css={style.formField}
          validate={[required, email]}
        />
      </div>

      <div css={style.submitButton}>
        <Button isLoading={isLoading} type="submit">Zmień adres email</Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'userEmail',
  enableReinitialize: true,
})(EmailChangeForm);
