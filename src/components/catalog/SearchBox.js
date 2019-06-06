/* eslint-disable prefer-destructuring */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import Fuse from 'fuse.js';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../helpers';
import { Icons } from '../../assets';
import { setSearchboxFilter } from '../../redux/filters';

const SearchBox = () => {
  const [filter, setFilter] = useState('');
  const theme = useTheme();
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();

  const style = {
    searchBox: css`
      width: 100%;
      position: relative;
    `,

    form: css`
      display: flex;
    `,

    icon: css`
      position: absolute;
      height: 30px;
      top: 15px;
      left: 15px;
      fill: ${theme.colors.shadowDark};
    `,

    input: css`
      width: 100%;
      height: 60px;
      padding-left: 60px !important;
      padding-right: 60px !important;
      /* background: ${theme.colors.primary} !important; */
      /* border-color: ${theme.colors.primary} !important; */

      &::placeholder {
        color: ${theme.colors.textDark};
      }
    `,

    clear: css`
      position: absolute;
      height: 20px;
      top: 20px;
      right: 20px;
      fill: ${theme.colors.shadowDark};
    `,
  };

  const clearInput = () => setFilter('');

  const fuseConfig = {
    shouldSort: true,
    maxPatternLength: 32,
    includeScore: true,
    minMatchCharLength: 3,
    tokenize: true,
    includeMatches: true,
  };

  const analyseQuery = (fuse, keywords) => {
    let item;
    for (let i = 0; i < keywords.length; i += 1) {
      const result = fuse.search(keywords[i]);
      if (result.length && result[0].matches.length && result[0].score < 0.5) {
        item = result[0].item;
        keywords.splice(i, 1);
        break;
      }
    }
    return [item, keywords];
  };

  const submit = (event) => {
    event.preventDefault();
    const keywords = filter.split(' ');

    const colorFuse = new Fuse(data.colors, { ...fuseConfig, keys: ['name'] });
    const categoryFuse = new Fuse(data.categories, { ...fuseConfig, keys: ['name'] });
    const patternFuse = new Fuse(data.patterns, { ...fuseConfig, keys: ['name'] });
    const materialFuse = new Fuse(data.materials, { ...fuseConfig, keys: ['name'] });

    const [color, keywords1] = analyseQuery(colorFuse, keywords);
    const [category, keywords2] = analyseQuery(categoryFuse, keywords1);
    const [pattern, keywords3] = analyseQuery(patternFuse, keywords2);
    const [material, keywords4] = analyseQuery(materialFuse, keywords3);

    // console.log('Kolor:', color);
    // console.log('Wzór:', pattern);
    // console.log('Materiał:', material);
    // console.log('Kategoria:', category);

    dispatch(setSearchboxFilter({ color, pattern, material, category }));
  };

  const handleInput = ({ target }) => setFilter(target.value);

  return (
    <form css={style.form} onSubmit={submit}>
      <label htmlFor="searchBox" css={style.searchBox}>
        <Icons.Search css={style.icon} />
        <input
          type="text"
          value={filter}
          onChange={handleInput}
          id="searchBox"
          autoComplete="search"
          placeholder="np. żółte dębowe krzesło"
          css={style.input}
        />
        {filter && <Icons.Close onClick={clearInput} css={style.clear} />}
      </label>
    </form>
  );
};

export default SearchBox;
