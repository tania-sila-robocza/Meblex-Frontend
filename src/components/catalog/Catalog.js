/** @jsx jsx */

import { jsx, css } from '@emotion/core';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { useTheme, getRoomIcon, getCategoryIcon } from '../../helpers';
import { Icons } from '../../assets';
import SearchBox from './SearchBox';
import Filters from './Filters';
import ItemResult from './ItemResult';
import NoItem from '../shared/NoItem';
import Button from '../shared/Button';
import * as API from '../../api';
import LoadingSpinner from '../shared/LoadingSpinner';


const Catalog = ({ location: { search } }) => {
  const filtersElem = useRef();
  const theme = useTheme();

  const filters = useSelector(state => state.filters);
  const rawCategories = useSelector(state => state.data.categories);
  const rawRooms = useSelector(state => state.data.rooms);

  const rooms = rawRooms.map(room => ({ ...room, icon: getRoomIcon(room.roomId) }));
  const categories = rawCategories.map(category => ({ ...category, icon: getCategoryIcon(category.categoryId) }));

  const [furniture, setFurniture] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [anyFilters, setAnyFilters] = useState(false);
  const [filtersCount, setFiltersCount] = useState(0);

  const selectedRoom = new URLSearchParams(search).get('pokoj');
  const selectedCategory = new URLSearchParams(search).get('kategoria');

  const style = {
    title: css`
      margin: 40px auto 20px;
      width: 80%;
    `,

    grid: css`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: left;
      margin: 0;
      padding: 0;
    `,

    gridItem: css`
      width: 33%;
      display: flex;
      flex-direction: column;
      padding: 20px;
      transition: .3s;
      text-decoration: none;

      &:hover {
        background: ${theme.colors.primary_01};
      }

      & > h4 {
        margin: 10px auto;
        margin-top: 15px;
        font-size: .9em;
        text-align: center;
      }
    `,

    itemIcon: css`
      margin-top: 10px;
      height: 40px;
      fill: ${theme.colors.text};
    `,

    loading: css`
      width: 50px;
      height: 50px;
      margin: 40px auto;

      circle {
        stroke: ${theme.colors.primary};
      }
    `,

    searchSection: css`
      display: flex;
      flex-direction: row;
    `,

    filterBtn: css`
      padding: 0;
      height: 60px;
      margin: 0 0 0 10px;
      border: none;

      svg {
        fill: ${theme.colors.primary};
        margin: 0 10px;
        width: 25px;
        height: 25px;
      }
    `,

    count: css`
      position: absolute;
      bottom: 5px;
      right: 0;
      background: ${theme.colors.primary};
      width: 22px;
      height: 22px;
      border-radius: 20px;
      font-size: .7em;
      color: #fff;
      text-align: center;
      line-height: 1.8em;
      font-weight: bold;
    `,
  };

  const fetchFurniture = useCallback(async () => {
    const filterBy = (type, selected, fromSearchBox, includeParts = false) => {
      const data = ((selected.length > 0) ? selected : [fromSearchBox]).filter(Boolean);
      return data.length === 0 ? undefined : data.map(d => (
        `(${type}/${type}Id eq ${d[`${type}Id`]})${includeParts ? ` or (parts/any(p: p/${type}/${type}Id eq ${d[`${type}Id`]}))` : ''}`
      )).join(' or ');
    };

    const filter = [
      filterBy('color', filters.colors, filters.searchBox.color, true),
      filterBy('pattern', filters.patterns, filters.searchBox.pattern, true),
      filterBy('material', filters.materials, filters.searchBox.material, true),
      filterBy('category', selectedCategory ? [{ categoryId: selectedCategory }] : [], filters.searchBox.category),
      filterBy('room', selectedRoom ? [{ roomId: selectedRoom }] : [], filters.searchBox.room),
    ].filter(Boolean);

    if (filter.length === 0) {
      setAnyFilters(false);
      return;
    }
    setAnyFilters(true);

    setIsLoading(true);
    try {
      const result = await API.getFurniture({
        filter: `${filter.map(f => `(${f})`).join(' and ')}`,
      });
      setFurniture(result);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }, [filters, selectedCategory, selectedRoom]);

  useEffect(() => {
    fetchFurniture();
  }, [fetchFurniture]);

  useEffect(() => {
    const a = Object.keys(filters).filter(k => k !== 'searchBox').map(k => filters[k].length).reduce((a, b) => a + b);
    setFiltersCount(a);
  }, [filters]);

  return (
    <React.Fragment>
      <section css={style.searchSection}>
        <SearchBox />

        <Button
          css={style.filterBtn}
          variant="secondary"
          onClick={() => {
            setShowFilters(true);
            disableBodyScroll(filtersElem.current);
          }}
        >
          <Icons.Filter css={style.icon} />
          {filtersCount > 0 && <span css={style.count}>{filtersCount}</span>}
        </Button>
      </section>


      {isLoading && (
        <LoadingSpinner css={style.loading} isLoading={isLoading} />
      )}

      {!isLoading && furniture.length > 0 && (
        <div>
          {furniture.map((item, i) => <ItemResult data={item} key={i} />)}
        </div>
      )}

      {!isLoading && furniture.length === 0 && anyFilters && (
        <NoItem />
      )}

      <h3 css={style.title}>Pokoje</h3>
      <section css={style.grid}>
        {rooms.map(Room => (
          <Link to={{ pathname: '/katalog', search: `pokoj=${Room.roomId}` }} css={style.gridItem} key={Room.roomId}>
            <Room.icon css={style.itemIcon} />
            <h4>{Room.name}</h4>
          </Link>
        ))}
      </section>

      <h3 css={style.title}>Kategorie</h3>
      <section css={style.grid}>
        {categories.map(Cat => (
          <Link to={{ pathname: '/katalog', search: `kategoria=${Cat.categoryId}` }} css={style.gridItem} key={Cat.categoryId}>
            <Cat.icon css={style.itemIcon} />
            <h4>{Cat.name}</h4>
          </Link>
        ))}
      </section>

      {showFilters && (
      <Filters
        hideModal={() => {
          setShowFilters(false);
          clearAllBodyScrollLocks();
        }}
        ref={filtersElem}
      />
      )}
    </React.Fragment>
  );
};

export default Catalog;
