import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import useIsloggedIn from '../Hooks/IsloggedIn';

const Splash = ({ navigation }) => {
  const isloggedin = useIsloggedIn();
  console.log(isloggedin) // Hook to check login status
  const slideAnim = useRef(new Animated.Value(200)).current; // Animation starting position

  useEffect(() => {
    // Slide animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Navigation logic after splash timeout
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: isloggedin ? 'Main' : 'Login' }], // Conditional navigation
      });
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigation, slideAnim, isloggedin]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logo.png')}
        style={[styles.logo, { transform: [{ translateY: slideAnim }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 300,
    height: 300,
  },
});

export default Splash;
