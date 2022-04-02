import React from 'react';
import {Provider} from 'react-redux';
import {store, sagaMiddleware} from 'app-redux/store/store';
import Navigation from 'navigation/index';
import sagas from 'app-redux/sagas/index';

export default function App() {
  sagaMiddleware.run(sagas);
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
