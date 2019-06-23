/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import Img from 'react-image';
import { useState, useEffect } from 'react';
import { useTheme, getCategoryIcon } from '../../helpers';
import config from '../../config';
import * as API from '../../api';

const PartOrderLine = ({ product, size, count, price, ...props }) => {
  const theme = useTheme();
  const [pof, setPof] = useState();
  const FallbackIcon = getCategoryIcon(product.category.categoryId);

  const style = {
    item: css`
      display: flex;
      align-items: center;
      text-decoration: none;
      width: 100%;
      margin: 0 0 30px 0;
      flex-direction: column;
    `,

    info: css`
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      width: 100%;
    `,

    image: css`
      width: 60px;
      height: 60px;
      margin: 0 20px;
      margin-left: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
      }
    `,

    fallbackIcon: css`
      width: 100%;
      height: 100%;
      margin: 0 10px;
      fill: ${theme.colors.text};
    `,

    textBox: css`
      flex: 1;
    `,

    text: css`
      margin: 0;
      font-size: 0.9em;
    `,

    size: css`
      margin: 5px 0 0 0;
      font-size: 0.8em;
    `,

    field: css`
      display: flex;
      flex-direction: row;
      width: 100%;

      input {
        height: 42px;
      }
    `,

    fieldWrapper: css`
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      margin: 0 0 10px 0;
      flex-direction: column;
    `,

    fieldLabel: css`
      margin: 0;
      margin-right: 20px;
      font-size: .9em;
      height: 42px;
      line-height: 42px;
    `,

    cos: css`
      margin: 5px 10px 0 0;
      font-size: 0.8em;
    `,

    data: css`
      width: 100%;
      padding: 0 20px;
    `,

    acceptButton: css`
      padding: 0px 10px;
      margin: 0;
      height: 42px;
      font-size: 1em;
      margin-left: 10px;
    `,
  };

  useEffect(() => {
    const fetchPoF = async () => {
      try {
        const res = await API.getPieceOfFurniture(product.pieceOfFurnitureId);
        setPof(res);
      } catch (error) {
        //
      }
    };
    fetchPoF();
  }, [product.pieceOfFurnitureId]);

  return (
    <div css={style.item} {...props}>
      <div css={style.info}>
        <div css={style.image}>
          <Img
            src={pof && `${config.IMAGES_SERVER}${pof.photos[0]}`}
            loader={<FallbackIcon css={style.fallbackIcon} />}
            unloader={<FallbackIcon css={style.fallbackIcon} />}
          />
        </div>
        <div css={style.textBox}>
          <h4 css={style.text}>{product.name}</h4>

          <div css={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}>
            <p css={style.cos}>Mebel:</p>
            <h3 css={style.size}>{pof && pof.name}</h3>
          </div>

          <div css={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}>
            <p css={style.cos}>Ilość sztuk:</p>
            <h3 css={style.size}>{count}</h3>
          </div>

          <div css={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}>
            <p css={style.cos}>Cena sztuki:</p>
            <h3 css={style.size}>{price} zł</h3>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PartOrderLine;
