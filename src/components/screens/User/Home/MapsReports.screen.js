import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import MapView from 'react-native-maps';
import Share from 'react-native-share';
import Geolocation from '@react-native-community/geolocation';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import onShareItem from 'helpers/shareItem';

const {width, height} = Dimensions.get('window');

const CARD_HEIGHT = 250;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapsReports = props => {
  const {posts, voteItem, profile, getAllPosts, isLoading, navigation} = props;
  const [search, setSearch] = React.useState('');
  const [localPosts, setLocalPosts] = React.useState(posts);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= localPosts.length) {
        index = localPosts.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {location} = localPosts[index];
          _map.current.animateToRegion(
            {
              ...location,
              latitudeDelta: 0.04,
              longitudeDelta: 0.05,
            },
            350,
          );
        }
      }, 10);
    });
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllPosts();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    let newPosts = posts.filter(
      pos =>
        pos.title.toLowerCase().includes(search.toLowerCase()) ||
        pos.description.toLowerCase().includes(search.toLowerCase()),
    );
    setLocalPosts(newPosts);
  }, [search]);

  const interpolations = localPosts.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      {!isLoading && (
        <MapView
          ref={_map}
          initialRegion={{
            ...localPosts[0]?.location,
            latitudeDelta: 0.06,
            longitudeDelta: 0.05,
          }}
          showsUserLocation
          style={styles.container}>
          {localPosts.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            return (
              <MapView.Marker
                key={index}
                coordinate={marker.location}
                onPress={e => onMarkerPress(e)}>
                <Animated.View style={styles.markerWrap}>
                  <Animated.Image
                    source={require('assets/marker.png')}
                    style={[styles.marker, scaleStyle]}
                    resizeMode="cover"
                  />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
      )}
      <View style={styles.searchBox}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchView}
            placeholder="Căutare"
            placeholderTextColor={COLORS.DARK}
            onChangeText={setSearch}
            value={search}
          />
          <Ionicons
            name="search"
            size={24}
            style={styles.searchIcon}
            color={COLORS.RED}
          />
        </View>
      </View>

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {localPosts.map((post, index) => {
          const image = post.files.find(file =>
            file.mimetype.includes('image'),
          );
          const video = post.files.find(file =>
            file.mimetype.includes('video'),
          );

          const pdf = post.files.find(file => file.mimetype.includes('pdf'));
          const isLiked = post?.likes?.includes(profile?.id);
          const isDisliked = post?.disLikes?.includes(profile?.id);
          const INDEX = posts.findIndex(ps => ps._id === post._id);

          return (
            <View style={styles.card} key={index}>
              <Image
                source={{uri: image.fileUrl}}
                style={styles.cardImage}
                resizeMode="cover"
              />

              <View style={styles.textContent}>
                <View style={{flex: 1}}>
                  <Text numberOfLines={1} style={styles.cardtitle}>
                    {post.title}
                  </Text>
                </View>
                <View style={styles.likeContainer}>
                  <TouchableOpacity
                    onPress={() => voteItem(INDEX, 'likes')}
                    style={{width: 60}}>
                    <AntDesign
                      name={`like${Number(!isLiked) + 1}`}
                      size={26}
                      color={COLORS.DARK}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => voteItem(INDEX, 'disLikes')}
                    style={{width: 60}}>
                    <AntDesign
                      name={`dislike${Number(!isDisliked) + 1}`}
                      size={26}
                      color={COLORS.DARK}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default MapsReports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    alignSelf: 'center',
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    elevation: 2,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 5,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  searchView: {
    alignSelf: 'center',
    width: SCREEN_SIZE.WIDTH * 0.9,
    height: 40,
    borderRadius: 20,
    borderColor: 'white',
    backgroundColor: 'white',
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
});
