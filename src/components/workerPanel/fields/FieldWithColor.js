/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { ChromePicker } from 'react-color';
import React, { useState, useRef } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { useTheme } from '../../../helpers';

const FieldWithColor = ({
  input, meta: { touched, error }, ...rest
}) => {
  const theme = useTheme();
  const [pickerVisible, setPickerVisible] = useState(false);
  const picker = useRef();

  const style = {
    field: css`
      display: flex;
      flex-direction: column-reverse;
      width: 100%;

      input {
        height: 42px;
      }
    `,

    error: css`
      color: red;
      font-size: 0.7em;
      padding: 10px 0;
    `,

    color: css`
      width: 42px;
      height: 42px;
      margin-left: 20px;
      border-radius: 5px;
      box-shadow: 0px 1px 5px ${theme.colors.shadowDark};
      border: 1px solid ${theme.colors.primaryDark};
    `,

    wrapper: css`
      display: flex;
      flex-direction: row;
      position: relative;
    `,

    picker: css`
      position: absolute;
      z-index: 1;
      right: 0;
    `,

    cover: css`
      position: fixed;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
    `,
  };

  const showPicker = () => {
    setPickerVisible(true);
    disableBodyScroll(picker.current);
  };

  const hidePicker = () => {
    setPickerVisible(false);
    clearAllBodyScrollLocks();
  };

  const handleChange = (val) => {
    input.onChange(val.hex);
  };

  return (
    <div css={style.field}>
      {touched && error && <span css={style.error}>{error}</span>}
      <div css={style.wrapper}>
        <input {...input} {...rest} />
        <div
          css={[style.color, { backgroundColor: input.value }]}
          onClick={showPicker}
          role="button"
          tabIndex={0}
        />

        {pickerVisible && (
          <React.Fragment>
            <div
              css={style.cover}
              onClick={hidePicker}
              role="button"
              tabIndex={0}
            />
            <ChromePicker
              color={input.value}
              onChange={handleChange}
              css={style.picker}
              ref={picker}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default FieldWithColor;
