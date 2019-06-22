/** @jsx jsx */

import { jsx, css } from '@emotion/core';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '../../helpers';

import { Icons } from '../../assets';
import UserInfo from './UserInfo';


const Toolbar = () => {
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.auth.user);
  const theme = useTheme();
  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    setCartSize(cart.items.reduce((a, b) => a + b.amount, 0));
  }, [cart]);

  const style = {
    toolbar: css`
      background: none;
      height: 70px;
      display: flex;
      align-items: center;
      width: 100vw;
      z-index: 3;
      padding-right: 10px;
    `,

    count: css`
      position: absolute;
      bottom: 5px;
      right: 0;
      background: ${theme.colors.primary};
      width: 22px;
      height: 22px;
      border-radius: 20px;
      font-size: .7em;
      color: #fff;
      text-align: center;
      line-height: 2em;
      font-weight: bold;
    `,

    icon: css`
      height: 25px;
      fill: ${theme.colors.textDark};
    `,

    iconLink: css`
      height: 50px;
      margin: 5px;
      padding: 10px;
      position: relative;
    `,

    fill: css`
      flex: 1;
    `,
  };

  return (
    <div css={style.toolbar}>
      <UserInfo />

      <span css={style.fill} />

      <Link to="/koszyk" css={style.iconLink}>
        <div>
          <Icons.ShoppingCart css={style.icon} />
          {cartSize > 0 && <span css={style.count}>{cartSize}</span>}
        </div>
      </Link>

      {user && (
        <Link to="/wyloguj" css={style.iconLink}>
          <Icons.Logout css={style.icon} />
        </Link>
      )}


    </div>
  );
};

export default Toolbar;
