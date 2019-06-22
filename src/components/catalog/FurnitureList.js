/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import React, { useState, useEffect } from 'react';
import ItemResult from './ItemResult';
import NoItem from '../shared/NoItem';
import * as API from '../../api';
import LoadingSpinner from '../shared/LoadingSpinner';
import { useTheme } from '../../helpers';
import { ripple } from '../../styles';


const FurnitureList = ({ perPage, filter, anyFilters }) => {
  const [furniture, setFurniture] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const theme = useTheme();

  const style = {
    loading: css`
      width: 50px;
      height: 50px;
      margin: 40px auto;

      circle {
        stroke: ${theme.colors.primary};
      }
    `,

    pagination: css`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 20px 0;

      button {
        ${ripple('rgba(255, 255, 255, .2)')};
        background: #fff;
        box-shadow: 0px 1px 10px rgba(4,35,101,0.22);
        border-radius: 5px;
        padding: 5px 15px;
        border: 0.5px solid ${theme.colors.text};
        margin: 0 10px;

        span {
          font-size: 2em;
          font-weight: bold;
        }
      }
    `,

    pageNumber: css`
      margin: 0 20px;
      font-weight: bold;
      color: ${theme.colors.primary};
    `,
  };

  const nextPage = () => {
    if (furniture.length === perPage) setPage(page + 1);
  };

  const prevPage = () => {
    setPage(Math.max(page - 1, 0));
  };

  useEffect(() => setPage(0), [filter]);

  useEffect(() => {
    const fetchFurniture = async () => {
      setIsLoading(true);
      try {
        const result = await API.getFurniture({
          filter: `${filter.map(f => `(${f})`).join(' and ')}`,
          limit: perPage,
          skip: page * perPage,
        });

        if (page > 0 && result.length === 0) {
          setPage(page - 1);
        } else {
          setFurniture(result);
        }
      } catch (error) {
      //
      } finally {
        setIsLoading(false);
      }
    };
    if (anyFilters) fetchFurniture();
  }, [anyFilters, filter, page, perPage]);

  return (
    <React.Fragment>
      {isLoading && (
        <LoadingSpinner css={style.loading} isLoading={isLoading} />
      )}

      {!isLoading && furniture.length > 0 && (
        <div>
          {furniture.map((item, i) => <ItemResult data={item} key={i} />)}
        </div>
      )}

      {furniture.length >= perPage && (
        <div css={style.pagination}>
          <button type="button" onClick={prevPage}><span>‹</span></button>
          <span css={style.pageNumber}>{page + 1}</span>
          <button type="button" onClick={nextPage}><span>›</span></button>
        </div>
      )}

      {!isLoading && furniture.length === 0 && anyFilters && (
        <NoItem />
      )}
    </React.Fragment>
  );
};

export default FurnitureList;
