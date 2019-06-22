/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import { useTheme } from '../../helpers';
import { ReactComponent as Chevron } from '../../assets/chevron.svg';
import { ReactComponent as Home } from '../../assets/home_alt.svg';

const Breadcrumbs = ({ paths }) => {
  const theme = useTheme();

  const style = {
    paths: css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `,

    breadcrumb: css`
      padding: 20px 15px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: .3s;
      text-decoration: none;
      color: ${theme.colors.textDark};
      font-size: .9em;

      &:first-child {
        display: flex;
      }

      &:last-child {
        flex: 1;
        color: ${theme.colors.primary};
      }
    `,

    home: css`
      fill: #042365;
      width: 20px;
      height: 20px;
    `,

    chevron: css`
      stroke: ${theme.colors.textDark};
      stroke-width: 10px;
      width: 10px;
      height: 10px;
    `,
  };

  return (
    <div css={style.paths}>
      <Link to="/katalog" css={style.breadcrumb}>
        <Home css={style.home} />
      </Link>

      <Chevron css={style.chevron} />

      {paths.map((path, i) => (
        <React.Fragment key={i}>
          {i + 1 < paths.length ? (
            <React.Fragment>
              <Link to={path.url} css={style.breadcrumb}>{path.name}</Link>
              <Chevron css={style.chevron} />
            </React.Fragment>
          ) : (
            <span css={style.breadcrumb}>{path.name}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
