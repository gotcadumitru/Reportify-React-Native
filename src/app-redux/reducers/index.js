// * Redux
import {combineReducers} from 'redux';

// * Reducers
import appReducer from './app/app.reducer';
import callReducer from './app/call.reducer';

// * Combine reducers
export default combineReducers({
  appReducer,
  callReducer,
});
