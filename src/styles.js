/* eslint-disable import/prefer-default-export */
import { css, keyframes } from '@emotion/core';

const breakpointUp = (size, content) => css`
  @media (min-width: ${size}px) {
    ${content}
  }
`;

const breakpointUpTo = (size, content) => css`
  @media (max-width: ${size}px) {
    ${content}
  }
`;

export const forPhoneOnly = content => breakpointUpTo(599, content);
export const forTabletPortraitUp = content => breakpointUp(600, content);
export const forTabletLandscapeUp = content => breakpointUp(800, content);
export const forDesktopUp = content => breakpointUp(1200, content);
export const forBigDesktopUp = content => breakpointUp(1800, content);


export const theme = {
  colors: {
    primary: 'rgb(0, 105, 255)',
    primaryDark: 'rgb(4, 35, 101)',
    backgroundGray: 'rgb(243, 245, 249)',
    gray: 'rgb(208, 211, 216)',
    background: 'rgb(255, 255, 255)',

    text: 'rgba(4, 35, 101, 0.7)',
    textDark: 'rgb(4, 35, 101)',
    shadow: 'rgba(4, 35, 101, 0.06)',
    shadowDark: 'rgba(4, 35, 101, 0.22)',
    hover: 'rgb(0, 84, 204)',
    primary_01: 'rgba(0, 105, 255, 0.1)',
  },
};


const rippleAnimation = keyframes`
  0% {
    transform: scale(0, 0);
    opacity: 1;
  }
  20% {
    transform: scale(25, 25);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
`;

export const ripple = (color = 'rgba(97, 97, 97, .2)') => css`
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: calc(50% - 2.5px);
    left: calc(50% - 2.5px);
    width: 5px;
    height: 5px;
    background: ${color};
    opacity: 0;
    border-radius: 50%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
    transition: .3s;
  }

  &:focus::after {
    animation: ${rippleAnimation} .5s ease-out;
  }
`;
