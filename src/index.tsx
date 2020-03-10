import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from '@containers/app/app';
import configureStore from '@stores/configure-store';

const config = configureStore();
const { store, persist } = config;

const init = (): void => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>,
    document.querySelector('#root'),
  );
};

init();
