/* eslint-disable import/prefer-default-export */
import { ThemeContext } from '@emotion/core';
import { useContext } from 'react';
import { Furniture } from './assets';

export const useTheme = () => useContext(ThemeContext);

export const getRoomIcon = slug => ({
  // salon: Furniture.Couch,
  // kuchnia: Furniture.Kitchen,
  // lazienka: Furniture.SingleBed,
  // jadalnia: Furniture.DiningTable,

  1: Furniture.DoubleBed,
  2: Furniture.Couch,
  4: Furniture.Kitchen,
  5: Furniture.DiningTable,
  6: Furniture.OfficeChair,
  7: Furniture.Mirror,
  10: Furniture.Plant,
})[slug];

export const getCategoryIcon = slug => ({
  // krzesla: Furniture.DiningChair,
  // lozka: Furniture.DoubleBed,
  // sofy: Furniture.Sofa,
  // fotele: Furniture.Armchair,
  // regaly: Furniture.Bookcase,
  // stoly: Furniture.DiningTable,
  // biurka: Furniture.Desk,
  // polki: Furniture.Shelves,
  // szafy: Furniture.Wardrobe,
  // komody: Furniture.ChestOfDrawers,
  // lustra: Furniture.Mirror,
  // 'szafki-tv': Furniture.TvTable,

  1: Furniture.Sofa,
  2: Furniture.Armchair,
  3: Furniture.Bookcase,
  4: Furniture.Table1,
  5: Furniture.Desk,
  6: Furniture.Shelves,
  7: Furniture.Wardrobe,
  8: Furniture.ChestOfDrawers,
  9: Furniture.Mirror,
  10: Furniture.TvTable,
  11: Furniture.DoubleBed,
  12: Furniture.DiningChair,
})[slug];
