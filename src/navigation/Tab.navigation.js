import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from './TabBar.component';
import {TabScreens} from 'constants/screens/screens.selector';
import Home from 'components/screens/User/Home/Reports.screen';
import Connection from 'components/connections/App.connection';
import useAccountStatus from 'hooks/useAccountStatus';
import {SCREENS} from 'constants/screens/screen.names';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const isAccountNotConfirmed = useAccountStatus();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        isAccountNotConfirmed ? SCREENS.MY_PROFILE : SCREENS.REPORTS
      }
      tabBar={props => <TabBar {...props} />}>
      {TabScreens.map((screen, index) => {
        return (
          <Tab.Screen
            key={index}
            name={screen.name}
            component={Connection[screen.source]}
            options={{
              tabBarShowLabel: false,
              ...screen?.options,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
