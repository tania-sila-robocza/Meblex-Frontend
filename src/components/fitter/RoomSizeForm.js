/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../helpers';
import FieldX from '../shared/FieldX';
import Button from '../shared/Button';
import { required, maxLength32 } from '../../validationRules';
import { setRoomSize } from '../../redux/fitter';
import DraggablePoF from './DraggablePoF';


const RoomSizeForm = ({ handleSubmit, furniture }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const roomBox = useRef();
  const roomSize = useSelector(state => state.fitter.roomSize);
  const items = useSelector(state => state.fitter.items);
  const [factor, setFactor] = useState(0);

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

    room: css`
      border: 1px solid ${theme.colors.primary};
      /* box-sizing: content-box; */
      margin-top: 20px;
      height: 200px;
      position: relative;
    `,

    heightError: css`
      color: red;
      font-weight: bold;
      margin: 0;
      margin-top: 20px;
      text-align: center;
    `,
  };

  const formSubmit = (values) => {
    dispatch(setRoomSize(values));
  };

  useEffect(() => {
    if (roomBox.current) {
      const { width } = roomBox.current.getBoundingClientRect();
      const realWidth = roomSize.width;// Math.min(roomSize.width, roomSize.length);
      const realHeight = roomSize.length;// Math.max(roomSize.width, roomSize.length);

      const factor = width / realWidth;
      setFactor(factor);

      roomBox.current.style.width = `${width}px`;
      roomBox.current.style.height = `${realHeight * factor}px`;
    }
  }, [roomSize]);

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
      <Button css={style.checkBtn} type="submit">Zatwierdź</Button>

      {furniture.some((f) => {
        const size = f.size.split('x').map(s => parseInt(s, 10));
        return (size[0] > roomSize.width) || (size[1] > roomSize.length) || (size[2] > roomSize.height);
      }) ? (
        <p css={style.heightError}>Co najmniej jeden mebel przekracza rozmiary pokoju!</p>
        ) : (
          Object.keys(roomSize).length > 0 && (
          <div css={style.room} ref={roomBox}>
            {furniture.length > 0 && items.map((f, i) => (
              <DraggablePoF factor={factor} product={furniture.filter(x => x.id === f)[0]} key={i} />
            ))}
          </div>
          )
        )}
    </form>
  );
};

export default reduxForm({
  form: 'roomSizeForm',
  enableReinitialize: true,
})(RoomSizeForm);
