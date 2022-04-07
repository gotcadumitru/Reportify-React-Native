import React from 'react';
import AppNavigation from './AppStack.navigator';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import ErrorModal from 'utils/PopUpModal';
import Loader from 'utils/Loader';

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <ErrorModal />
      <Loader />
      <AppNavigation />
    </NavigationContainer>
  );
}
