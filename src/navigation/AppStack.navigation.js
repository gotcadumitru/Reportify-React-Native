import React from 'react';
import {TouchableOpacity} from 'react-native';
import Connection from 'components/connections/App.connection';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from 'components/screens/Splash/Splash.screen.js';
import TatNavigation from './Tab.navigation';

import RNBootSplash from 'react-native-bootsplash';
import axios from 'axios';
import {getStorageData} from 'helpers/storage';
import {getProfileRequest} from 'api/index';
import {useDispatch, useSelector} from 'react-redux';
import {setter} from 'app-redux/actions/app/app.actions';
import {SCREENS} from 'constants/screens/screen.names';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

export default function AppStackNavigator({navigation}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const isSignedIn = useSelector(state => state.appReducer.isSignedIn);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getStorageData('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(
            token,
          )}`;
          const profile = await getProfileRequest();
          const {user} = profile;
          if (user?.localitate && user?.oras) {
            dispatch(setter({profile: user, isSignedIn: true}));
          } else {
            navigation.replace(SCREENS.PROFILE_SETUP);
          }
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
        await RNBootSplash.hide({fade: true});
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name={SCREENS.TAB_NAVIGATION}
            component={TatNavigation}
          />
          <Stack.Screen
            name={SCREENS.EDIT_PROFILE}
            component={Connection.EditProfile}
          />
          <Stack.Screen
            name={SCREENS.FILTER}
            component={Connection.Filter}
            options={({navigation, route}) => ({
              gestureEnabled: false,
              headerShown: true,
              title: 'Filtre',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back" size={30} />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen
            name={SCREENS.USER_DOCUMENTS}
            component={Connection.Documents}
            options={({navigation, route}) => ({
              headerShown: true,
              title: 'Documente',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back" size={30} />
                </TouchableOpacity>
              ),
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={SCREENS.ONBOARDING}
            component={Connection.Onboarding}
          />
          <Stack.Screen name={SCREENS.SIGN_IN} component={Connection.SignIn} />
          <Stack.Screen name={SCREENS.SIGN_UP} component={Connection.SignUp} />
          <Stack.Screen
            name={SCREENS.RESET_PASSWORD}
            component={Connection.ResetPassword}
          />
          <Stack.Screen
            name={SCREENS.PROFILE_SETUP}
            component={Connection.ProfileSetup}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
