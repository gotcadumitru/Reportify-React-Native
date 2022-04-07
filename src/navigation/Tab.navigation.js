import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from './TabBar.component';
import Home from 'components/screens/Home/Home.screen';
const TabArr = [1, 2, 3, 4];

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={'HomeScreenasdsad' + index}
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
