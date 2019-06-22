/** @jsx jsx */

import React from 'react';
import { Link } from 'react-router-dom';
import { css, jsx } from '@emotion/core';
import CartList from './CartList';
import Button from '../shared/Button';

const Cart = () => {
  const style = {
    orderButton: css`
      font-size:1em;
      display:block;
      text-align:center;
      padding:10px 20px;
      margin:0;
    `,
    cartButtonGroup: css`
      display:flex;
      padding:0 6px;
      > div {
        width:50%;
        padding:0 6px;
      }
    `,
    btnCatalog: css`
      margin: 30px auto 10px;
      width: 100%;
    `,
  };

  return (
    <>
      <div>
        <CartList>
          <div css={style.cartButtonGroup}>
            <div>
              <Button
                variant="secondary"
                css={style.orderButton}
                component={Link}
                to={{
                  pathname: '/zamowienie/dostawa',
                  state: { reservation: true },
                }}
              >Rezerwuję
              </Button>
            </div>
            <div>
              <Button
                variant="normal"
                css={style.orderButton}
                component={Link}
                to={{
                  pathname: '/zamowienie/dostawa',
                  state: { reservation: false },
                }}
              >Kupuję!
              </Button>
            </div>
          </div>
        </CartList>
      </div>
    </>
  );
};

export default Cart;
