/** @jsx jsx */

import { useState } from 'react';
import { css, jsx } from '@emotion/core';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../../helpers';
import Button from '../shared/Button';
import { addItemsToCart } from '../../redux/cart';
import { addItemToFitter } from '../../redux/fitter';
import ResourcesBox from './ResourcesBox';
import { Icons } from '../../assets';

const ProductInfo = ({ product }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const fitterItems = useSelector(state => state.fitter.items);
  const user = useSelector(state => state.auth.user);

  const style = {
    info: css`
      & p {
        text-align: justify;
      }
    `,

    priceBox: css`
      padding: 20px 30px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      /* background: ${theme.colors.primary_01}; */

      & > h3 {
        margin: 0;
      }
    `,

    price: css`
      font-weight: bold;
      color: ${theme.colors.primary};
      margin: 0;
      font-size: 1.8em;
    `,

    freeShipping: css`
      font-size: .8em;
      padding: 0;
      margin: 0;
    `,

    buyBox: css`
      display: flex;
      flex-direction: row;
      height: 60px;
      position: relative;
      justify-content: center;
      margin: 40px 0;

      input[type="number"] {
        width: 70px;
        height: 100%;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        font-weight: bold;
        font-size: 1.5em;
        text-align: center;
      }
    `,

    addToCart: css`
      height: 100%;
      margin: 0;
      padding: 15px 25px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `,

    addToFitter: css`
      height: 100%;
      padding: 10px 15px;

      svg {
        width: 30px;
        height: 30px;
        fill: ${theme.colors.primary};
      }
    `,

    descBox: css`
      padding: 20px 30px;

      & > h3 {
        margin: 0 0 20px 0;
      }

      & strong {
        color: ${theme.colors.textDark};
      }
    `,

    sizesBox: css`
      padding: 20px 30px;

      & > h3 {
        margin: 0 0 20px 0;
      }
    `,

    size: css`
      display: flex;
      flex-direction: row;
      padding: 5px 0;

      & p {
        margin: 0;
        width: 100px;
      }
    `,
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const addPoF = () => {
    if (parseInt(amount, 10)) {
      dispatch(addItemsToCart({ amount: parseInt(amount, 10) }));
    }
  };

  const handleFitterClick = () => {
    dispatch(addItemToFitter(product.id));
  };

  return (
    <div css={style.info}>
      <div css={style.priceBox}>
        <h3>Cena:</h3>
        <div>
          <p css={style.price}>{product.price} zł</p>
          <p css={style.freeShipping}>+ Darmowa wysyłka!</p>
        </div>
      </div>

      <div css={style.buyBox}>
        <input type="number" value={amount} onChange={handleAmountChange} />
        <Button css={style.addToCart} onClick={addPoF}>Do koszyka</Button>

        {user && !fitterItems.some(i => i === product.id) && (
          <Button variant="secondary" css={style.addToFitter} onClick={handleFitterClick}>
            <Icons.AddPuzzle />
          </Button>
        )}
      </div>

      <div css={style.descBox}>
        <h3>Opis</h3>
        <div>
          <ReactMarkdown source={product.description} />
        </div>
      </div>

      <ResourcesBox title="Materiały" type="material" product={product} />
      <ResourcesBox title="Kolory" type="color" product={product} />
      <ResourcesBox title="Wzory" type="pattern" product={product} />

      <div css={style.sizesBox}>
        <h3>Wymiary</h3>
        {['Szerokość', 'Głębokość', 'Wysokość'].map((dimension, i) => (
          <span css={style.size} key={i}>
            <p>{dimension}:</p>
            <b>{product.size.split('x')[i]} cm</b>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
