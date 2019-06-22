/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '../../helpers';
import Button from '../shared/Button';
import LatestFurniture from './LatestFurniture';

const Home = () => {
  const theme = useTheme();
  const user = useSelector(state => state.auth.user);

  const style = {
    hello: css`
      margin: 40px 40px 10px;

      h3 {
        margin: 0 0 30px;
      }
    `,

    text: css`
      font-weight: bold;
    `,

    username: css`
      color: ${theme.colors.primary};
    `,

    btnCatalog: css`
      margin: 30px auto 10px;
      width: 100%;
    `,
  };

  return (
    <React.Fragment>
      <div css={style.hello}>
        {user ? (
          <h3>Witaj ponownie <span css={style.username}>{user.name}</span>!</h3>
        ) : (
          <h3>Witaj <span css={style.username}>kliencie</span>!</h3>
        )}
        <p css={style.text}>Tysiące okazji czeka właśnie na Ciebie. Nie pozwól im Cię ominąć!</p>
        <Button variant="secondary" css={style.btnCatalog} component={Link} to="/katalog">Sprawdź!</Button>
      </div>

      <LatestFurniture />
    </React.Fragment>
  );
};

export default Home;
