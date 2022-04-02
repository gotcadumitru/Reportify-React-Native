// * Redux
import {combineReducers} from 'redux';

// * Reducers
import appReducer from './app/app.reducer';

// * Combine reducers
export default combineReducers({
  appReducer,
});
