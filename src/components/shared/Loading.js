import React from 'react';
import cx from 'classnames';

import { ReactComponent as Spinner } from '../../assets/spinner.svg';
import S from './Loading.module.scss';


const Loading = ({
  children, isLoading, type, text,
}) => (
  <React.Fragment>
    {isLoading ? (
      <div className={cx(S.loading, { [S.alt]: type === 'alt' })}>
        <Spinner className={S.spinner} />
        <h3 className={S.text}>{text}</h3>
      </div>
    ) : children}
  </React.Fragment>
);

export default Loading;
