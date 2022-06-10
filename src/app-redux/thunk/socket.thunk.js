import socket from './socket';
import {
  addNewMessageToModeratorAC,
  addNewMessageToSuportAC,
  setUsersWhoCallMeAC,
  removeUserConnectedToWsFromMyLocationAC,
  setUsersConnectedToWsFromMyLocationAC,
  setUsersWhoAnsweredMeAC,
  setUserWhoICallAC,
} from './user.action';

export const connectNewUserToWS =
  (idForUser, idForModerator) => async dispatch => {
    try {
      socket.emit('addUser', {
        idForUser,
        idForModerator,
      });
      console.log(socket.id);
    } catch (err) {
      console.log(err);
    }
  };

export const startListeningToNewMessagesWS = authUserId => async dispatch => {
  try {
    socket.on('newMessage', message => {
      if (
        message.sender?._id === authUserId ||
        message.receiver?._id === authUserId
      ) {
        dispatch(addNewMessageToSuportAC(message));
      }
      dispatch(addNewMessageToModeratorAC(message));
    });
  } catch (err) {
    console.log(err);
  }
};

export const startListeningToKanbanboardWS = () => async dispatch => {
  try {
    socket.on('getBoard', board => {
      dispatch(fetchKanbanboardSuccessAC(board));
    });
  } catch (err) {
    console.log(err);
  }
};

export const stopListeningToNewMessagesWS = () => async dispatch => {
  try {
    socket.off('newMessage');
  } catch (err) {
    console.log(err);
  }
};

export const startListeningToUsersConnectedToFromMyLocationWS =
  () => async dispatch => {
    try {
      socket.on('update-user-list', users => {
        dispatch(
          setUsersConnectedToWsFromMyLocationAC(
            users.filter(user => user.socketId !== socket.id),
          ),
        );
      });

      socket.on('remove-user', user => {
        dispatch(removeUserConnectedToWsFromMyLocationAC(user));
      });

      socket.on('call-made', async ({offer, socketId}) => {
        console.log('call-made', offer, socketId);
        dispatch(setUsersWhoCallMeAC(offer, socketId));
      });

      socket.on('answer-made', async ({answer, socketId}) => {
        console.log('answer-made', answer, socketId);
        dispatch(setUsersWhoAnsweredMeAC(socketId, answer));
      });
    } catch (err) {
      console.log(err);
    }
  };

export const callUserBySocketIdThunk = (socketId, offer) => async dispatch => {
  console.log('call-user', offer, socketId);
  socket.emit('call-user', {
    offer,
    to: socketId,
  });
  dispatch(setUserWhoICallAC(socketId));
};

export const answerToUserCallThunk = (socketId, answer) => async dispatch => {
  console.log('make-answer', answer, socketId);
  socket.emit('make-answer', {
    answer,
    to: socketId,
  });
  dispatch(setUserWhoICallAC(socketId));
};
