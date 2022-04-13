import React from 'react';
import AppNavigation from './AppStack.navigation';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './Root.navigation';
import PopModal from 'utils/PopUpModal';
import Loader from 'utils/Loader';

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <PopModal />
      <Loader />
      <AppNavigation />
    </NavigationContainer>
  );
}
