import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import { LOGOUT } from './auth';

export const ADD_ITEM_TO_FITTER = 'ADD_ITEM_TO_FITTER';
export const REMOVE_ITEM_FROM_FITTER = 'REMOVE_ITEM_FROM_FITTER';
export const SET_ROOM_SIZE = 'SET_ROOM_SIZE';

export const addItemToFitter = item => ({ type: ADD_ITEM_TO_FITTER, payload: item });
export const removeItemFromFitter = idx => ({ type: REMOVE_ITEM_FROM_FITTER, payload: idx });
export const setRoomSize = size => ({ type: SET_ROOM_SIZE, payload: size });

const initState = {
  items: [],
  roomSize: {},
};

const fitterReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_FITTER:
      return { ...state, items: [...state.items, action.payload] };

    case REMOVE_ITEM_FROM_FITTER:
      return { ...state, items: state.items.filter(id => id !== action.payload) };

    case SET_ROOM_SIZE:
      return { ...state, roomSize: action.payload };

    case LOGOUT:
      return { items: [] };

    default:
      return state;
  }
};

export default persistReducer({
  key: 'fitter',
  storage: localForage,
}, fitterReducer);
