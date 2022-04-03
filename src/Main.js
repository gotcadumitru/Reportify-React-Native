import React from 'react';
import {Provider} from 'react-redux';
import {store, sagaMiddleware} from 'app-redux/store/store';
import Navigation from 'navigation/index';
import sagas from 'app-redux/sagas/index';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
sagaMiddleware.run(sagas);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
