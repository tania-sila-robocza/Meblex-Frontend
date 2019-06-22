/** @jsx jsx */

import React, { useRef, useEffect, useState } from 'react';
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import { error } from 'util';
import Button from '../shared/Button';
import Breadcrumbs from '../shared/Breadcrumbs';
import PartsBox from './PartsBox';
import { useTheme } from '../../helpers';
import ProductInfo from './ProductInfo';
import * as API from '../../api';
import LoadingSpinner from '../shared/LoadingSpinner';
import config from '../../config';
import NoItem from '../shared/NoItem';


const Product = ({ match: { params }, location: { state } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();

  const refe = useRef();
  const theme = useTheme();

  const style = {
    product: css`
      display: flex;
      flex-direction: column;
      background: #fff;
      margin-bottom: 20px;

      & > h3 {
        padding: 20px 30px 0;
        margin: 0;
      }
    `,

    id: css`
      padding: 0px 30px;
      color: ${theme.colors.text};
      font-size: .8em;
      opacity: .7;
    `,

    images: css`
      background: ${theme.colors.background};
      scroll-snap-type: x mandatory;
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      height: 350px;
      position: relative;
    `,

    image: css`
      object-fit: contain;
      scroll-snap-align: start;
      width: 100%;
      padding: 0 20px;
    `,

    freeShipping: css`
      font-size: .8em;
      padding: 0;
      margin: 0;
    `,

    customSizeBox: css`
      margin: 20px 0;
      padding: 30px;
      background: ${theme.colors.primary};
      text-align: center;

      h4 {
        margin: 0;
        padding: 0;
        color: #fff;
        margin-bottom: 20px;
      }

      p {
        color: rgba(255, 255, 255, .8);
        margin: 0;
        padding: 0;
        margin-bottom: 20px;
        text-align: justify;
      }
    `,

    customSizeButton: css`
      color: #fff !important;
      border-color: white !important;
    `,

    loading: css`
      width: 50px;
      height: 50px;

      circle {
        stroke: ${theme.colors.primary};
      }
    `,

    loadingWrapper: css`
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    `,
  };

  useEffect(() => {
    const fetchPoF = async () => {
      setIsLoading(true);
      try {
        const res = await API.getPieceOfFurniture(params.product);
        setProduct(res);
      } catch (err) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (state && state.product) {
      setProduct(state.product);
      setIsLoading(false);
    } else fetchPoF();
  }, [params.product, state]);

  return (
    <React.Fragment>
      {isLoading && (
        <div css={style.loadingWrapper}>
          <LoadingSpinner css={style.loading} isLoading={isLoading} />
        </div>
      )}

      {!isLoading && !product && (
        <NoItem />
      )}

      {!isLoading && product && (
        <React.Fragment>
          <Breadcrumbs paths={[
            { name: product.room.name, url: `/katalog?pokoj=${product.room.roomId}` },
            { name: product.category.name, url: `/katalog?pokoj=${product.room.roomId}&kategoria=${product.category.categoryId}` },
            { name: product.name },
          ]}
          />

          <div css={style.product}>
            <h3>{product.name}</h3>
            <p css={style.id}>Numer produktu: {product.id}</p>

            <div css={style.images} ref={refe}>
              {product.photos.map((photo, i) => (
                <img src={`${config.IMAGES_SERVER}${photo}`} alt={i} key={i} css={style.image} />
              ))}
            </div>
            <ProductInfo product={product} />

            <div css={style.customSizeBox}>
              <h4>Nie pasuje Ci rozmiar tego mebla?</h4>
              <p>Wyślij zapytanie, a nasi konsultanci sprawdzą czy możesz go dostać w innym rozmiarze</p>
              <Button
                component={Link}
                to={{
                  pathname: '/niestandardowy',
                  state: { item: product },
                }}
                variant="secondary"
                css={style.customSizeButton}
              >Wyślij zapytanie
              </Button>
            </div>

            {product.parts.length > 0 && (
              <PartsBox product={product} />
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Product;
