/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';
import { ReactComponent as Spinner } from '../../assets/spinner.svg';
import S from './Loading.module.scss';


const LoadingSpinner = ({ isLoading, ...props }) => {
  const style = {
    loading: css`

    `,
  };

  return (
    <React.Fragment>
      {isLoading && <Spinner className={S.spinner} css={style.loading} {...props} />}
    </React.Fragment>
  );
};

export default LoadingSpinner;
