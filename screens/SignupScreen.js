import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Heading */}
      <Text style={styles.heading}>Sign Up</Text>
      <Text style={styles.subText}>Enter your credentials to continue</Text>

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        placeholder="Enter your full name"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        {isValidEmail(email) && (
          <Icon name="checkmark-circle" size={20} color="#2e7d32" style={styles.validIcon} />
        )}
      </View>

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
          <Icon name={secureText ? 'eye-off-outline' : 'eye-outline'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Terms */}
      <Text style={styles.terms}>
        By continuing you agree to our{' '}
        <Text style={styles.link}>Terms of Service</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.replace('MainTabs')}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>


      {/* Footer */}
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('LoginScreen')}>
          Log In
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginBottom: 30,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 4,
  },
  subText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#777',
    marginBottom: 25,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 4,
    color: '#444',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    paddingRight: 40,
    fontSize: 14,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  validIcon: {
    position: 'absolute',
    right: 0,
    top: 8,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 8,
  },
  terms: {
    fontSize: 12,
    color: '#777',
    marginVertical: 20,
    textAlign: 'center',
  },
  link: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#555',
  },
  loginLink: {
    color: '#2e7d32',
    fontWeight: '600',
  },
});
