/** @jsx jsx */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { css, jsx } from '@emotion/core';
import * as API from '../../api';
import { theme } from '../../styles';
import LoadingSpinner from '../shared/LoadingSpinner';
import CartListItem from './CartListItem';
import CartListPartItem from './CartListPartItem';

const CartList = ({ children }) => {
  const cartData = useSelector(state => state.cart);

  const style = {
    loading: css`
      width: 50px;
      height: 50px;

      circle {
        stroke: ${theme.colors.primary};
      }
    `,
    hello: css`
      margin: 40px 40px 10px;
      
      h3 {
        margin: 0 0 30px;
      }
    `,
    cartListSummary: css`
      hr {
        width:75%;
        border-color:#bbb;
        border-width:1px;
        margin-left:auto;
        margin-right:0;
      }
      div {
        display:flex;
        align-content:end;
        align-items:center;
        padding:0 20px;
        h3,h4 {
          margin-top:15px;
        }
        h4 {
          font-size:0.95em;
          margin-left:auto;
          margin-right:10px;
          font-weight:normal;
        }
        h3 {
           font-size: 1.2em;
        }
      }
    `,
    currency: css`
      color: ${theme.colors.gray};
      font-size: 0.7em;
      margin-left: 3px;
    `,
  };
  return (
    <>
      <div css={style.hello}>
        <h3>{(cartData.items.length === 0 ? 'Koszyk jest pusty' : 'Twój koszyk:')}</h3>
      </div>
      {cartData.items.length !== 0 && (
      <>
        {cartData.items.map(f => (
          f.item.partId ? <CartListPartItem key={f.item.id} data={f} /> : <CartListItem key={f.item.id} data={f} />
        ))}
        <div css={style.cartListSummary}>
          <hr />
          <div>
            <h4>Wartość produktów:</h4>
            <h3>
              {cartData.items.reduce((a, b) => a + (b.amount * b.item.price), 0)}
              <span css={style.currency}>zł</span>
            </h3>
          </div>
        </div>
        {children}
      </>
      )}
    </>
  );
};

export default CartList;
