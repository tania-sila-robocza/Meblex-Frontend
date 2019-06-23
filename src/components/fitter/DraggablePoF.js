/* eslint-disable no-param-reassign */
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useEffect, useRef } from 'react';
import Draggabilly from '../../draggabilly';
import { useTheme, getCategoryIcon } from '../../helpers';


const DraggablePoF = ({ product, factor }) => {
  const theme = useTheme();
  const element = useRef();
  const Icon = getCategoryIcon(product.category.categoryId);

  const margin = 10;
  const style = {
    draggablePoF: css`
      display: inline-block;
      background: #f9f9f9;
      width: 0;
      height: 0;
      position: absolute;
      border: 1px solid #bababa;

      svg {
        fill: ${theme.colors.text};
        position: absolute;
        left: ${margin}px;
        top: ${margin}px;
        width: calc(100% - ${2 * margin}px);
        height: calc(100% - ${2 * margin}px);
        pointer-events: none;
      }
    `,
  };

  useEffect(() => {
    const draggable = new Draggabilly(element.current, {
      containment: true,
    });

    const [width, length, height] = product.size.split('x');

    element.current.style.width = `${width * factor}px`;
    element.current.style.height = `${length * factor}px`;
  }, [factor, product.size]);

  const rotateElement = ({ target }) => {
    const { width, height } = target.getBoundingClientRect();
    target.style.width = `${height}px`;
    target.style.height = `${width}px`;
  };

  return (
    <div css={style.draggablePoF} ref={element} onClick={rotateElement} role="button" tabIndex={0}>
      <Icon />
    </div>
  );
};

export default DraggablePoF;
