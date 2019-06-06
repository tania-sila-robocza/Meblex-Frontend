import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import { clearCart } from './cart';


export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const LOGOUT = 'LOGOUT';
export const SET_USER_DATA = 'SET_USER_DATA';

export const Roles = {
  USER: 'Client',
  EMPLOYEE: 'Worker',
};

export const roleName = role => ({
  [Roles.USER]: 'Klient',
  [Roles.EMPLOYEE]: 'Pracownik',
}[role]);

export const setAccessToken = token => ({ type: SET_ACCESS_TOKEN, payload: token });
export const setRefreshToken = token => ({ type: SET_REFRESH_TOKEN, payload: token });
export const setUserData = data => ({ type: SET_USER_DATA, payload: data });

export const logout = () => (dispatch) => {
  dispatch(clearCart());
  dispatch({ type: LOGOUT });
};

const initState = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };

    case SET_REFRESH_TOKEN:
      return { ...state, refreshToken: action.payload };

    case SET_USER_DATA:
      return { ...state, user: action.payload };

    case LOGOUT:
      return {
        ...state, accessToken: undefined, refreshToken: undefined, user: undefined,
      };

    default:
      return state;
  }
};

export default persistReducer({
  key: 'auth',
  storage: localForage,
  whitelist: ['accessToken', 'refreshToken', 'user'],
}, loginReducer);
