import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const COLORS = {
  MAIN: '#487c96',
  GREENY: '#C6FFDD',
  YELLY: '#FBD786',
  REDDY: '#f7797d',
  PURPLE: '#555273',
  DANGER: '#df4759',
  GRAY: '#c5c5c5',
  SUCCESS: '#4BB543',
};

const SCREEN_SIZE = {
  HEIGHT: windowHeight,
  WIDTH: windowWidth,
};

const APP_STYLES = {
  ROW: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ROW_SPACE: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SHADOW: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
};

export {COLORS, SCREEN_SIZE, APP_STYLES};
