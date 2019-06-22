import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import loginReducer from './redux/auth';
import cartReducer from './redux/cart';
import dataReducer from './redux/data';
import filtersReducer from './redux/filters';
import fitterReducer from './redux/fitter';

const rootReducer = combineReducers({
  form: formReducer,
  auth: loginReducer,
  data: dataReducer,
  cart: cartReducer,
  filters: filtersReducer,
  fitter: fitterReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));
export const persistor = persistStore(store);
