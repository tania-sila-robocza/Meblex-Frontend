/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useTheme } from '../../helpers';


const Checkbox = ({ name, label, checked, onChange, ...props }) => {
  const theme = useTheme();

  const style = {
    fakeInput: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;

      box-shadow: 0 2px 4px ${theme.colors.shadow};
      border: 1px solid rgb(229, 232, 237);
      padding: 5px;
      font-size: 0.9em;
      color: ${theme.colors.textDark};
      background: ${theme.colors.backgroundGray};
      border-radius: 5px;
    `,

    checkedInput: css`
      background: ${theme.colors.primary};
    `,

    input: css`
      width: 20px;
      height: 20px;
      margin: 0;
      padding: 0;
      opacity: 0;
    `,

    label: css`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 20px 10px 0;
    `,

    text: css`
      margin: 0;
      margin-left: 10px;
    `,
  };

  return (
    <label css={style.label}>
      <input
        css={style.input}
        type="checkbox"
        name={name}
        onChange={e => onChange(e.target.checked)}
        checked={checked}
        {...props}
      />
      <span css={[style.fakeInput, checked && style.checkedInput]} />
      <p css={style.text}>{label}</p>
    </label>
  );
};

export default Checkbox;
