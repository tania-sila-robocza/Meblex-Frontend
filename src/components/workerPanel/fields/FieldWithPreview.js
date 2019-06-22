/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useTheme } from '../../../helpers';

const FieldWithPreview = ({
  input: { onChange, onBlur, value: omitValue, ...inputProps },
  meta: { touched, error }, ...props
}) => {
  const theme = useTheme();
  const [name, setName] = useState();
  const [preview, setPreview] = useState();

  const style = {
    field: css`
      display: flex;
      flex-direction: column;
      width: 100%;

      input {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }
    `,

    error: css`
      color: red;
      font-size: 0.7em;
      padding: 10px 0;
    `,

    wrapper: css`
      display: flex;
      flex-direction: row;
      position: relative;
    `,

    preview: css`
      width: 42px;
      height: 42px;
      margin-left: 20px;
      border-radius: 5px;
      box-shadow: 0px 1px 5px ${theme.colors.shadowDark};
      border: 1px solid ${theme.colors.primaryDark};
      background-size: cover;
    `,

    fakeInput: css`
      flex: 1;
      justify-content: center;
      align-items: center;

      box-shadow: 0 2px 4px ${theme.colors.shadow};
      border: 1px solid rgb(229, 232, 237);
      padding: 0px 15px;
      font-family: 'Noto Sans';
      font-size: 0.9em;
      color: ${theme.colors.text};
      background: ${theme.colors.backgroundGray};
      border-radius: 5px;
      overflow: hidden;
    `,
  };

  const handleChange = handler => ({ target: { files } }) => {
    setName(files.length ? files[0].name : '');

    if (files.length) {
      const processedFiles = [];
      Object.keys(files).forEach((i) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          processedFiles.push(reader.result);

          if (processedFiles.length === files.length) handler(processedFiles);
        };
        reader.readAsDataURL(files[i]);
      });
    } else {
      setPreview();
    }
  };

  return (
    <div css={style.field}>
      <div css={style.wrapper}>
        <input
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={handleChange(onChange)}
          onBlur={handleChange(onBlur)}
          {...inputProps}
          {...props}
        />
        <div css={style.fakeInput}><p>{name || 'Wybierz zdjęcie...'}</p></div>
        <img src={preview} css={style.preview} alt={name} />
      </div>
      {touched && error && <span css={style.error}>{error}</span>}
    </div>
  );
};

export default FieldWithPreview;
