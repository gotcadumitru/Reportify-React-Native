// * Redux
import {combineReducers} from 'redux';

// * Reducers
import appReducer from './app/app.reducer';
import userReducer from './app/call.reducer';

// * Combine reducers
export default combineReducers({
  appReducer,
  userReducer,
});
