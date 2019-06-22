import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import * as API from '../api';


export const SET_LISTING = 'SET_LISTING';
export const SET_COLORS = 'SET_COLORS';
export const SET_PATTERNS = 'SET_PATTERNS';
export const SET_MATERIALS = 'SET_MATERIALS';
export const SET_ROOMS = 'SET_ROOMS';
export const SET_CATEGORIES = 'SET_CATEGORIES';

<<<<<<< HEAD
=======
export const setListing = data => ({ type: SET_LISTING, payload: data });
>>>>>>> e5bd51b4b8a93e0652c02c44f7430a901937875f

export const setColors = colors => ({ type: SET_COLORS, payload: colors });

export const fetchColors = () => (dispatch) => {
  API.getColors().then((res) => {
    dispatch(setColors(res));
  });
};

export const setPatterns = patterns => ({ type: SET_PATTERNS, payload: patterns });

export const fetchPatterns = () => (dispatch) => {
  API.getPatterns().then((res) => {
    dispatch(setPatterns(res));
  });
};

export const setMaterials = materials => ({ type: SET_MATERIALS, payload: materials });

export const fetchMaterials = () => (dispatch) => {
  API.getMaterials().then((res) => {
    dispatch(setMaterials(res));
  });
};

export const setRooms = rooms => ({ type: SET_ROOMS, payload: rooms });

export const fetchRooms = () => (dispatch) => {
  API.getRooms().then((res) => {
    dispatch(setRooms(res));
  });
};

export const setCategories = categories => ({ type: SET_CATEGORIES, payload: categories });

export const fetchCategories = () => (dispatch) => {
  API.getCategories().then((res) => {
    dispatch(setCategories(res));
  });
};

<<<<<<< HEAD
export const setListing = listing => ({ type: SET_LISTING, payload: listing });

export const fetchListing = () => (dispatch) => {
  API.getListing().then((res) => {
    dispatch(setListing(res));
  });
};

=======
>>>>>>> e5bd51b4b8a93e0652c02c44f7430a901937875f

const initState = {
  materials: [],
  colors: [],
  patterns: [],
  rooms: [],
  categories: [],
<<<<<<< HEAD
  listing: [],
=======
>>>>>>> e5bd51b4b8a93e0652c02c44f7430a901937875f
};

const dataReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LISTING:
<<<<<<< HEAD
      return { ...state, listing: [...action.payload] };
=======
      return { ...state, furniture: action.payload };
>>>>>>> e5bd51b4b8a93e0652c02c44f7430a901937875f

    case SET_COLORS:
      return { ...state, colors: [...action.payload] };

    case SET_PATTERNS:
      return { ...state, patterns: [...action.payload] };

    case SET_MATERIALS:
      return { ...state, materials: [...action.payload] };

    case SET_CATEGORIES:
      return { ...state, categories: [...action.payload] };

    case SET_ROOMS:
      return { ...state, rooms: [...action.payload] };

    default:
      return state;
  }
};

export default persistReducer({
  key: 'data',
  storage: localForage,
}, dataReducer);
