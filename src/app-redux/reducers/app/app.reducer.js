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
    startDate: new Date(dayjs().subtract(1, 'month')),
    isStartDate: false,
    endDate: new Date(),
    isEndDate: false,
    distance: [1, 70],
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
