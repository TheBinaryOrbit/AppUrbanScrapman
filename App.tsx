import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/Component/Splash';
import Login from './src/Component/Login';
import Signup from './src/Component/Singup';
import MainNavigation from './src/Component/AppNavigation';
import Forgot from './src/Component/Forgot';

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <SafeAreaView />
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <>
          <Stack.Screen name="GetStarted" component={Splash} options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="Main" component={MainNavigation} />
          <Stack.Screen name='Forgot' component={Forgot} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
