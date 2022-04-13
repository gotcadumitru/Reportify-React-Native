import {SCREENS} from './screen.names';
import {COLORS} from 'theme/theme';

export const TabScreens = [
  {
    name: SCREENS.REPORTS,
    icon: require('assets/lottie/icons/reports.json'),
    height: 30,
    width: 30,
    source: 'MyProfile',
  },
  {
    name: SCREENS.FAVORITE,
    icon: require('assets/lottie/icons/favorite.json'),
    height: 40,
    width: 50,
    source: 'MyProfile',
  },
  {
    name: SCREENS.ADD_WHEEL,
    icon: require('assets/lottie/icons/add.json'),
    height: 60,
    width: 60,
    source: 'MyProfile',
  },
  {
    name: SCREENS.LOCATIONS,
    icon: require('assets/lottie/icons/maps.json'),
    height: 30,
    width: 30,
    source: 'MyProfile',
  },
  {
    name: SCREENS.MY_PROFILE,
    icon: require('assets/lottie/icons/profile.json'),
    height: 30,
    width: 30,
    source: 'MyProfile',
  },
];

export const ProfileScreens = [
  {
    name: SCREENS.EDIT_PROFILE,
    icon: 'person-circle',
    label: 'Informația contului',
    color: COLORS.PURPLE,
  },
  {
    name: SCREENS.USER_DOCUMENTS,
    icon: 'ios-information-circle',
    label: 'Documente',
    color: COLORS.ORANGE,
  },
  {
    name: SCREENS.EDIT_PROFILE,
    icon: 'list-circle',
    label: 'Postările raportate',
    color: COLORS.DARK_BLUE,
  },
];
