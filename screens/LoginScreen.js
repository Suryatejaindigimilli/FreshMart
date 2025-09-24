// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [secureText, setSecureText] = useState(true);

//   const handleLogin = async () => {
//     if (!email.trim() || !password.trim()) {
//       Alert.alert('Missing Fields', 'Please enter both email and password.');
//       return;
//     }

//     try {
//       const response = await fetch('http://192.168.1.44:5000/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),  // ✅ sends body
//       });


//       const data = await response.json();

//       if (response.ok && data.token) {
//         await AsyncStorage.setItem('userToken', data.token);
//         navigation.replace('MainTabs');
//       } else {
//         Alert.alert('Login Failed', data.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       Alert.alert('Error', 'Something went wrong. Try again later.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
//       <Text style={styles.heading}>Log In</Text>
//       <Text style={styles.subText}>Enter your email and password</Text>

//       <Text style={styles.label}>Email</Text>
//       <TextInput
//         placeholder="Enter your email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <Text style={styles.label}>Password</Text>
//       <View style={styles.passwordWrapper}>
//         <TextInput
//           placeholder="Enter your password"
//           value={password}
//           onChangeText={setPassword}
//           style={[styles.input, { color: '#000' }]}   // ✅ ensure text is visible
//           secureTextEntry={secureText}
//           placeholderTextColor="#888"   // ✅ makes placeholder grey
//         />
//         <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
//           <Icon name={secureText ? 'eye-off-outline' : 'eye-outline'} size={20} color="#888" />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.forgotBtn}>
//         <Text style={styles.forgotText}>Forgot Password?</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={styles.loginText}>Log In</Text>
//       </TouchableOpacity>

//       <Text style={styles.footerText}>
//         Don’t have an account?{' '}
//         <Text style={styles.signupLink} onPress={() => navigation.navigate('RegistrationScreen')}>
//           Signup
//         </Text>
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 25,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     alignSelf: 'center',
//     marginBottom: 30,
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#111',
//     textAlign: 'center',
//     marginBottom: 4,
//   },
//   subText: {
//     textAlign: 'center',
//     fontSize: 13,
//     color: '#777',
//     marginBottom: 25,
//   },
//   label: {
//     fontSize: 13,
//     fontWeight: '500',
//     marginTop: 10,
//     marginBottom: 4,
//     color: '#444',
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     paddingVertical: 8,
//     paddingRight: 40,
//     fontSize: 14,
//     color: '#000',
//   },
//   passwordWrapper: {
//     position: 'relative',
//     marginBottom: 10,
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 0,
//     top: 8,
//   },
//   forgotBtn: {
//     alignSelf: 'flex-end',
//     marginTop: 6,
//     marginBottom: 30,
//   },
//   forgotText: {
//     fontSize: 13,
//     color: '#888',
//   },
//   loginButton: {
//     backgroundColor: '#2e7d32',
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   loginText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
//   footerText: {
//     textAlign: 'center',
//     fontSize: 13,
//     color: '#555',
//   },
//   signupLink: {
//     color: '#2e7d32',
//     fontWeight: '600',
//   },
// });


import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as base64Decode } from 'react-native-base64';

const API_BASE = 'http://192.168.1.36:5000';

function decodeJwt(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(base64Decode(payload));
  } catch {
    return null;
  }
}

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok || !data?.token) {
        Alert.alert('Login Failed', data?.message || 'Invalid credentials');
        return;
      }

      const token = data.token;
      const claims = decodeJwt(token);

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userToken', token); // backward compat

      const role = claims?.role;
      if (role === 'admin') {
        navigation.reset({ index: 0, routes: [{ name: 'AdminScreen' }] });
      } else if (role === 'shopkeeper') {
        navigation.reset({ index: 0, routes: [{ name: 'ShopProfileScreen' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
      }
    } catch (e) {
      console.error('Login Error:', e);
      Alert.alert('Error', 'Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.heading}>Log In</Text>
      <Text style={styles.subText}>Enter your email and password</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.input, { color: '#000' }]}   // ✅ ensure text is visible
          secureTextEntry={secureText}
          placeholderTextColor="#888"   // ✅ makes placeholder grey
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
          <Icon name={secureText ? 'eye-off-outline' : 'eye-outline'} size={20} color="#888" />
        </TouchableOpacity>
      </View>


      <TouchableOpacity style={styles.forgotBtn}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        <Text style={styles.loginText}>{loading ? 'Logging in...' : 'Log In'}</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don’t have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('RegistrationScreen')}>
          Signup
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff', justifyContent: 'center' },
  logo: { width: 60, height: 60, alignSelf: 'center', marginBottom: 30 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#111', textAlign: 'center', marginBottom: 4 },
  subText: { textAlign: 'center', fontSize: 13, color: '#777', marginBottom: 25 },
  label: { fontSize: 13, fontWeight: '500', marginTop: 10, marginBottom: 4, color: '#444' },
  input: { color: '#000',borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 8, paddingRight: 40, fontSize: 14 },
  passwordWrapper: { position: 'relative', marginBottom: 10 },
  eyeIcon: { position: 'absolute', right: 0, top: 8 },
  forgotBtn: { alignSelf: 'flex-end', marginTop: 6, marginBottom: 30 },
  forgotText: { fontSize: 13, color: '#888' },
  loginButton: { backgroundColor: '#2e7d32', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  loginText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  footerText: { textAlign: 'center', fontSize: 13, color: '#555' },
  signupLink: { color: '#2e7d32', fontWeight: '600' },
});
