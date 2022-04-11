import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from './TabBar.component';
import {TabScreens} from 'constants/screens/screens.selector';
import Home from 'components/screens/User/Home.screen';
import Connection from 'components/connections/App.connection';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      {TabScreens.map((screen, index) => {
        return (
          <Tab.Screen
            key={index}
            name={screen.name}
            component={Connection[screen.source]}
            options={{
              tabBarShowLabel: false,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
