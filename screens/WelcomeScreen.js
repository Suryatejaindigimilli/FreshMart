import React, { useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen({ navigation }) {

  const handleNavigation = async () => {
    try {
      const isNewUser = await AsyncStorage.getItem('isNewUser');

      if (isNewUser === null) {
        // First time user
        await AsyncStorage.setItem('isNewUser', 'false');
        navigation.navigate('RegistrationScreen');
      } else {
        // Returning user
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.error('Navigation decision error:', error);
      navigation.navigate('LoginScreen'); // fallback
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../assets/welcome-bg.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome{'\n'}to our Cart</Text>
          <Text style={styles.subtitle}>Get your groceries in as fast as 10 mins</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleNavigation}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    padding: 25,
    bottom: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3cb371',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
