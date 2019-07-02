/* eslint-disable no-param-reassign */
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import UserProfileForm from './UserProfileForm';
import PasswordChangeForm from './PasswordChangeForm';
import EmailChangeForm from './EmailChangeForm';
import * as API from '../../api';

import { setUserData } from '../../redux/auth';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [userUpdateLoading, setUserUpdateLoading] = useState(false);
  const [emailUpdateLoading, setEmailUpdateLoading] = useState(false);
  const [passwordUpdateLoading, setPasswordUpdateLoading] = useState(false);

  const style = {
    userProfile: css`
      padding: 30px 20px;
    `,

    title: css`
      margin: 0;
      margin-bottom: 30px;
    `,

    subTitle: css`
      margin: 0;
      margin-bottom: 30px;
      padding-top: 70px;
    `,
  };

  const updateUserProfile = async (values) => {
    setUserUpdateLoading(true);
    try {
      const userData = await API.updateUserData({
        ...values,
        nip: (values.nip === '' ? null : values.nip),
      });
      dispatch(setUserData(userData));
      toast('✔️ Zaktualizowano dane!');
    } catch (error) {
      throw new SubmissionError({
        _error: error.title,
        ...error.errors,
      });
    } finally {
      setUserUpdateLoading(false);
    }
  };

  const updatePassword = async (values) => {
    setPasswordUpdateLoading(true);
    try {
      const { repeatPassword, ...data } = values;
      await API.updateUserPassword(data);
      toast('✔️ Zaktualizowano hasło!');
    } catch (error) {
      throw new SubmissionError({
        _error: error.title,
        ...error.errors,
      });
    } finally {
      setPasswordUpdateLoading(false);
    }
  };

  const updateEmail = async (values) => {
    setEmailUpdateLoading(true);
    try {
      await API.updateUserEmail(values);
      toast('✔️ Zaktualizowano adres email!');
    } catch (error) {
      throw new SubmissionError({
        _error: error.title,
        ...error.errors,
      });
    } finally {
      setEmailUpdateLoading(false);
    }
  };

  return (
    <div css={style.userProfile}>
      <h3 css={style.title}>Twoje dane</h3>
      <UserProfileForm
        initialValues={user}
        onSubmit={updateUserProfile}
        isLoading={userUpdateLoading}
      />

      <h3 css={style.subTitle}>Zmiana adresu email</h3>
      <EmailChangeForm
        initialValues={{ newemail: user.email }}
        onSubmit={updateEmail}
        isLoading={emailUpdateLoading}
      />

      <h3 css={style.subTitle}>Zmiana hasła</h3>
      <PasswordChangeForm
        onSubmit={updatePassword}
        isLoading={passwordUpdateLoading}
      />
    </div>
  );
};

export default UserProfile;
