import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/FontAwesome5';

import Home from './Home';
import Rates from './Rates';
import Shedule from './Shedule';
import Pickup from './Pickup';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Rates') {
            iconName = 'money-bill-alt';
          } else if (route.name === 'Schedule') {
            iconName = 'calendar-alt';
          } else if (route.name === 'Pickup') {
            iconName = 'truck';
          } else if (route.name === 'Profile') {
            iconName = 'user-alt';
          }
          return <Icons name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Rates" component={Rates} />
      <Tab.Screen name="Schedule" component={Shedule} />
      <Tab.Screen name="Pickup" component={Pickup} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>

  );
};

export default MainNavigation;
