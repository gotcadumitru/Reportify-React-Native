import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SCREENS} from './screen.names';
import {COLORS} from 'theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigationRef} from 'navigation/Root.navigation';
export const TabScreens = [
  {
    name: SCREENS.REPORTS,
    icon: require('assets/lottie/icons/reports.json'),
    height: 30,
    width: 30,
    source: 'Reports',
  },
  {
    name: SCREENS.CHAT,
    icon: require('assets/lottie/icons/chat.json'),
    height: 40,
    width: 40,
    source: 'Chat',
    options: {
      headerShown: true,
      title: 'Support',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigationRef.goBack()}>
          <Ionicons name="chevron-back" size={30} />
        </TouchableOpacity>
      ),
    },
  },
  {
    name: SCREENS.ADD_REPORT,
    icon: require('assets/lottie/icons/add.json'),
    height: 60,
    width: 60,
    source: 'AddReport',
    options: {
      headerShown: true,
      title: 'Raportare problemă',
      headerLeft: () => null,
    },
  },
  {
    name: SCREENS.LOCATIONS,
    icon: require('assets/lottie/icons/maps.json'),
    height: 30,
    width: 30,
    source: 'MapsReports',
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
];

export const UserTypeScreens = [
  {
    name: SCREENS.TYPE_REPORTS,
    icon: 'star',
    label: 'Postările de top',
    color: COLORS.YELLOW,
    type: 'popular',
  },
  {
    name: SCREENS.TYPE_REPORTS,
    icon: 'list-circle',
    label: 'Postările raportate',
    color: COLORS.DARK_BLUE,
    type: 'reported',
  },
  {
    name: SCREENS.TYPE_REPORTS,
    icon: 'bookmark',
    label: 'Postările favorite',
    color: COLORS.PURPLE,
    type: 'favorites',
  },
  {
    name: SCREENS.TYPE_REPORTS,
    icon: 'heart',
    label: 'Postările votate',
    color: COLORS.RED,
    type: 'likes',
  },
];
