import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const handleSignUp = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please fill in all the required fields.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.36:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token); // fallback if no token returned
        Alert.alert('Success', 'Registration successful!');
        navigation.replace('MainTabs'); // Navigate to login or Home/MainTabs if auto login
      } else {
        Alert.alert('Registration Failed', data.message || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Registration Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Enter your credentials to continue</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.input, { flex: 1 }]}
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {email.length > 5 && <Icon name="checkmark" size={20} color="green" />}
      </View>

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.input, { flex: 1 }]}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secure}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Icon name={secure ? 'eye-off' : 'eye'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <Text style={styles.agreeText}>
        By continuing you agree to our{' '}
        <Text style={styles.link}>Terms of Service</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('LoginScreen')}>
          Login
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
    paddingVertical: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  agreeText: {
    fontSize: 12,
    color: '#777',
    marginTop: 16,
    textAlign: 'center',
  },
  link: {
    color: '#3CB371',
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#3CB371',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
  },
  signupText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
  },
});

export default RegistrationScreen;
