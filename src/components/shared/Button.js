/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';
import { useTheme } from '../../helpers';
import { ripple } from '../../styles';
import LoadingSpinner from './LoadingSpinner';

// eslint-disable-next-line react/button-has-type
export const HTMLButton = props => <button {...props} />;
// eslint-disable-next-line jsx-a11y/anchor-has-content
export const HTMLAnchor = props => <a {...props} />;

const Button = ({
  component: Component, variant, icon: Icon, children, isLoading, ...props
}) => {
  const theme = useTheme();

  const style = {
    button: css`
      ${ripple('rgba(255, 255, 255, .2)')};
      border-radius: 5px;
      background: ${theme.colors.primary};
      color: #ffffff;
      border: 2px solid ${theme.colors.primary};
      padding: 15px 30px;
      font-size: 1.2em;
      font-weight: bold;
      cursor: pointer;
      margin: 10px;
      transition: .3s;
      text-decoration: none;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      align-self: center;
      justify-content: center;

      &:hover {
        background: ${theme.colors.hover};
      }
      `,

    secondary: css`
      background: none;
      color: ${theme.colors.primary};

      &:hover {
        background: ${theme.colors.primary_01};
      }
    `,

    icon: css`
      width: 20px;
      height: 20px;
      margin-right: 20px;
      fill: ${theme.colors.primary};
    `,

    loading: css`
      width: 30px;
      margin-right: 10px;
      height: 22px;
      margin-left: -20px;
    `,
  };

  const handleFocus = ({ target }) => {
    setTimeout(() => { target.blur(); }, 300);
  };

  return (
    <Component
      css={[style.button, (variant === 'secondary' ? style.secondary : null)]}
      type="button"
      onMouseUp={handleFocus}
      {...props}
    >
      <LoadingSpinner css={style.loading} isLoading={isLoading} />
      {Icon && <Icon css={style.icon} />}
      {children}
    </Component>
  );
};

Button.defaultProps = {
  variant: 'normal',
  component: HTMLButton,
};

Button.propTypes = {
  variant: PropTypes.oneOf(['normal', 'secondary']),
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
};

export default Button;
