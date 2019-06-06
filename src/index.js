import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import './components/shared/main.scss';
import { Provider } from 'react-redux';
import App from './components/shell/App';
import * as serviceWorker from './serviceWorker';
import { store, persistor } from './store';
import ScrollToTop from 'react-router-scroll-top';


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();
