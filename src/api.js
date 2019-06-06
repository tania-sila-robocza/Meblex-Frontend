/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

import axios, { CancelToken } from 'axios';
import { store } from './store';
import { setAccessToken, setRefreshToken } from './redux/auth';

let { accessToken, refreshToken } = store.getState().auth;
let searchCancelToken = CancelToken.source();

export const client = axios.create({
  baseURL: 'https://api.wip.meblex.tk/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'pl-PL',
    Authorization: `Bearer ${accessToken}`,
  },
});

store.subscribe(() => {
  ({ accessToken, refreshToken } = store.getState().auth);
  client.defaults.headers.Authorization = `Bearer ${accessToken}`;
});


const authIntResponse = response => response;
const authIntError = async (error) => {
  const errorResponse = error.response;

  if (errorResponse && errorResponse.status === 401 && !errorResponse.config.url.includes('/login')) {
    client.interceptors.response.eject(authInterceptor);
    try {
      await relogin();
      authInterceptor = client.interceptors.response.use(authIntResponse, authIntError);
      errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;
      return client(errorResponse.config);
    } catch (e) {
      authInterceptor = client.interceptors.response.use(authIntResponse, authIntError);
    }
  } else return Promise.reject(error);

  return Promise.reject(error);
};

let authInterceptor = client.interceptors.response.use(authIntResponse, authIntError);


// If no valid token then remove header
client.interceptors.request.use((config) => {
  if (accessToken === undefined) delete config.headers.Authorization;
  return config;
});

// Check if got new tokens
client.interceptors.response.use((response) => {
  if (response && (response.status === 200 || response.status === 201)) {
    if (response.data.accessToken) store.dispatch(setAccessToken(response.data.accessToken));
    if (response.data.refreshToken) store.dispatch(setRefreshToken(response.data.refreshToken));
  }
  return response;
});


function errorHandler(error, callback) {
  if (error.response) return Promise.reject(callback(error.response.status));
  if (error.request) return Promise.reject(callback('default'));
  return Promise.reject(callback('default'));
}

const defaultErrorCallback = (err, code) => ({
  title: {
    // 500: 'Błąd serwera!',
    404: 'Nieznane zapytanie!',
    default: 'Wystąpił błąd, spróbuj jeszcze raz!',
  }[code] || err.response.data.detail || err.response.data.title,
  errors: (err.response && err.response.data.errors) || [],
});

export function checkStatus() {
  return client.get('Auth/check');
}

export function login(data) {
  return client.post('Auth/login', data).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ));
}

export function relogin() {
  return client.put('Auth/refresh', {
    token: refreshToken,
  });
}

export function register(data) {
  return client.post('Auth/register', data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ));
}

export function ping() {
  return client.get('Test/ping');
}

export function updateUserData(data) {
  return client.put('User/update', data).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ));
}

export const updateUserPassword = data => (
  client.put('User/password', data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const updateUserEmail = data => (
  client.put('User/email', data).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const getUserData = data => (
  client.get('User', data).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);


export const getColors = () => (
  client.get('Furniture/colors').then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const addColor = data => (
  client.post('Furniture/color', data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const getMaterials = () => (
  client.get('Furniture/materials').then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const addMaterial = values => (
  client.post('Furniture/material', values).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const getPatterns = () => (
  client.get('Furniture/patterns').then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const addPattern = values => (
  client.post('Furniture/pattern', values).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const getFurniture = (config) => {
  searchCancelToken.cancel();
  searchCancelToken = CancelToken.source();

  return client.get('Furniture/furniture', {
    params: {
      $orderby: config.sortBy,
      $top: config.limit,
      $filter: config.filter,
    },
    cancelToken: searchCancelToken.token,
  }).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ));
};

export const getPieceOfFurniture = id => (
  client.get(`Furniture/pieceOfFurniture/${id}`).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const getRooms = () => (
  client.get('Furniture/rooms').then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const getCategories = () => (
  client.get('Furniture/categories').then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const addFurniture = values => (
  client.post('Furniture/add', values).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const addParts = data => (
  client.post('Furniture/parts', data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const removeColor = id => (
  client.delete(`Furniture/color/${id}`).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const removePattern = id => (
  client.delete(`Furniture/pattern/${id}`).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const removeMaterial = id => (
  client.delete(`Furniture/material/${id}`).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const addCustomSizeRequest = data => (
  client.post('CustomSize/client/add', data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const getCustomSizeRequests = () => (
  client.get('CustomSize/all').then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const acceptCustomSizeRequest = data => (
  client.post('CustomSize/accept', data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);
