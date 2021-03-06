/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import Img from 'react-image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTheme, getCategoryIcon } from '../../helpers';
import Button from '../shared/Button';
import config from '../../config';
import * as API from '../../api';

const RequestItem = ({ request, requestAccepted, ...props }) => {
  const theme = useTheme();
  const FallbackIcon = getCategoryIcon(request.pieceOfFurniture.category.categoryId);
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const style = {
    item: css`
      display: flex;
      align-items: center;
      padding: 10px 0px;
      text-decoration: none;
      width: 100%;
      margin: 0 0 30px 0;
      flex-direction: column;
      background: #fff;
      box-shadow: 0px 1px 15px rgba(4, 35, 101, 0.22);
      border-radius: 5px;
    `,

    info: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
    `,

    image: css`
      width: 60px;
      height: 60px;
      margin: 0 20px;
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
      margin-right: 20px;
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

  const handlePriceChange = ({ target }) => {
    setPrice(target.value);
  };

  const approveRequest = async () => {
    setIsLoading(true);
    try {
      await API.acceptCustomSizeRequest({
        customSizeFormId: request.customSizeFormId,
        price,
      });

      toast('✔️ Zapytanie zostało zaakceptowane!');
      requestAccepted();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div css={style.item} {...props}>
      <div css={style.info}>
        <div css={style.image}>
          <Img
            src={`${config.IMAGES_SERVER}${request.pieceOfFurniture.photos[0]}`}
            loader={<FallbackIcon css={style.fallbackIcon} />}
            unloader={<FallbackIcon css={style.fallbackIcon} />}
          />
        </div>
        <div css={style.textBox}>
          <h4 css={style.text}>{request.pieceOfFurniture.name}</h4>
          <div css={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}>
            <p css={style.cos}>Rozmiar:</p>
            <h3 css={style.size}>{request.pieceOfFurniture.size.split('x').join(' x ')}</h3>
          </div>
        </div>
      </div>

      <div css={style.data}>
        <div css={style.fieldWrapper}>
          <h4 css={style.fieldLabel}>Przewidywana cena:</h4>
          <div css={style.field}>
            <input
              css={{ width: 0, flex: 1 }}
              type="number"
              name="price"
              value={price}
              onChange={handlePriceChange}
            />

            <Button
              css={style.acceptButton}
              isLoading={isLoading}
              onClick={approveRequest}
            >Zatwierdź
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestItem;
