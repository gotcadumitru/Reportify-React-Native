import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from './TabBar.component';
import {TabScreens} from 'constants/screens/tabBar.screens';
import Home from 'components/screens/Home/Home.screen';

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
            component={Home}
            options={{
              tabBarShowLabel: false,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
