// * Actions types
import * as TYPES from 'app-redux/actions/app/app.actions-types';
import dayjs from 'dayjs';

// * Default state
const defaultState = {
  isLoading: false,
  isSignedIn: false,
  response: null,
  profile: null,
  hasResponse: null,
  posts: [],
  filteredPosts: [],
  format: 1,
  isResetPost: false,
  isRefreshing: false,
  categories: [],
  userLocation: null,
  filters: {
    type: 'popular',
    startDate: null,
    isStartDate: false,
    endDate: null,
    isEndDate: false,
    distance: [1, 70],
    isDistance: false,
  },
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
