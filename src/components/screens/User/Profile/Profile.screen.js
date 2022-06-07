import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  ProfileScreens,
  UserTypeScreens,
} from 'constants/screens/screens.selector';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAccountStatus from 'hooks/useAccountStatus';

export default function Profile(props) {
  const {navigation, logout, profile, getProfile, posts} = props;
  const [stats, setStats] = React.useState([]);
  const isAccountNotConfirmed = useAccountStatus();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfile();
    });
    return unsubscribe;
  }, [navigation]);

  const {height, width} = useWindowDimensions();
  const isLandscape = width > height;

  React.useEffect(() => {
    let likes = 0;
    let disLikes = 0;
    let reports = 0;
    let favorites = 0;

    posts.forEach(post => {
      if (post.author._id === profile._id) {
        reports++;
      }
      if (post.likes.includes(profile._id)) {
        likes++;
      }
      if (post.disLikes.includes(profile._id)) {
        disLikes++;
      }
      if (post.favorites.includes(profile._id)) {
        favorites++;
      }
    });
    const statistics = [
      {label: 'Raport.', value: reports},
      {label: 'Likes', value: likes},
      {label: 'Dislikes', value: disLikes},
      {label: 'Favorite', value: favorites},
    ];
    setStats(statistics);
  }, [posts]);

  const renderStats = ({item}) => {
    return (
      <View style={styles.statsItem}>
        <Text style={styles.statsValueText}>{item.value}</Text>
        <Text style={styles.statsLabelText}>{item.label}</Text>
      </View>
    );
  };

  const renderOptions = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.optionItem}
        onPress={() =>
          navigation.navigate(item.name, {
            ...(item?.type && {title: item.label, type: item.type}),
          })
        }>
        <View style={APP_STYLES.ROW}>
          <Ionicons name={item.icon} size={40} color={item.color} />
          <Text style={styles.optionText}>{item.label}</Text>
        </View>
        <View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.GRAY} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="log-out-outline" size={36} color="white" />
          </TouchableOpacity>
          <View style={styles.userInfoContainer}>
            <Animatable.Image
              source={{uri: profile?.profileImage?.fileUrl}}
              style={styles.userImage}
              animation="slideInDown"
            />
            <Animatable.Text
              animation="slideInRight"
              style={styles.userNameText}>
              {profile?.name} {profile?.surname}
            </Animatable.Text>
          </View>
        </View>
        <View style={{marginBottom: 100}}>
          <Animatable.View
            animation="slideInUp"
            style={styles.statisticsContainer({width})}>
            <FlatList
              renderItem={renderStats}
              data={stats}
              scrollEnabled={false}
              horizontal
              contentContainerStyle={styles.statsRenderContainer}
              ItemSeparatorComponent={() => (
                <View style={{...(!isLandscape && styles.statsSeparator)}} />
              )}
            />
          </Animatable.View>
          <Animatable.View
            style={[styles.body, {marginTop: 50}]}
            animation="slideInLeft">
            <FlatList
              nestedScrollEnabled
              renderItem={renderOptions}
              contentContainerStyle={styles.optionsContainer({width})}
              data={ProfileScreens}
              ItemSeparatorComponent={() => (
                <View style={styles.bottomSeparator({width})} />
              )}
            />
          </Animatable.View>
          {!isAccountNotConfirmed && (
            <Animatable.View style={styles.body} animation="slideInLeft">
              <FlatList
                nestedScrollEnabled
                renderItem={renderOptions}
                contentContainerStyle={styles.optionsContainer({width})}
                data={UserTypeScreens}
                ItemSeparatorComponent={() => (
                  <View style={styles.bottomSeparator({width})} />
                )}
              />
            </Animatable.View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: SCREEN_SIZE.HEIGHT * 0.35,
    backgroundColor: COLORS.DARK_BLUE,
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    backgroundColor: 'transparent',
  },
  statisticsContainer: props => ({
    backgroundColor: 'white',
    borderRadius: 30,
    width: props.width * 0.9,
    alignSelf: 'center',
    height: 100,
    flex: 1,
    position: 'absolute',
    top: -50,
    ...APP_STYLES.LIGHT_SHADOW,
  }),
  userInfoContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 300,
    borderWidth: 2,
    borderColor: 'white',
    alignSelf: 'center',
  },
  userNameText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  statsRenderContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  statsLabelText: {
    fontSize: 14,
    color: COLORS.GRAY,
    marginVertical: 5,
    fontWeight: '500',
    textAlign: 'center',
  },
  statsValueText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute',
    right: 30,
    top: 50,
  },
  statsSeparator: {
    borderRightWidth: 1,
    width: SCREEN_SIZE.WIDTH * 0.05,
    marginVertical: 35,
    borderColor: COLORS.GRAY,
  },
  optionsContainer: props => ({
    backgroundColor: 'white',
    borderRadius: 30,
    width: props.width * 0.9,
    alignSelf: 'center',
    marginTop: 30,
    padding: 15,
    ...APP_STYLES.LIGHT_SHADOW,
  }),
  statsItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: SCREEN_SIZE.WIDTH * 0.15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 10,
  },
  bottomSeparator: props => ({
    marginVertical: 10,
    height: 2,
    borderRadius: 10,
    backgroundColor: COLORS.LIGHT_GRAY,
    width: props.width * 0.8,
    alignSelf: 'center',
    borderColor: COLORS.LIGHT_GRAY,
    marginHorizontal: 15,
  }),
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
