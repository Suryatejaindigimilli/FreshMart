import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }) {
  const logoScale = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(30)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Step 1: Pop-in animation for logo
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 4,
      tension: 80,
      useNativeDriver: true,
    }).start(() => {
      // Step 2: Text slides up after logo animation
      Animated.parallel([
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Step 3: Check token and navigate after animation
        setTimeout(async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
              navigation.replace('MainTabs'); // ✅ Go to home if token exists
            } else {
              navigation.replace('WelcomeScreen'); // 👈 Otherwise show Welcome screen
            }
          } catch (e) {
            console.error('Token check failed', e);
            navigation.replace('WelcomeScreen');
          }
        }, 1000); // Add a small delay for smoother transition
      });
    });
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      <Animated.Image
        source={require('../assets/logo.png')}
        style={[
          styles.logo,
          {
            transform: [{ scale: logoScale }],
          },
        ]}
        resizeMode="contain"
      />

      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          opacity: textOpacity,
          transform: [{ translateY: textTranslate }],
          alignItems: 'center',
        }}
      >
        <Text style={styles.title}>
          <Text style={styles.green}>Fresh</Text>
          <Text style={styles.gray}>Cart</Text>
        </Text>
        <Text style={styles.tagline}>Groceries, Delivered Fresh!</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  green: {
    color: '#00B14F',
  },
  gray: {
    color: '#333',
  },
  tagline: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
});
