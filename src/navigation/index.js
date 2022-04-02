import React from 'react';
import AppNavigation from './AppStack.navigator';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import RNBootSplash from 'react-native-bootsplash';

export default function Navigation() {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => RNBootSplash.hide()}>
      <AppNavigation />
    </NavigationContainer>
  );
}
