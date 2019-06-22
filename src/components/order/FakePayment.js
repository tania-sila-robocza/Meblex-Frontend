/** @jsx jsx */

import React, { useEffect, useState, useRef } from 'react';
import { css, jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '../../helpers';
import * as API from '../../api';
import CartList from '../cart/CartList';
import Button from '../shared/Button';
import { clearCart } from '../../redux/cart';
import { ReactComponent as Spinner } from '../../assets/spinner.svg';

const FakePayment = ({ location, history }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [isPaymentCompleted, setPaymentCompleted] = useState(false);

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
  };


  useEffect(() => {
    if (!location.state) {
      history.push('/koszyk');
      return;
    }

    const startPayment = async () => {
      if (location.state.data.reservation) {
        setPaymentLoading(true);
        try {
          const res = await API.addOrder(location.state.data);
          toast('✔️ Zamówienie zarezerwowane!');
          dispatch(clearCart());
        } catch (error) {
          toast('Wytstąpił problem, spróbuj ponownie');
        } finally {
          setPaymentLoading(false);
          setPaymentCompleted(true);
        }
      } else {
        setPaymentLoading(true);
        setTimeout(async () => {
          try {
            if (location.state.realizeReservation) {
              const res = await API.realizeReservation(location.state.data.orderId);
              toast('✔️ Rezerwacja zrealizowana!');
            } else {
              const res = await API.addOrder(location.state.data);
              toast('✔️ Zamówienie zrealizowane!');
            }

            setPaymentLoading(false);
            dispatch(clearCart());
          } catch (error) {
            toast('Wytstąpił problem, spróbuj ponownie');
          } finally {
            setPaymentLoading(false);
            setPaymentCompleted(true);
          }
        }, 3000);
      }
    };
    startPayment();
  }, [dispatch, history, location.state]);


  return (
    <>
      {isPaymentCompleted && <Redirect to="/koszyk" />}

      {isPaymentLoading && (
      <div css={style.loading}>
        <Spinner css={style.spinner} />
        <h3 css={style.text}>Przetwarzanie...</h3>
      </div>
      )}
    </>
  );
};

export default FakePayment;
