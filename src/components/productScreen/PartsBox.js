/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useActions } from 'react-redux';
import { useTheme } from '../../helpers';
import Button from '../shared/Button';
import { addItemsToCart } from '../../redux/cart';

const PartsBox = ({ parts }) => {
  const theme = useTheme();
  const addToCart = useActions(item => addItemsToCart(item));

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

  const addPart = (id) => {
    addToCart({ amount: 1, id });
  };

  return (
    <div css={style.box}>
      <h3 css={style.title}>Zrób to sam!</h3>
      <p>Te części mebla możesz kupić oddzielnie:</p>
      <div css={style.parts}>
        {parts.map(part => (
          <div css={style.part} key={part.partId}>
            <p>{part.name}</p>
            <Button css={style.addBtn} variant="secondary" onClick={() => addPart(part.partId)}>+</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartsBox;
