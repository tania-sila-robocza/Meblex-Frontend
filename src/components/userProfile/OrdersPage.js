/* eslint-disable no-param-reassign */
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useSelector } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import UserProfileForm from './UserProfileForm';
import PasswordChangeForm from './PasswordChangeForm';
import EmailChangeForm from './EmailChangeForm';
import * as API from '../../api';
import { useTheme } from '../../helpers';

import { setUserData as setUserDataAction } from '../../redux/auth';
import FurnitureOrderLine from './FurnitureOrderLine';
import Order from './Order';
import LoadingSpinner from '../shared/LoadingSpinner';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const style = {
    cont: css`
      display: flex;
      flex-direction: column;
      padding: 30px 20px;
    `,

    subTitle: css`
      margin: 0;
      margin-bottom: 30px;
    `,

    loading: css`
      width: 50px;
      height: 50px;
      align-self: center;
      margin: 30px 0;

      circle {
        stroke: ${theme.colors.primary};
      }
    `,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const res = await API.getClientOrders();
        setOrders(res);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div css={style.cont}>
      <h3 css={style.subTitle}>Historia zamówień</h3>

      {isLoading && (
      <LoadingSpinner css={style.loading} isLoading={isLoading} />
      )}

      {!isLoading && orders.map((order, i) => (
        <Order key={i} order={order} />
      ))}
    </div>
  );
};

export default OrdersPage;
