import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Animated,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import {useKeyboard} from 'hooks/useKeyboard';
import Carousel from 'react-native-snap-carousel';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import onShareItem from 'helpers/shareItem';
import Input from 'utils/Input';
import {useFormik} from 'formik';
import {SCREENS} from 'constants/screens/screen.names';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Mui from 'react-native-vector-icons/MaterialCommunityIcons';
const SLIDER_WIDTH = SCREEN_SIZE.WIDTH;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

export default function ReportContentScreen(props) {
  const {currentPost, profile, voteItem, posts, favoriteItem} = props;
  const index = posts.findIndex(item => item._id === currentPost._id);
  const isLiked = posts[index]?.likes?.includes(profile?.id);
  const isDisliked = posts[index]?.disLikes?.includes(profile?.id);
  const isFavorite = posts[index]?.favorites?.includes(profile?.id);
  const messageInputRef = React.useRef();
  const keyboardHeight = useKeyboard();

  const {handleSubmit, handleChange, values, handleReset} = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: onSendMessage,
  });

  function onSendMessage(form) {
    handleReset();
  }

  const renderFile = ({item, index}) => {
    if (item?.mimetype?.includes('image')) {
      return (
        <View>
          <Image source={{uri: item.fileUrl}} style={styles.fileView} />
        </View>
      );
    } else if (item?.type?.includes('pdf')) {
      return (
        <View>
          <Pdf
            fitPolicy={0}
            source={{uri: item.fileUrl}}
            style={styles.fileView}
          />
        </View>
      );
    } else if (item?.mimetype?.includes('video')) {
      return (
        <View>
          <View style={styles.fileView}>
            <Video
              source={{uri: item.fileUrl}}
              style={{width: '100%', height: '100%', borderRadius: 20}}
              resizeMode={'cover'}
              paused={true}
              controls={false}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Carousel
            data={currentPost.files}
            renderItem={renderFile}
            sliderWidth={SCREEN_SIZE.WIDTH}
            itemWidth={ITEM_WIDTH}
            layoutCardOffset={`6`}
          />
          <TouchableOpacity
            onPress={() => favoriteItem(index)}
            style={{position: 'absolute', right: 20, bottom: 20}}>
            <Ionicons
              name={isFavorite ? 'bookmark' : 'bookmark-outline'}
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() => voteItem(index, 'likes')}
            style={styles.actionItem}>
            <AntDesign
              name={`like${Number(!isLiked) + 1}`}
              size={20}
              color={COLORS.DARK}
            />
            <Text style={styles.actionItemText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              messageInputRef.current.focus();
            }}
            style={styles.actionItem}>
            <EvilIcons name={'comment'} size={24} color={COLORS.DARK} />
            <Text style={styles.actionItemText}>Comentează</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onShareItem(currentPost)}
            style={styles.actionItem}>
            <Mui name={'share'} size={24} color={COLORS.DARK} />
            <Text style={styles.actionItemText}>Trimite</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.actionContainer,
            {
              borderTopWidth: 0,
              marginTop: 0,
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            },
          ]}>
          <Text>{posts[index].likes.length} aprecieri</Text>
          <Text>{posts[index].comments.length} comentarii</Text>
        </View>
      </ScrollView>
      <KeyboardAvoidingView>
        <View style={[styles.commentInput, {bottom: keyboardHeight}]}>
          <Input
            inputRef={messageInputRef}
            placeholder="Comentează..."
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
              style={{marginLeft: 10, marginTop: 15}}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fileView: {
    height: 200,
    width: ITEM_WIDTH,
    alignSelf: 'center',
  },
  actionContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    marginTop: 10,
    borderColor: COLORS.MEDIUM_GRAY,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  actionItemText: {
    fontSize: 14,
    color: COLORS.DARK,
    marginLeft: 5,
  },
  commentInput: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_SIZE.WIDTH,
    paddingBottom: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.GRAY,
  },
});
