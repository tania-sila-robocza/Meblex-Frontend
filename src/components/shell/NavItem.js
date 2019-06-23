/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../helpers';
import { ripple } from '../../styles';


const NavItem = ({ text, icon: Icon, ...props }) => {
  const theme = useTheme();

  const style = {
    navItem: css`
      ${ripple()};
      display: flex;
      flex: 1;
      text-decoration: none;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;

      &.active {
        svg {
          fill: ${theme.colors.primary};
        }

        p {
          color: ${theme.colors.primary};
        }
      }
    `,

    icon: css`
      width: 25px;
      height: 25px;
      fill: ${theme.colors.primary};
      fill: ${theme.colors.text};
    `,

    text: css`
      font-size: .7em;
      margin: 0;
      margin-top: 10px;
      color: ${theme.colors.textDark};
    `,
  };

  return (
    <NavLink css={style.navItem} activeClassName="active" exact {...props}>
      {Icon && <Icon css={style.icon} />}
      <p css={style.text}>{text}</p>
    </NavLink>
  );
};

export default NavItem;
