import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const SkeletonCard = () => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();
    return () => shimmerAnimation.stop(); 
  }, [shimmerValue]);

  const shimmerOpacity = shimmerValue.interpolate({
    inputRange: [0, .6],
    outputRange: [0.2, .7], 
  });

  return (
      <View style={styles.cardContent}>
        <Animated.View
          style={[
            styles.shimmerBlock,
            { opacity: shimmerOpacity },
          ]}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContent: {
    borderRadius: 10,
    width : 'full',
    height: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    margin : 10,
  },
  shimmerBlock: {
    height: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
});

export default SkeletonCard;
