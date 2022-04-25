import Geolocation from '@react-native-community/geolocation';
const getUserLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      location => resolve(location),
      error => reject(error),
    );
  });
export default getUserLocation;
