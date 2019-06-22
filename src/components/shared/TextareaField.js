/** @jsx jsx */

import { jsx, css } from '@emotion/core';

const TextareaField = ({
  input, meta: { touched, error }, ...rest
}) => {
  const style = {
    field: css`
      display: flex;
      flex-direction: column-reverse;
      width: 100%;
      height: 200px;

      input {
        height: 42px;
      }
    `,

    error: css`
      color: red;
      font-size: 0.7em;
      padding-top: 10px;
    `,
  };

  return (
    <div css={style.field}>
      {touched && error && <span css={style.error}>{error}</span>}
      <textarea {...input} {...rest} />
    </div>
  );
};

export default TextareaField;
