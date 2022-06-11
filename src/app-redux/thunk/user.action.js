export const userActions = {
  SET_USERS_CONNECTED_TO_WS_FROM_MY_LOCATION:
    'SET_USERS_CONNECTED_TO_WS_FROM_MY_LOCATION',
  REMOVE_USER_CONNECTED_TO_WS_FROM_MY_LOCATION:
    'REMOVE_USER_CONNECTED_TO_WS_FROM_MY_LOCATION',
  SET_USER_WHO_CALL_ME: 'SET_USER_WHO_CALL_ME',
  RESET_CALL_STATUS: 'RESET_CALL_STATUS',

  SET_USER_WHO_ANSWERED_ME: 'SET_USER_WHO_ANSWERED_ME',
  SET_USER_WHO_I_CALL: 'SET_USER_WHO_I_CALL',
};
export const setUsersConnectedToWsFromMyLocationAC = users => ({
  type: userActions.SET_USERS_CONNECTED_TO_WS_FROM_MY_LOCATION,
  payload: users,
});

export const removeUserConnectedToWsFromMyLocationAC = user => ({
  type: userActions.REMOVE_USER_CONNECTED_TO_WS_FROM_MY_LOCATION,
  payload: user,
});
export const setUsersWhoCallMeAC = (offer, socketId) => ({
  type: userActions.SET_USER_WHO_CALL_ME,
  payload: {offer, socketId},
});

export const resetCallStatus = () => ({
  type: userActions.RESET_CALL_STATUS,
});

export const setUsersWhoAnsweredMeAC = (socketId, answer) => ({
  type: userActions.SET_USER_WHO_ANSWERED_ME,
  payload: {socketId, answer},
});

export const setUserWhoICallAC = socketId => ({
  type: userActions.SET_USER_WHO_I_CALL,
  payload: socketId,
});
