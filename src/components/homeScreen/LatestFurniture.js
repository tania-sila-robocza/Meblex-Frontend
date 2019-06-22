/** @jsx jsx */

import React, { useEffect, useState } from 'react';
import { css, jsx } from '@emotion/core';
import ItemResult from '../catalog/ItemResult';
import * as API from '../../api';
import LoadingSpinner from '../shared/LoadingSpinner';
import { useTheme } from '../../helpers';

const LatestFurniture = () => {
  const [latestFurniture, setLatestFurniture] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const fetchFurniture = async () => {
      setIsLoading(true);
      try {
        const furniture = await API.getFurniture({ sortBy: 'id desc', limit: 5 });
        setLatestFurniture(furniture);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    };
    fetchFurniture();
  }, []);

  const style = {
    title: css`
      margin: 40px 40px 20px;
    `,

    latest: css`
      margin: 0 20px;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px;
    `,

    loading: css`
      width: 50px;
      height: 50px;

      circle {
        stroke: ${theme.colors.primary};
      }
    `,
  };

  return (
    <React.Fragment>
      <h4 css={style.title}>Ostatnio dodane</h4>
      <div css={style.latest}>
        {isLoading && (
          <LoadingSpinner css={style.loading} isLoading={isLoading} />
        )}

        {!isLoading && (
          latestFurniture.map(f => <ItemResult key={f.id} data={f} />)
        )}
      </div>
    </React.Fragment>
  );
};

export default LatestFurniture;
