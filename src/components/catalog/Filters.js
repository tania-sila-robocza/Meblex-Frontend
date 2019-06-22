/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../helpers';
import { ReactComponent as Close } from '../../assets/close_2.svg';

import { setColorsFilter, setPatternsFilter, setMaterialsFilter } from '../../redux/filters';

import Checkbox from '../shared/Checkbox';


const Filters = ({ hideModal }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const data = useSelector(state => state.data);

  const filters = useSelector(state => state.filters);


  const style = {
    filterBox: css`
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      /* width: 100%; */
      /* box-shadow: 0px -1px 20px ${theme.colors.shadowDark}; */
      /* transition: .5s; */
      /* height: calc(100vh - 60px); */
      height: 100vh;
      z-index: 3;
      overflow: scroll;
    `,

    boxOpened: css`
      /* top: 70px; */
      max-height: calc(100vh - 70px);
    `,

    header: css`
      display: flex;
      flex-direction: column;
      padding: 15px 20px;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      transition: .5s;
      align-items: flex-start;

      & > h3 {
        margin: 0;
        font-size: 2em;
      }
    `,

    boxIcon: css`
      width: 20px;
      height: 20px;
      transition: .3s;
      transform: rotate(-90deg);
    `,

    filters: css`
      padding: 20px 30px;
      overflow: scroll;
    `,

    filter: css`
      display: flex;
      flex-direction: row;
      padding: 20px 0;
      align-items: baseline;

      & > h4 {
        margin: 0;
        margin-right: 20px;
      }
    `,

    filterOptions: css`
      display: flex;
      flex: 1;
      flex-wrap: wrap;
    `,

    filterInput: css`
      flex: 1;
    `,

    close: css`
      fill: ${theme.colors.text};
      width: 25px;
      height: 25px;
      margin-bottom: 30px;
    `,
  };

  const handleChange = (id, val, type) => {
    const action = {
      colors: setColorsFilter,
      materials: setMaterialsFilter,
      patterns: setPatternsFilter,
    }[type];

    dispatch(action(val ? (
      [...filters[type], ...data[type].filter(f => f[`${type.substring(0, type.length - 1)}Id`] === id)]
    ) : (
      filters[type].filter(f => f[`${type.substring(0, type.length - 1)}Id`] !== id)
    )));
    // HACK: Fix filters
  };

  return (
    <div css={style.filterBox}>
      <div css={style.header}>
        <Close css={style.close} onClick={hideModal} />
        <h3>Filtry</h3>
      </div>

      <div css={style.filters}>

        <div css={style.filter}>
          <h4>Kolor:</h4>
          <div css={style.filterOptions}>
            {data.colors.map(c => (
              <Checkbox
                key={c.colorId}
                label={c.name}
                checked={filters.colors.some(filter => filter.colorId === c.colorId)}
                onChange={val => handleChange(c.colorId, val, 'colors')}
              />
            ))}
          </div>
        </div>

        <div css={style.filter}>
          <h4>Wzór:</h4>
          <div css={style.filterOptions}>
            {data.patterns.map(c => (
              <Checkbox
                key={c.patternId}
                label={c.name}
                checked={filters.patterns.some(filter => filter.patternId === c.patternId)}
                onChange={val => handleChange(c.patternId, val, 'patterns')}
              />
            ))}
          </div>
        </div>

        <div css={style.filter}>
          <h4>Materiał:</h4>
          <div css={style.filterOptions}>
            {data.materials.map(c => (
              <Checkbox
                key={c.materialId}
                label={c.name}
                checked={filters.materials.some(filter => filter.materialId === c.materialId)}
                onChange={val => handleChange(c.materialId, val, 'materials')}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Filters;
