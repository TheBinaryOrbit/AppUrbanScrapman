import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/Component/Splash';
import Login from './src/auth/PhoneNumber';
import MainNavigation from './src/Component/AppNavigation';
import Forgot from './src/Component/Forgot';


const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <NavigationContainer>
        <SafeAreaView />
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <>
            <Stack.Screen name="GetStarted" component={Splash} options={{ headerShown: false, animation: 'slide_from_right' }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false, animation: 'slide_from_right' }} />
            <Stack.Screen name="Main" component={MainNavigation} />
            <Stack.Screen name='Forgot' component={Forgot} />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
