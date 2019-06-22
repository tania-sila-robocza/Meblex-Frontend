/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../helpers';
import FieldX from '../shared/FieldX';
import Button from '../shared/Button';
import { required, maxLength32 } from '../../validationRules';
import { setRoomSize } from '../../redux/fitter';


const RoomSizeForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const style = {
    form: css`
      display: flex;
      flex-direction: column;
      background: #fff;
      box-shadow: 0px 1px 15px rgba(4, 35, 101, 0.22);
      border-radius: 5px;
      padding: 20px;
      width: 90%;
      margin: 0 auto;
      margin-top: 20px;
    `,

    formError: css`
      margin-top: -10px;
      margin-bottom: 20px;
      font-weight: bold;
      text-align: center;
      color: red;
    `,

    fieldWrapper: css`
      width: 0px;
      flex: 1;
    `,

    fieldLabel: css`
      margin: 0;
      margin-right: 20px;
      font-size: .9em;
      margin-bottom: 5px;
    `,

    sizeHint: css`
      margin-bottom: 20px;
      font-size: 0.7em;
    `,

    formField: css`
      flex: 1;
      min-width: 0;
      width: auto;
    `,

    x: css`
      color: ${theme.colors.primary};
      font-size: 1.2em;
      line-height: 2em;
      margin: 0 10px;
    `,

    sizes: css`
      display: flex;
      flex-direction: row;
    `,

    checkBtn: css`
      margin: 30px 0 10px;
    `,
  };

  const formSubmit = (values) => {
    dispatch(setRoomSize(values));
  };

  return (
    <form css={style.form} onSubmit={handleSubmit(formSubmit)}>
      <h3 css={style.fieldLabel}>Podaj wymiary pokoju (w cm)</h3>
      <span css={style.sizeHint}>(długość ✕ szerokość ✕ wysokość)</span>

      <div css={style.sizes}>
        <Field
          name="width"
          component={FieldX}
          type="number"
          css={style.formField}
          wrapperCss={style.fieldWrapper}
          validate={[required, maxLength32]}
        />

        <span css={style.x}>✕</span>

        <Field
          name="length"
          component={FieldX}
          type="number"
          css={style.formField}
          wrapperCss={style.fieldWrapper}
          validate={[required, maxLength32]}
        />

        <span css={style.x}>✕</span>

        <Field
          name="height"
          component={FieldX}
          type="number"
          css={style.formField}
          wrapperCss={style.fieldWrapper}
          validate={[required, maxLength32]}
        />

      </div>
      <Button type="submit" css={style.checkBtn}>Sprawdź!</Button>
    </form>
  );
};

export default reduxForm({
  form: 'roomSizeForm',
  enableReinitialize: true,
})(RoomSizeForm);
