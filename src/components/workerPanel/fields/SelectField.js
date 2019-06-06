/** @jsx jsx */

import { jsx, css } from '@emotion/core';

const SelectField = ({
  input, meta: { touched, error }, ...rest
}) => {
  const style = {
    field: css`
      display: flex;
      flex-direction: column-reverse;
      width: 100%;

      select {
        height: 42px;
      }
    `,

    error: css`
      color: red;
      font-size: 0.7em;
      padding: 10px 0;
    `,
  };

  return (
    <div css={style.field}>
      {touched && error && <span css={style.error}>{error}</span>}
      <select {...input} {...rest} />
    </div>
  );
};

export default SelectField;
