/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import React, { useState } from 'react';
import { SubmissionError } from 'redux-form';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useTheme } from '../../helpers';

import { ReactComponent as Logo } from '../../assets/meblex_logo.svg';
import { Furniture } from '../../assets';
import * as API from '../../api';
import LoginForm from './LoginForm';


const LoginScreen = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const user = useSelector(state => state.auth.user);

  const { from } = location.state || { from: { pathname: '/' } };

  const style = {
    welcome: css`
      display: flex;
      width: 100%;
      height: 100%;
      min-height: 100vh;
      background: ${theme.colors.background};
      position: relative;
      padding: 0;
    `,

    logo: css`
      margin: 30px 0;
      fill: ${theme.colors.primary};
      height: 70px;
    `,

    icons: css`
      opacity: .5;
      position: absolute;
      height: 100vh;
      top: 0;
      left: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      overflow: hidden;
      padding-top: 20px;
    `,

    icon: css`
      margin: 40px;
      display: inline-block;
      width: 30px;
      height: 30px;
      fill: ${theme.colors.primary};
    `,
  };

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      await API.login(values);
    } catch (err) {
      throw new SubmissionError({ _error: err.title });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      {user && <Redirect to={from} />}

      <section css={style.welcome}>
        <div css={style.icons}>
          {Object.keys(Furniture).map((key, i) => {
            const Icon = Furniture[key];
            return <Icon key={i} css={style.icon} />;
          })}
        </div>

        <Logo css={style.logo} />
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </section>
    </React.Fragment>
  );
};

export default LoginScreen;
