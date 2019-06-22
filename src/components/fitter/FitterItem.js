/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import Img from 'react-image';
import { useDispatch } from 'react-redux';
import config from '../../config';
import { useTheme, getCategoryIcon } from '../../helpers';
import { Icons } from '../../assets';

const FitterItem = ({ product, handleRemove }) => {
  const theme = useTheme();
  const FallbackIcon = getCategoryIcon(product.category.categoryId);

  const style = {
    product: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 15px 0;

      h4 {
        margin: 0;
        font-size: 1em;
        flex: 1;
      }

      p {
        font-size: .9em;
        margin: 0;
        margin-top: 5px;
      }
    `,

    icon: css`
      width: 40px;
      height: 40px;
      margin-right: 20px;
      border-radius: 5px;
      box-shadow: 0px 1px 5px ${theme.colors.shadowDark};
      border: 1px solid ${theme.colors.primaryDark};
    `,

    fallbackIcon: css`
      width: 40px;
      height: 40px;
      margin-right: 20px;
    `,

    remove: css`
      width: 15px;
      height: 15px;
      fill: red;
      margin-right: 10px;
    `,

    info: css`
      flex: 1;
    `,
  };

  return (
    <div css={style.product}>
      <Img
        css={style.icon}
        src={`${config.IMAGES_SERVER}${product.photos[0]}`}
        loader={<FallbackIcon css={style.fallbackIcon} />}
        unloader={<FallbackIcon css={style.fallbackIcon} />}
      />

      <div css={style.info}>
        <h4>{product.name}</h4>
        <p>{product.size.split('x').join(' x ')}</p>
      </div>

      <span css={style.remove} role="button" tabIndex={0} onClick={() => handleRemove(product.id)}>
        <Icons.Close2 />
      </span>
    </div>
  );
};

export default FitterItem;
