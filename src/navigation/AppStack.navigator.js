import React from 'react';
import Connection from 'components/connections/App.connection';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from 'components/screens/Splash/Splash.screen.js';
import {SCREENS} from 'constants/screens/screen.names';
import {COLORS} from 'theme/theme';

const Stack = createStackNavigator();

export default function AppStackNavigator({navigation}) {
  if (false) {
    return <Splash />;
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.SPLASH}
        component={Connection.Splash}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
