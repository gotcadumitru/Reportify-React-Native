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
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';

const SLIDER_WIDTH = SCREEN_SIZE.WIDTH;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

export default function Reports(props) {
  const {profile, getAllPosts, posts, format} = props;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    getAllPosts();
  }, []);

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

  const renderPost = ({item}) => {
    return (
      <View>
        <Carousel
          data={profile?.domiciliuFiles}
          renderItem={renderFile}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          layout={'stack'}
          layoutCardOffset={`18`}
        />

        <Text>{item?.title}</Text>
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
});
