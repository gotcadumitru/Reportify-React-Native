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
export default function ChatScreen(props) {
  const {navigation, chatMessages, profile} = props;
  const messageInputRef = React.useRef();
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

  return (
    <View style={styles.container}>
      <Text>dada</Text>
      <FlatList
        data={chatMessages}
        keyboardShouldPersistTaps="always"
        renderItem={({item}) => (
          <Text style={{marginVertical: 30}}>{item.text}</Text>
        )}
      />
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
});
