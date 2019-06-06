/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../../helpers';
import { Icons } from '../../assets';
import { roleName } from '../../redux/auth';

const UserInfo = ({ location }) => {
  const user = useSelector(state => state.auth.user);
  const theme = useTheme();

  const style = {
    user: css`
      text-decoration: none;
      padding: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      background: none;
      transition: .3s;
    `,

    userInfo: css`

    `,

    role: css`
      margin: 0;
      font-size: .8em;
    `,

    icon: css`
      height: 40px;
      width: 40px;
      margin-left: 10px;
      margin-right: 25px;
      transition: .3s;
      border-radius: 30px;
      fill: ${theme.colors.primaryDark};
    `,

    username: css`
      font-weight: bold;
      color: ${theme.colors.textDark};
    `,
  };

  return (user ? (
    <Link to="/profil" css={style.user}>
      <Icons.User css={style.icon} />
      <div css={style.userInfo}>
        <h5 css={style.username}>{user.name}</h5>
        <p css={style.role}>{roleName(user.role)}</p>
      </div>
    </Link>
  ) : (
    <Link
      to={{
        pathname: '/logowanie',
        state: { from: location },
      }}
      css={style.user}
    >
      <Icons.User css={style.icon} />
      <p css={style.username}>Zaloguj się</p>
    </Link>
  ));
};

export default withRouter(UserInfo);
