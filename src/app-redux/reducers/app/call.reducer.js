import {userActions} from 'app-redux/thunk/user.action';

export const FetchStatus = {
  NULL: 'NULL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
};

const initialState = {
  connectedToWsUsersFromMyLocation: [],
  usersWhoCallMe: {},
  usersWhoAnsweredMe: {},
  userWhoICall: null,
  allModeratorChats: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.SET_USERS_CONNECTED_TO_WS_FROM_MY_LOCATION: {
      const connectedToWsUsersFromMyLocation = action.payload;
      return {
        ...state,
        connectedToWsUsersFromMyLocation,
      };
    }

    case userActions.REMOVE_USER_CONNECTED_TO_WS_FROM_MY_LOCATION: {
      const user = action.payload;
      return {
        ...state,
        connectedToWsUsersFromMyLocation:
          state.connectedToWsUsersFromMyLocation.filter(
            localUser => localUser.socketId !== user.socketId,
          ),
      };
    }

    case userActions.SET_USER_WHO_CALL_ME: {
      const {offer, socketId} = action.payload;
      if (!offer) {
        delete state.usersWhoCallMe[state.userWhoICall];
        return {
          ...state,
          usersWhoCallMe: {
            ...state.usersWhoCallMe,
          },
        };
      }
      return {
        ...state,
        usersWhoCallMe: {
          ...state.usersWhoCallMe,
          [socketId]: offer,
        },
      };
    }

    case userActions.SET_USER_WHO_ANSWERED_ME: {
      const {socketId, answer} = action.payload;
      if (!answer) {
        delete state.usersWhoAnsweredMe[state.userWhoICall];
        return {
          ...state,
          usersWhoAnsweredMe: {
            ...state.usersWhoAnsweredMe,
          },
        };
      }
      return {
        ...state,
        usersWhoAnsweredMe: {
          ...state.usersWhoAnsweredMe,
          [socketId]: answer,
        },
      };
    }
    case userActions.SET_USER_WHO_I_CALL: {
      const socketId = action.payload;
      return {
        ...state,
        userWhoICall: socketId,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
