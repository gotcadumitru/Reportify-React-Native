import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {SCREENS} from 'constants/screens/screen.names';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import {useKeyboard} from 'hooks/useKeyboard';
import {useFormik} from 'formik';
import Input from 'utils/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useUserNewMessages from 'hooks/useUserNewMessages';
import dayjs from 'dayjs';

export default function ChatScreen(props) {
  const {navigation, chatMessages, profile} = props;
  const messageInputRef = React.useRef();
  const scrollViewRef = React.useRef();

  const keyboardHeight = useKeyboard();
  const sendMessage = useUserNewMessages();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (messageInputRef && messageInputRef.current) {
        messageInputRef.current.focus();
      }
    });
    return unsubscribe;
  }, [navigation]);

  const {handleSubmit, handleChange, values, handleReset} = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: onSendMessage,
  });

  const getUserSocketIdForModerator = authUser => {
    return `${authUser.oras}/${authUser.localitate}`;
  };

  function onSendMessage(form) {
    sendMessage(form.message, getUserSocketIdForModerator(profile));
    handleReset();
  }

  function getDate(candidate, date) {
    try {
      if (candidate && date) {
        let res = dayjs(candidate).diff(dayjs(date), 'days');
        return res > 0 ? dayjs(candidate).format('DD/MM/YYYY') : false;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  const renderChatItem = ({item, index}) => {
    const isUserSender = profile?._id === item?.sender?._id;
    let newMessageDate = false;
    if (index > 0) {
      newMessageDate = getDate(
        item.createdAt,
        chatMessages[index - 1]?.createdAt,
      );
    }
    return (
      <>
        {newMessageDate && (
          <View style={{alignSelf: 'center', marginVertical: 10}}>
            <Text style={{color: COLORS.GRAY}}>{newMessageDate}</Text>
          </View>
        )}
        <View
          style={{
            alignItems: isUserSender ? 'flex-end' : 'flex-start',
            marginVertical: 10,
          }}>
          <View
            style={{
              flexDirection: !isUserSender ? 'row' : 'row-reverse',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item?.sender?.profileImage?.fileUrl}}
              style={styles.senderImage}
            />
            <View>
              <Text
                style={[
                  styles.dateText,
                  {textAlign: 'right', marginBottom: 5},
                ]}>
                {item?.sender?.surname}
              </Text>
              <View style={styles.messageContainer}>
                <Text>{item.text}</Text>
              </View>
            </View>
            <Text style={styles.dateText}>
              {dayjs(item.createAt).format('HH:mm')}
            </Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: SCREEN_SIZE.HEIGHT - keyboardHeight - 100,
        }}>
        <FlatList
          data={chatMessages}
          keyboardShouldPersistTaps="always"
          renderItem={renderChatItem}
          ListFooterComponent={<View style={{marginBottom: 100}} />}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }
        />
      </View>
      <View style={[styles.commentInput, {bottom: keyboardHeight}]}>
        <Input
          vertical={0}
          inputRef={messageInputRef}
          placeholder="Mesaj..."
          editable
          multiline
          noHeightMultiline
          value={values.message}
          onChangeText={handleChange('message')}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Ionicons
            name="send"
            color={values.message.length > 0 ? COLORS.DARK_BLUE : COLORS.GRAY}
            size={30}
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  commentInput: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_SIZE.WIDTH,
    paddingVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.GRAY,
  },
  messageContainer: {
    backgroundColor: COLORS.INPUT,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    maxWidth: SCREEN_SIZE.WIDTH * 0.6,
  },
  senderImage: {
    width: 30,
    height: 30,
    borderRadius: 1000,
    marginHorizontal: 10,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.GRAY,
    marginHorizontal: 10,
  },
});
