/** @jsx jsx */

import React, { useEffect, useState, useRef } from 'react';
import { css, jsx } from '@emotion/core';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '../../helpers';
import * as API from '../../api';
import CartList from '../cart/CartList';
import Button from '../shared/Button';
import { ReactComponent as Spinner } from '../../assets/spinner.svg';

const Order = ({ location }) => {
  const cartData = useSelector(state => state.cart);
  const user = useSelector(state => state.auth.user);
  const theme = useTheme();

  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const [paymentData, setPaymentData] = useState();

  const form = useRef();


  const style = {
    loading: css`
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 3;
      background: white;
      display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    `,
    spinner: css`
      width: 60px;
      height: 60px;
      margin-right: 20px;

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
    panel: css`
      display: flex;
      flex-direction: column;
      background: #fff;
      box-shadow: 0px 1px 15px rgba(4, 35, 101, 0.22);
      border-radius: 5px;
      padding: 20px;
      margin:0 20px 40px;
      h4 {
        margin:0 0 10px;
      }
    `,
    radioLabel: css`
      cursor:pointer;
      padding:20px 0 0;
      strong{
        color:#222;
        font-weight:normal;
      }
    `,
    panelCategory: css`
      margin-left:25px;
    `,
    select: css`
      padding:4px 10px;
      width:100%;
      option {
        padding:4px 10px;
      }
    `,
    fieldWrapper: css`
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      margin: 10px 0;
      flex-direction: column;
    `,

    fieldLabel: css`
      margin: 0;
      margin-right: 20px;
      font-size: .9em;
      height: 42px;
      line-height: 42px;
    `,

    formField: css`
      flex: 1;
      min-width: 0;
      width: 100%;
    `,
    cartItems: css`
    margin-bottom:20px;
      > div:first-child {
        margin:10px 0;
        h3 {
          font-size:1.2em;
          margin:0 30px;
        }
      }
      > div {
        padding-top:0;
        padding-bottom:0;
      }
    `,
    error: css`
      background-color: #f2dede;
      border-color: #ebcccc;
      color: #a94442;
      padding: .75rem 1.25rem;
      margin-bottom: 1rem;
      border: 1px solid transparent;
      border-radius: .25rem;
    `,
    button: css`
      font-size:1em;
      display:block;
      text-align:center;
      padding:10px 20px;
      margin:0;
    `,
  };

  const panel_deliveryMethod = (
    <div css={style.panel}>
      <h4>Dostawa:</h4>
      <form ref={form}>
        {/* <label css={style.radioLabel}>
          <input type="radio" name="deliveryMethod" onClick={() => setDeliveryMethod(1)} /> <strong>Odbiór osobisty w sklepie</strong>
        </label> */}
        <label css={style.radioLabel}>
          <input type="radio" name="deliveryMethod" onClick={() => setDeliveryMethod(2)} /> <strong>Kurier</strong>
        </label>
        {deliveryMethod === 2 && (
          <div css={style.panelCategory}>
            <div css={style.fieldWrapper}>
              <label css={style.fieldLabel}>Adres</label>
              <input css={style.formField} type="text" name="address" defaultValue={user.name} />
            </div>
            <div css={style.fieldWrapper}>
              <label css={style.fieldLabel}>Województwo</label>
              <input css={style.formField} type="text" name="state" defaultValue={user.state} />
            </div>
            <div css={style.fieldWrapper}>
              <label css={style.fieldLabel}>Miasto</label>
              <input css={style.formField} type="text" name="city" defaultValue={user.city} />
            </div>
            <div css={style.fieldWrapper}>
              <label css={style.fieldLabel}>Kod pocztowy</label>
              <input css={style.formField} type="text" name="postCode" defaultValue={`${user.postCode.slice(0, 2)}-${user.postCode.slice(2)}`} />
            </div>
          </div>
        )}
      </form>
    </div>
  );

  const panel_paymentMethod = (
    <div css={style.panel}>
      <h4>Płatność:</h4>
      <label css={style.radioLabel}><input type="radio" name="paymentMethod" onClick={() => setPaymentMethod('Blik')} /> <strong>Blik</strong></label>
      <label css={style.radioLabel}><input type="radio" name="paymentMethod" onClick={() => setPaymentMethod('SkyCash')} /> <strong>SkyCash</strong></label>
      <label css={style.radioLabel}><input type="radio" name="paymentMethod" onClick={() => setPaymentMethod('Dotpay')} /> <strong>Dotpay</strong></label>
      <label css={style.radioLabel}><input type="radio" name="paymentMethod" onClick={() => setPaymentMethod('PayPal')} /> <strong>PayPal</strong></label>
      <label css={style.radioLabel}><input type="radio" name="paymentMethod" onClick={() => setPaymentMethod('Google Pay')} /> <strong>Google Pay</strong></label>
    </div>
  );

  const startPayment = () => {
    const formData = new FormData(form.current);

    const parts = cartData.items.filter(i => i.item.partId).map(i => ({
      count: i.amount,
      price: i.item.price,
      size: '',
      partId: i.item.partId,
    }));

    const furniture = cartData.items.filter(i => !i.item.partId).map(i => ({
      count: i.amount,
      price: i.item.price,
      size: i.item.size,
      pieceOfFurnitureId: i.item.id,
    }));

    const data = {
      delivery: 'courier',
      reservation: location.state.reservation,
      address: formData.get('address'),
      state: formData.get('state'),
      city: formData.get('city'),
      postCode: formData.get('postCode').replace('-', ''),
      orderLines: [...furniture, ...parts],
    };

    setPaymentData(data);
  };


  return (
    <>
      {paymentData && (
      <Redirect to={{
        pathname: '/zamowienie/platnosc',
        state: { data: paymentData },
      }}
      />
      )}

      <div css={style.hello}>
        {cartData.items.length === 0 && (
        <>
          <h3>Nie możesz zrealizować zamówienia!</h3>
          <p>Aby móc zrealizować zamówienie musisz najpierw dodać produkty do koszyka!</p>
        </>
        )}
        {cartData.items.length > 0 && (
        <h3>Nowe zamówienie:</h3>
        )}
      </div>
      {cartData.items.length > 0 && (
      <>
        {panel_deliveryMethod}
        {panel_paymentMethod}
        <div css={style.cartItems}><CartList /></div>
        <div css={style.panel}>
          {!deliveryMethod && (<div css={style.error}>Musisz wybrać sposób dostawy!</div>)}
          {!paymentMethod && (<div css={style.error}>Musisz wybrać metodę płatności!</div>)}
          {paymentMethod && deliveryMethod && (
          <>
            <Button variant="normal" css={style.button} onClick={startPayment}>Przejdź do płatności!</Button>
          </>
          )}
        </div>
      </>
      )}
    </>
  );
};

export default Order;
