/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useSelector } from 'react-redux';
import { useTheme } from '../../helpers';
import { Icons } from '../../assets';
import NavItem from './NavItem';
import { Roles } from '../../redux/auth';


const Navigation = () => {
  const theme = useTheme();
  const user = useSelector(state => state.auth.user);

  const isUserAuthorized = roles => !roles || (user && user.role && roles.some(elem => elem === user.role));

  const mainItems = [
    { text: 'Pulpit', icon: Icons.Home, url: '/' },
    { text: 'Katalog', icon: Icons.ShoppingBag, url: '/katalog' },
    { text: 'FITTER™', icon: Icons.JigSaw, url: '/fitter' },
    { text: 'Panel', icon: Icons.Settings, url: '/panel', roles: [Roles.EMPLOYEE] },
  ];

  const style = {
    navigation: css`
      display: flex;
      flex-direction: row;
      background: #fff;
      box-shadow: 0px 1px 20px ${theme.colors.shadowDark};
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 70px;
      z-index: 2;
    `,
  };

  return (
    <div css={style.navigation}>
      {mainItems.map((item, i) => (
        isUserAuthorized(item.roles) ? (
          <NavItem key={i} text={item.text} icon={item.icon} to={item.url} />
        ) : null
      ))}
    </div>
  );
};

export default Navigation;
