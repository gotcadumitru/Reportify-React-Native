// * Actions types
import * as TYPES from 'app-redux/actions/app/app.actions-types';
// * Default state
const defaultState = {
  default: 0,
};

// * Reducer
export default function appReducer(state = {...defaultState}, action = {}) {
  switch (action.type) {
    case TYPES.SETTER: {
      return {...state, ...action.value};
    }

    default:
      return state;
  }
}
