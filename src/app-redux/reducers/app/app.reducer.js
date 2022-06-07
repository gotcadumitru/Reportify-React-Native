// * Actions types
import * as TYPES from 'app-redux/actions/app/app.actions-types';
import dayjs from 'dayjs';

// * Default state
const defaultState = {
  chatMessages: [],
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
  currentItem: null,
  areFilters: false,
  mapContacts: [],
  allLocationUsers: [],
  location: null,
};

// * Reducer
export default function appReducer(state = {...defaultState}, action = {}) {
  switch (action.type) {
    case TYPES.SETTER: {
      return {...state, ...action.value};
    }
    case TYPES.RESET_FILTERS: {
      return {
        ...state,
        filters: defaultState.filters,
        filteredPosts: state.posts,
        areFilters: false,
      };
    }
    default:
      return state;
  }
}
