/** @jsx jsx */

import React, { useState, useRef } from 'react';
import { jsx, css } from '@emotion/core';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '../../helpers';
import { ripple } from '../../styles';

const TabView = ({ views }) => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const tabsElem = useRef();

  const style = {
    tabs: css`
      display: flex;
      flex-direction: row;
      width: 100%;    
      overflow: scroll;
      position: relative;
    `,

    tab: css`
      background: none;
      border: none;
      ${ripple('rgba(0, 0, 0, .2)')};
      outline: none;
      text-align: center;
      font-weight: bold;
      color: ${theme.colors.textDark};
      font-size: 1em;
      padding: 20px 20px;
      display: inline-flex;
      white-space: nowrap;
    `,

    tabWrapper: css`
    `,
  };

  const handleTabClick = ({ target }) => {
    const children = Array.from(tabsElem.current.children);
    setIndex(children.indexOf(target.parentNode));
  };

  const handleMouseUp = ({ target }) => {
    setTimeout(() => { target.blur(); }, 300);
  };

  return (
    <React.Fragment>
      <div css={style.tabs} ref={tabsElem}>
        {views.map((view, i) => (
          <div css={style.tabWrapper} key={i}>
            <button css={style.tab} type="button" onClick={handleTabClick} onMouseUp={handleMouseUp}>
              {view.name}
            </button>
          </div>
        ))}
      </div>

      <SwipeableViews index={index} onChangeIndex={i => setIndex(i)}>
        {views.map((View, i) => <View.component key={i} />)}
      </SwipeableViews>
    </React.Fragment>
  );
};

export default TabView;
