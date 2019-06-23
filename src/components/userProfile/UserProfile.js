/* eslint-disable no-param-reassign */
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import UserDataPage from './UserDataPage';
import OrdersPage from './OrdersPage';
import CustomRequestsPage from './CustomRequestsPage';
import TabView from '../shared/TabView';

const UserProfile = () => {
  const style = {
  };

  return (
    <div css={style.userProfile}>
      <TabView views={[
        { name: 'Twoje dane', component: UserDataPage },
        { name: 'Zamówienia', component: OrdersPage },
        { name: 'Zapytania', component: CustomRequestsPage },
      ]}
      />
    </div>
  );
};

export default UserProfile;
