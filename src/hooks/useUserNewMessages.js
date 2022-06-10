import {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {io} from 'socket.io-client';
import {getAllUserMessages} from 'app-redux/actions/app/app.actions';
import axios from 'axios';
import socket from 'app-redux/thunk/socket';
import {startListeningToUsersConnectedToFromMyLocationWS} from 'app-redux/thunk/socket.thunk';
const useUserNewMessages = () => {
  const user = useSelector(state => state.appReducer.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserMessages(user._id));
    // socket.current = io('http://192.168.149.22:8080/');
    socket.on('newMessage', () => {
      dispatch(getAllUserMessages(user._id));
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.emit('addUser', {idForUser: user._id, idForModerator: null});
    dispatch(startListeningToUsersConnectedToFromMyLocationWS());
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [user.id]);

  // const sendMessage = useCallback(
  //   (text, receiverId) => {
  //     const message = {
  //       senderId: user._id,
  //       text: text,
  //       receiverId,
  //       moderatorId: null,
  //     };
  //     socket.current.emit('sendMessage', message);
  //   },
  //   // eslint-disable-next-line
  //   [user.id],

  const sendMessage = async (text, receiverId) => {
    const message = {
      senderId: user._id,
      text: text,
      receiverId,
      moderatorId: null,
    };
    try {
      await axios.put(`/api/message/send-message`, message);
    } catch (error) {}
  };

  return sendMessage;
};

export default useUserNewMessages;
