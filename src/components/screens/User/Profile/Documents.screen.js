import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import {status} from 'constants/data/account.status';
import useAccountStatus from 'hooks/useAccountStatus';
const SLIDER_WIDTH = SCREEN_SIZE.WIDTH;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

export default function Documents(props) {
  const {profile} = props;
  const isAccountNotConfirmed = useAccountStatus();
  const renderFile = ({item, index}) => {
    if (item?.mimetype?.includes('image')) {
      return (
        <View>
          <Image source={{uri: item.fileUrl}} style={styles.imageView} />
          <View style={styles.docInfo}>
            <Text style={styles.fileName}>{item?.name}</Text>
          </View>
        </View>
      );
    } else if (item?.mimetype?.includes('pdf')) {
      return (
        <View>
          <Pdf
            fitPolicy={0}
            source={{uri: item.fileUrl}}
            style={styles.imageView}
          />
        </View>
      );
    } else if (item?.mimetype?.includes('video')) {
      return (
        <View>
          <View style={styles.imageView}>
            <Video
              source={{uri: item.fileUrl}}
              style={{width: '100%', height: '100%', borderRadius: 20}}
              resizeMode={'cover'}
              paused={true}
              controls={true}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <View style={{flex: 1, marginTop: 100}}>
      <View style={{marginVertical: 15}}>
        <Text style={styles.mainText}>Statutul contului dvs:</Text>
        <Text
          style={[
            styles.statusText,
            {color: isAccountNotConfirmed ? COLORS.RED : COLORS.GREEN},
          ]}>
          {status[profile?.accountStatus]}
        </Text>
      </View>
      <Carousel
        data={profile?.domiciliuFiles || []}
        renderItem={renderFile}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        layout={'default'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageView: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
    alignSelf: 'center',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  docInfo: {
    backgroundColor: COLORS.DARK,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingVertical: 15,
  },
  fileName: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  statusText: {
    color: COLORS.GREEN,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  mainText: {
    color: COLORS.DARK,
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
});
