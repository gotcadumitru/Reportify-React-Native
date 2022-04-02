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
        name={SCREENS.ONBOARDING}
        component={Connection.Onboarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREENS.SIGN_IN}
        component={Connection.SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREENS.SIGN_UP}
        component={Connection.SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREENS.RESET_PASSWORD}
        component={Connection.ResetPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
