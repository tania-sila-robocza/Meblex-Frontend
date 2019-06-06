/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTheme } from '../../helpers';
import { Icons } from '../../assets';
import * as API from '../../api';
import { fetchPatterns } from '../../redux/data';
import config from '../../config';

const PatternsList = () => {
  const patterns = useSelector(state => state.data.patterns);
  const theme = useTheme();
  const dispatch = useDispatch();

  const style = {
    panel: css`
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

    pattern: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 20px 0;

      h4 {
        margin: 0;
        font-size: .9em;
        flex: 1;
      }
    `,

    icon: css`
      width: 30px;
      height: 30px;
      margin-right: 20px;
      border-radius: 50%;
      box-shadow: 0px 1px 5px ${theme.colors.shadowDark};
      border: 1px solid ${theme.colors.primaryDark};
      background-size: cover;
    `,

    remove: css`
      width: 15px;
      height: 15px;
      fill: red;
      margin-right: 10px;
    `,
  };

  const removePattern = async (id) => {
    try {
      await API.removePattern(id);
      toast('✔️ Usunięto wzór!');
      dispatch(fetchPatterns());
    } catch (error) {
      toast('🔥 Wystąpił błąd przy usuwaniu!');
    }
  };

  return (
    <React.Fragment>
      <div css={style.panel}>
        <h3 css={style.title}>Istniejące wzory</h3>

        <div css={style.list}>
          {patterns.sort((a, b) => ((a.name < b.name) ? -1 : 1)).map(pattern => (
            <div css={style.pattern} key={pattern.patternId}>
              <div css={[style.icon, { backgroundImage: `url(${config.IMAGES_SERVER}${pattern.photo})` }]} />
              <h4>{pattern.name}</h4>
              <span css={style.remove} role="button" tabIndex={0} onClick={() => removePattern(pattern.patternId)}>
                <Icons.Close2 />
              </span>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PatternsList;
