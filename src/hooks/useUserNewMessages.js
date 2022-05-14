import {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {io} from 'socket.io-client';
import {getAllUserMessages} from 'app-redux/actions/app/app.actions';
const useUserNewMessages = () => {
  const user = useSelector(state => state.appReducer.profile);
  const socket = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserMessages(user._id));
    socket.current = io('http://192.168.43.252:8080/');

    socket.current.on('getMessage', () => {
      dispatch(getAllUserMessages(user._id));
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.current.emit('addUser', user._id);
    return () => {
      socket.current.disconnect();
    };
    // eslint-disable-next-line
  }, [user.id]);

  const sendMessage = useCallback(
    (text, receiverId) => {
      const message = {
        senderId: user._id,
        text: text,
        receiverId,
        moderatorId: null,
      };
      socket.current.emit('sendMessage', message);
    },
    // eslint-disable-next-line
    [user.id],
  );

  return sendMessage;
};

export default useUserNewMessages;
