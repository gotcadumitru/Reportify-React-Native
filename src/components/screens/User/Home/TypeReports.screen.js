import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ImageBackground,
  Animated,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import onShareItem from 'helpers/shareItem';
import Carousel from 'react-native-snap-carousel';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import {SCREENS} from 'constants/screens/screen.names';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
const SLIDER_WIDTH = SCREEN_SIZE.WIDTH;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

export default function TypeReportsScreen(props) {
  const {
    profile,
    getAllPosts,
    format,
    isLoading,
    navigation,
    setter,
    voteItem,
    favoriteItem,
    getCategories,
    getSinglePost,
    posts,
    route,
  } = props;

  React.useEffect(() => {
    getAllPosts();
    getCategories();
  }, []);

  const onRefresh = () => {
    getAllPosts();
  };

  const selectPosts = posts => {
    switch (route.params.type) {
      case 'popular': {
        return posts.slice(0, 10);
      }
      case 'reported': {
        return posts.filter(item => item.author._id === profile._id);
      }
      case 'favorites': {
        return posts.filter(item => item.favorites.includes(profile._id));
      }
      case 'likes': {
        return posts.filter(item => item.likes.includes(profile._id));
      }
      default:
        return posts;
    }
  };

  const renderFile = ({item, index}) => {
    if (item?.mimetype?.includes('image')) {
      return (
        <View>
          <Image source={{uri: item.fileUrl}} style={styles.fileView} />
        </View>
      );
    } else if (item?.mimetype?.includes('pdf')) {
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
          <View style={[styles.fileView]}>
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

  const renderPost = ({item, index}) => {
    const isLiked = item?.likes?.includes(profile?.id);
    const isDisliked = item?.disLikes?.includes(profile?.id);
    const isFavorite = item?.favorites?.includes(profile?.id);
    const INDEX = posts.findIndex(ps => ps._id === item._id);

    return (
      <View style={{marginTop: 20}}>
        <View style={styles.likesContainer}>
          <View>
            <Text style={styles.likesCountText}>{item?.likes?.length}</Text>
            <TouchableOpacity onPress={() => voteItem(INDEX, 'likes')}>
              <AntDesign
                name={`like${Number(!isLiked) + 1}`}
                size={34}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => voteItem(INDEX, 'disLikes')}>
            <AntDesign
              name={`dislike${Number(!isDisliked) + 1}`}
              size={34}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.reportHeaderComponent}>
          <Image
            source={{uri: item?.author?.profileImage?.fileUrl}}
            style={styles.authorAvatar}
          />
          <Text style={styles.authorText}>
            {item.author.name} {item.author.surname}
          </Text>
        </View>
        <View style={{height: SCREEN_SIZE.WIDTH * 0.6, width: '100%'}}>
          <Carousel
            data={item.files}
            renderItem={renderFile}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            layout={'stack'}
            layoutCardOffset={`18`}
          />
        </View>
        <Pressable
          style={styles.reportFooterComponent}
          onPress={() => {
            setter({currentPost: item});
            getSinglePost(item._id);
            navigation.navigate(SCREENS.REPORT_CONTENT, {
              title: item.title,
              author: item.author,
            });
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.authorText}>Titlu: {item.title}</Text>
          </View>
          <View style={styles.reportShareContainer}>
            <TouchableOpacity
              style={{width: 50}}
              onPress={() => favoriteItem(INDEX)}>
              <Ionicons
                name={isFavorite ? 'bookmark' : 'bookmark-outline'}
                size={30}
                color={COLORS.DARK}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: 50}}
              onPress={() => onShareItem(item)}>
              <Ionicons name="share-social" size={30} color={COLORS.DARK} />
            </TouchableOpacity>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={selectPosts(posts)}
          showsVerticalScrollIndicator={false}
          renderItem={renderPost}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          ListFooterComponent={<View style={{height: 50}} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fileView: {
    height: 250,
    width: ITEM_WIDTH,
    alignSelf: 'center',
    // borderRadius: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  locationView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 10,
    fontSize: 16,
  },

  headerImageSwiper: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 40,
    width: SCREEN_SIZE.WIDTH,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  infoView: {
    width: SCREEN_SIZE.WIDTH,
    height: 200,
    marginTop: 20,
  },
  infoImageView: {
    backgroundColor: '#151922',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: SCREEN_SIZE.WIDTH * 0.4,
  },
  infoImageText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  reportHeaderComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SCREEN_SIZE.WIDTH * 0.05,
    marginBottom: 15,
  },
  authorAvatar: {
    height: 40,
    width: 40,
    borderRadius: 1000,
  },
  authorText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
  },
  reportFooterComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SCREEN_SIZE.WIDTH * 0.05,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  reportShareContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  likesContainer: {
    position: 'absolute',
    right: SCREEN_SIZE.WIDTH * 0.1,
    top: 80,
    zIndex: 1000,
    height: 130,
    justifyContent: 'space-between',
  },
  likesCountText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    borderColor: 'white',
    marginBottom: 5,
  },
});
