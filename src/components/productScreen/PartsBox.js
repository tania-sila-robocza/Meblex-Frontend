/** @jsx jsx */

import { css, jsx } from '@emotion/core';
<<<<<<< HEAD
import { useActions } from 'react-redux';
=======
import { useDispatch } from 'react-redux';
>>>>>>> e5bd51b4b8a93e0652c02c44f7430a901937875f
import { useTheme } from '../../helpers';
import Button from '../shared/Button';
import { addItemsToCart } from '../../redux/cart';

<<<<<<< HEAD
const PartsBox = ({ parts }) => {
  const theme = useTheme();
  const addToCart = useActions(item => addItemsToCart(item));
=======
const PartsBox = ({ product }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
>>>>>>> e5bd51b4b8a93e0652c02c44f7430a901937875f

  const style = {
    box: css`
      padding: 20px 30px;

      p {
        margin: 0;
        padding: 0;
        margin-bottom: 20px;
      }
    `,

    title: css`
      margin: 0;
      padding: 0;
      margin-bottom: 20px;
    `,

    parts: css`
      display: flex;
      flex-direction: column;
    `,

    part: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px 20px;
      box-shadow: 0px 1px 3px ${theme.colors.shadowDark};
      margin: 7px 0px;
      background: ${theme.colors.backgroundGray};

      p {
        color: ${theme.colors.textDark};
        font-weight: bold;
        margin: 0;
        padding: 0;
        flex: 1;
      }
    `,

    addBtn: css`
      padding: 3px 10px;
      margin: 0;
    `,
  };

<<<<<<< HEAD
  const addPart = (id) => {
    addToCart({ amount: 1, id });
=======
  const addPart = (part) => {
    dispatch(addItemsToCart({
      amount: 1,
      item: { ...part, pieceOfFurnitureId: product.id },
    }));
>>>>>>> e5bd51b4b8a93e0652c02c44f7430a901937875f
  };

  return (
    <div css={style.box}>
      <h3 css={style.title}>Zrób to sam!</h3>
      <p>Te części mebla możesz kupić oddzielnie:</p>
      <div css={style.parts}>
<<<<<<< HEAD
        {parts.map(part => (
          <div css={style.part} key={part.partId}>
            <p>{part.name}</p>
            <Button css={style.addBtn} variant="secondary" onClick={() => addPart(part.partId)}>+</Button>
=======
        {product.parts.map(part => (
          <div css={style.part} key={part.partId}>
            <p>{part.name}</p>
            <Button css={style.addBtn} variant="secondary" onClick={() => addPart(part)}>+</Button>
>>>>>>> e5bd51b4b8a93e0652c02c44f7430a901937875f
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartsBox;
