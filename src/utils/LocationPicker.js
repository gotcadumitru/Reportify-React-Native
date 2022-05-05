import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LottieView from 'lottie-react-native';

const ASPECT_RATIO = SCREEN_SIZE.WIDTH / SCREEN_SIZE.HEIGHT;
const LATITUDE_DELTA = 2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function LocationPicker(props) {
  const {
    onClosePicker,
    isVisible,
    location,
    getLocation,
    onOpenPicker,
    isChangeable = true,
    miniMapStyle = {},
  } = props;
  const [loc, setLoc] = React.useState(location);
  const [userLocation, setUserLocation] = React.useState(null);

  const {width, height} = useWindowDimensions();

  React.useEffect(() => {
    Geolocation.getCurrentPosition(({coords}) => {
      setUserLocation(coords);
      if (!location) {
        setLoc(coords);
      }
    });
  }, []);
  if (!userLocation)
    return (
      <LottieView
        style={{height: 250}}
        autoPlay
        loop
        source={require('assets/lottie/loading.json')}
      />
    );

  return (
    <>
      <MapView
        style={[styles.miniMap, miniMapStyle]}
        initialRegion={{
          ...userLocation,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
        showsUserLocation
        onPress={onOpenPicker}>
        <Marker coordinate={loc} />
      </MapView>

      <Modal hasBackdrop isVisible={isVisible} style={styles.modal}>
        <View style={styles.modalView}>
          <MapView
            style={styles.map}
            initialRegion={{
              ...userLocation,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            onPress={e => {
              if (isChangeable) setLoc(e.nativeEvent.coordinate);
            }}
            showsUserLocation>
            <Marker
              coordinate={loc}
              onDragEnd={e => setLoc(e.nativeEvent.coordinate)}
              draggable={isChangeable}
            />
          </MapView>
          {isChangeable && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                getLocation(loc);
                onClosePicker();
              }}>
              <Text style={styles.buttonText}>Confirmă</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: COLORS.RED, marginBottom: 20},
            ]}
            onPress={() => {
              onClosePicker();
            }}>
            <Text style={styles.buttonText}>Închide</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
  },
  miniMap: {
    height: 200,
    width: SCREEN_SIZE.WIDTH * 0.8,
    borderRadius: 20,
  },
  map: {
    height: SCREEN_SIZE.HEIGHT * 0.7,
    width: SCREEN_SIZE.WIDTH * 0.9,
    borderRadius: 20,
  },
  modalView: {
    width: SCREEN_SIZE.WIDTH * 0.9,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 20,
    backgroundColor: COLORS.LIGHT_BLUE,
    width: SCREEN_SIZE.WIDTH * 0.7,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
