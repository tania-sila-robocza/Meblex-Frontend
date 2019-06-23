/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import Img from 'react-image';
import { useDispatch } from 'react-redux';
import { useTheme, getCategoryIcon } from '../../helpers';
import config from '../../config';
import Button from '../shared/Button';
import { addItemsToCart } from '../../redux/cart';

const CustomSizeRequest = ({ request, ...props }) => {
  const theme = useTheme();
  const FallbackIcon = getCategoryIcon(request.pieceOfFurniture.category.categoryId);
  const dispatch = useDispatch();

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
      align-self: flex-start;

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

    cos: css`
      margin: 5px 10px 0 0;
      font-size: 0.8em;
    `,

    accepted: css`
      color: green;
    `,

    notAccepted: css`
      color: red;
    `,

    addBtn: css`
      margin: 0;
      margin-top: 20px;
      margin-bottom: 10px;
      width: 100%;
      font-size: 1em;
      padding: 10px;
    `,
  };

  const handleClick = () => {
    dispatch(addItemsToCart({
      amount: 1,
      product: request.pieceOfFurniture.id,
    }));
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

          <div css={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}>
            <p css={style.cos}>Status:</p>
            {request.approved ? (
              <h3 css={[style.size, style.accepted]}>ZATWIERDZONO</h3>
            ) : (
              <h3 css={[style.size, style.notAccepted]}>NIE ZATWIERDZONO</h3>
            )}
          </div>

          {request.approved && (
            <Button
              variant="secondary"
              css={style.addBtn}
              onClick={handleClick}
            >Dodaj do koszyka
            </Button>
          )}
        </div>

      </div>
    </div>
  );
};

export default CustomSizeRequest;
