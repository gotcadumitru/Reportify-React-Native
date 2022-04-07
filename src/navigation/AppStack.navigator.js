import React from 'react';
import Connection from 'components/connections/App.connection';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from 'components/screens/Splash/Splash.screen.js';
import Home from 'components/screens/Home/Home.screen.js';

import RNBootSplash from 'react-native-bootsplash';
import axios from 'axios';
import {getStorageData} from 'helpers/storage';
import {getProfileRequest} from 'api/index';
import {useDispatch, useSelector} from 'react-redux';
import {setter} from 'app-redux/actions/app/app.actions';
import {SCREENS} from 'constants/screens/screen.names';
import {COLORS} from 'theme/theme';

const Stack = createStackNavigator();

export default function AppStackNavigator({navigation}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const isSignedIn = useSelector(state => state.appReducer.isSignedIn);

  React.useEffect(() => {
    const checkAuth = async () => {
      const token = await getStorageData('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(
          token,
        )}`;
        const profile = await getProfileRequest();
        if (profile?.localitate && profile?.oras) {
          dispatch(setter({profile: profile.user, isSignedIn: true}));
        } else {
          navigation.replace(SCREENS.PROFILE_SETUP);
        }
      }
      await RNBootSplash.hide({fade: true});
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name={'Home'}
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={SCREENS.ONBOARDING}
            component={Connection.Onboarding}
            options={{
              headerShown: false,
              animationTypeForReplace: !isSignedIn ? 'pop' : 'push',
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
          <Stack.Screen
            name={SCREENS.PROFILE_SETUP}
            component={Connection.ProfileSetup}
            options={{
              headerShown: false,
              animationTypeForReplace: !isSignedIn ? 'pop' : 'push',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
