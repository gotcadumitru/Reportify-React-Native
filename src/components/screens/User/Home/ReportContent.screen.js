import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Animated,
  Image,
  RefreshControl,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import LocationPicker from 'utils/LocationPicker';
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
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {getDeepNumber} from 'helpers/count';

dayjs.extend(relativeTime);

const SLIDER_WIDTH = SCREEN_SIZE.WIDTH;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

export default function ReportContentScreen(props) {
  const {currentPost, profile, voteItem, posts, favoriteItem, addComment} =
    props;
  const index = posts.findIndex(item => item._id === currentPost._id);
  const isLiked = posts[index]?.likes?.includes(profile?.id);
  const isDisliked = posts[index]?.disLikes?.includes(profile?.id);
  const isFavorite = posts[index]?.favorites?.includes(profile?.id);
  const [isLocationPicker, setIsLocationPicker] = React.useState(false);
  const messageInputRef = React.useRef();
  const keyboardHeight = useKeyboard();

  const {handleSubmit, handleChange, values, handleReset, setFieldValue} =
    useFormik({
      initialValues: {
        message: '',
        postId: currentPost._id,
        commentId: currentPost._id,
        replyName: '',
      },
      onSubmit: onSendMessage,
    });

  function onSendMessage(form) {
    const {postId, commentId, message} = form;

    addComment({
      postId,
      commentId,
      text: message,
    });
    handleReset();
  }

  const onChangeReply = comment => {
    setFieldValue('commentId', comment ? comment._id : currentPost._id);
    setFieldValue(
      'replyName',
      comment ? `${comment.author.name} ${comment.author.surname}` : '',
    );
  };

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

  const renderComments = (comment, left = 0) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: left,
            marginVertical: 10,
          }}>
          <Image
            source={{uri: comment.author.profileImage.fileUrl}}
            style={styles.authorCommentImage}
          />
          <View style={{marginLeft: 10}}>
            <View
              style={[
                styles.commentContainer,
                {maxWidth: SCREEN_SIZE.WIDTH * 0.7 - left},
              ]}>
              <View>
                <Text style={styles.authorNameText}>
                  {comment.author.name} {comment.author.surname}
                </Text>
                <Text>{comment.text}</Text>
              </View>
            </View>
            <View style={styles.replyContainer}>
              <TouchableOpacity
                onPress={() => {
                  onChangeReply(comment);
                }}>
                <Text
                  style={[
                    styles.authorNameText,
                    {color: COLORS.DARK_BLUE, fontWeight: '500'},
                  ]}>
                  Reply
                </Text>
              </TouchableOpacity>
              <Text>{dayjs(comment.createdAt).fromNow()}</Text>
            </View>
          </View>
        </View>
        {comment.comments.map(com => renderComments(com, left + 15))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{marginBottom: keyboardHeight}}>
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
          <View style={{alignSelf: 'center'}}>
            <LocationPicker
              isVisible={isLocationPicker}
              onClosePicker={() => setIsLocationPicker(false)}
              onOpenPicker={() => setIsLocationPicker(true)}
              isChangeable={false}
              miniMapStyle={{
                borderRadius: 0,
                height: 100,
                width: SCREEN_SIZE.WIDTH,
              }}
            />
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
                borderBottomWidth: 0,
                borderWidth: 0,
                marginTop: 0,
                justifyContent: 'space-between',
                paddingHorizontal: 30,
              },
            ]}>
            <Text>{posts[index].likes.length} aprecieri</Text>
            <Text>{getDeepNumber(currentPost.comments)} comentarii</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={{fontWeight: 'bold'}}>Descriere:</Text>
            <Text>{posts[index].description}</Text>
          </View>
          <View style={styles.commContainer}>
            <Text style={{fontWeight: 'bold'}}>Comentarii:</Text>
            {currentPost.comments.map(comment => {
              return renderComments(comment);
            })}
          </View>
          <View style={{marginBottom: 120}} />
        </View>
      </ScrollView>
      <KeyboardAvoidingView>
        <View style={[styles.commentInput, {bottom: keyboardHeight}]}>
          {values?.replyName.length > 0 ? (
            <View
              style={[APP_STYLES.ROW, {marginLeft: 30, marginVertical: 10}]}>
              <Text style={styles.authorNameText}>
                Reply: {values?.replyName}
              </Text>
              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={() => onChangeReply()}>
                <Ionicons name="close-circle-outline" size={24} />
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.commentInputContainer}>
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
                color={
                  values.message.length > 0 ? COLORS.DARK_BLUE : COLORS.GRAY
                }
                size={30}
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>
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

    borderTopWidth: 1,
    borderColor: COLORS.GRAY,
  },
  commentInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  descriptionContainer: {
    // marginHorizontal: 10,
    backgroundColor: COLORS.INPUT,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  commContainer: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  commentContainer: {
    backgroundColor: COLORS.INPUT,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
  },
  authorNameText: {
    fontWeight: 'bold',
  },
  authorCommentImage: {
    height: 40,
    width: 40,
    borderRadius: 1000,
  },
  replyContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
});
