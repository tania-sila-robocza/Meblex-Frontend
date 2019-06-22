export const SET_COLORS_FILTER = 'SET_COLORS_FILTER';
export const SET_PATTERNS_FILTER = 'SET_PATTERNS_FILTER';
export const SET_MATERIALS_FILTER = 'SET_MATERIALS_FILTER';
export const SET_SEARCHBOX_FILTER = 'SET_SEARCHBOX_FILTER';

export const setColorsFilter = colors => ({ type: SET_COLORS_FILTER, payload: colors });
export const setPatternsFilter = patterns => ({ type: SET_PATTERNS_FILTER, payload: patterns });
export const setMaterialsFilter = materials => ({ type: SET_MATERIALS_FILTER, payload: materials });
export const setSearchboxFilter = filter => ({ type: SET_SEARCHBOX_FILTER, payload: filter });

const initState = {
  colors: [],
  materials: [],
  patterns: [],
  searchBox: {},
};

const filtersReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_COLORS_FILTER:
      return { ...state, colors: action.payload };

    case SET_PATTERNS_FILTER:
      return { ...state, patterns: action.payload };

    case SET_MATERIALS_FILTER:
      return { ...state, materials: action.payload };

    case SET_SEARCHBOX_FILTER:
      return { ...state, searchBox: action.payload };

    default:
      return state;
  }
};

export default filtersReducer;
