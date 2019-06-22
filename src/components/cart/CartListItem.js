/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/core';
import Img from 'react-image';
import { Link } from 'react-router-dom';
import { getCategoryIcon, useTheme } from '../../helpers';
import config from '../../config';

const CartListItem = ({ data, ...props }) => {
  const theme = useTheme();
  const FallbackIcon = getCategoryIcon(data.item.category.categoryId);

  const style = {
    result: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px 20px;
      text-decoration: none;
      width: 100%;
    `,

    image: css`
      width: 70px;
      height: 70px;
      margin-right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      & > * {
        max-width: 70px;
        max-height: 70px;
      }
    `,

    fallbackIcon: css`
      width: 100%;
      height: 100%;
      margin: 0 15px;
      fill: ${theme.colors.text};
    `,

    textBox: css`
      flex: 1;
    `,

    text: css`
      margin: 0;
      font-size: .8em;
    `,
    amount: css`
      font-size:.8em;
      margin-right:10px;
      color:#999;
      font-weight:normal;
    `,

    price: css`
      margin: 0 0 0 20px;
      font-size: 1.2em;
    `,

    currency: css`
      color: ${theme.colors.gray};
      font-size: 0.7em;
      margin-left: 3px;
    `,
  };

  return (
    <div css={style.result} {...props}>
      <div css={style.image}>
        <Img
          src={`${config.IMAGES_SERVER}${data.item.photos[0]}`}
          loader={<FallbackIcon css={style.fallbackIcon} />}
          unloader={<FallbackIcon css={style.fallbackIcon} />}
        />
      </div>
      <div css={style.textBox}>
        <h4 css={style.text}>{data.item.name}</h4>
      </div>
      <h3 css={style.price}>
        <span css={style.amount}>{data.amount}x</span>
        {data.item.price}
        <span css={style.currency}>zł</span>
      </h3>
    </div>
  );
};

export default CartListItem;
