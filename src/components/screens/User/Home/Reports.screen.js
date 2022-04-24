import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ImageBackground,
  ScrollView,
  Animated,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import Share from 'react-native-share';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import base64File from 'helpers/base64File';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import {LIKE_ITEM} from 'app-redux/actions/app/app.actions-types';

const SLIDER_WIDTH = SCREEN_SIZE.WIDTH;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

export default function Reports(props) {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const {
    profile,
    getAllPosts,
    posts,
    format,
    isLoading,
    getProfile,
    navigation,
    setter,
    likeItem,
  } = props;

  React.useEffect(() => {
    getAllPosts();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllPosts();
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = () => {
    getAllPosts();
  };

  const onShareItem = async item => {
    try {
      const image = item.files.find(file => file.mimetype.includes('image'));
      if (image) {
        setter({isLoading: true});
        const base64Image = await base64File(image.fileUrl);

        Share.open({
          title: item.title,
          subject: item.title,
          message: item.description,
          ...(image && {url: base64Image}),
        }).finally(res => {
          setter({isLoading: false});
        });
      }
    } catch (error) {
      setter({
        response: {
          isResponse: true,
          message: 'A aparut o eroare!',
          type: false,
        },
      });
    }
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
    return (
      <View>
        <View style={styles.reportHeaderComponent}>
          <Image
            source={{uri: item.author.profileImage.fileUrl}}
            style={styles.authorAvatar}
          />
          <Text style={styles.authorText}>
            {item.author.name} {item.author.surname}
          </Text>
        </View>
        <Carousel
          data={item.files}
          renderItem={renderFile}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          layout={'stack'}
          layoutCardOffset={`18`}
        />
        <View style={styles.reportFooterComponent}>
          <View style={{flex: 1}}>
            <Text style={styles.authorText}>Titlu: {item.title}</Text>
          </View>
          <View style={styles.reportShareContainer}>
            <TouchableOpacity
              style={{width: 50}}
              onPress={() => {
                likeItem(index);
              }}>
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={30}
                color={COLORS.RED}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: 50}}
              onPress={() => onShareItem(item)}>
              <Ionicons name="share-social" size={30} color={COLORS.DARK} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.locationView}>
        <Ionicons name="location" size={24} />
        <Text
          style={
            styles.locationText
          }>{`${profile?.localitate}, ${profile?.oras}`}</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchView}
          placeholder="Căutare"
          placeholderTextColor={COLORS.DARK}
        />
        <Ionicons
          name="search"
          size={24}
          style={styles.searchIcon}
          color={COLORS.RED}
        />
      </View>

      <View>
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          renderItem={renderPost}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <View>
              <View>
                <ScrollView
                  horizontal={true}
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={Animated.event([
                    {
                      nativeEvent: {
                        contentOffset: {
                          x: scrollX,
                        },
                      },
                    },
                  ])}
                  scrollEventThrottle={1}>
                  {[1, 2, 3, 4].map((image, imageIndex) => {
                    return (
                      <View style={styles.infoView} key={imageIndex}>
                        <ImageBackground
                          source={{
                            uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
                          }}
                          style={styles.headerImageSwiper}>
                          <View style={styles.infoImageView}>
                            <Text style={styles.infoImageText}>dsd</Text>
                          </View>
                        </ImageBackground>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
              <View style={[styles.indicatorContainer]}>
                {[1, 2, 3, 4].map((image, imageIndex) => {
                  const backgroundColor = scrollX.interpolate({
                    inputRange: [
                      SCREEN_SIZE.WIDTH * (imageIndex - 1),
                      SCREEN_SIZE.WIDTH * imageIndex,
                      SCREEN_SIZE.WIDTH * (imageIndex + 1),
                    ],
                    outputRange: [COLORS.GRAY, COLORS.DARK_BLUE, COLORS.GRAY],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={imageIndex}
                      style={[styles.normalDot, {backgroundColor}]}
                    />
                  );
                })}
              </View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginVertical: 20,
                  marginLeft: 20,
                }}>
                Raporturi din {profile?.localitate}
              </Text>
            </View>
          }
          ListFooterComponent={<View style={{height: 250}} />}
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
  searchView: {
    alignSelf: 'center',
    width: SCREEN_SIZE.WIDTH * 0.9,
    height: 40,
    borderRadius: 20,
    borderColor: COLORS.MEDIUM_GRAY,
    backgroundColor: COLORS.MEDIUM_GRAY,
    textAlign: 'center',
    fontWeight: '600',
    paddingHorizontal: 50,
  },
  searchContainer: {
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    marginVertical: 'auto',
  },
  headerImageSwiper: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderRadius: 20,
    // width: SCREEN_SIZE.WIDTH * 0.9,
    // alignSelf: 'center',
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
});
