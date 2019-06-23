/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useTheme } from '../../helpers';
import FurnitureOrderLine from './FurnitureOrderLine';
import PartOrderLine from './PartOrderLine';
import Button from '../shared/Button';

const Order = ({ order }) => {
  const theme = useTheme();
  const [data, setData] = useState();

  const style = {
    panel: css`
      display: flex;
      flex-direction: column;
      background: #fff;
      box-shadow: 0px 1px 15px rgba(4, 35, 101, 0.22);
      border-radius: 5px;
      padding: 20px;
      margin-bottom: 80px;
    `,

    info: css`
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;

      p {
        margin: 0;
      }

      h5 {
        font-weight: bold;
        margin: 0;
        margin-left: 15px;
      }
    `,

    total: css`
      margin: 10px 0;
      text-align: right;

      h4 {
        margin: 0;
      }

      span {
        font-size: 1.3em;
        margin-left: 10px;
        color: ${theme.colors.primary};
      }
    `,

    number: css`
      margin: 0;
      margin-bottom: 30px;

      span {
        color: ${theme.colors.primary};
      }
    `,

    buyBtn: css`
      margin-top: 20px;
    `,
  };

  const buyReservation = () => {
    setData({ ...order, reservation: false });
  };

  return (
    <div css={style.panel}>
      <h4 css={style.number}>Zamówienie <span>#{order.orderId}</span></h4>

      {order.orderLines.filter(o => o.pieceOfFurniture).map(o => (
        <FurnitureOrderLine
          key={o.orderLineId}
          size={o.size}
          count={o.count}
          price={o.price}
          product={o.pieceOfFurniture}
        />
      ))}

      {order.orderLines.filter(o => o.part).map(o => (
        <PartOrderLine
          key={o.orderLineId}
          size={o.size}
          count={o.count}
          price={o.price}
          product={o.part}
        />
      ))}

      <div css={style.info}>
        <p>Sposób dostawy:</p>
        <h5>{{
          courier: 'Kurier',
          none: 'Odbiór własny',
        }[order.delivery]}
        </h5>
      </div>

      <div css={style.info}>
        <p>Rezerwacja:</p>
        <h5>{order.reservation ? 'Tak' : 'Nie'}</h5>
      </div>

      <div css={style.total}>
        <h4>Razem: <span>{order.orderLines.reduce((a, b) => a + (b.count * b.price), 0)} zł</span></h4>
      </div>

      {order.reservation && (
        <Button css={style.buyBtn} variant="secondary" type="button" onClick={buyReservation}>Zrealizuj rezerwację</Button>
      )}

      {data && (
      <Redirect to={{
        pathname: '/zamowienie/platnosc',
        state: { data, realizeReservation: true },
      }}
      />
      )}
    </div>
  );
};

export default Order;
