import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import {composeWithDevTools} from '@redux-devtools/extension';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunk)),
);

export {store, sagaMiddleware};
