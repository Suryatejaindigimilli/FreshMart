import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function OrderFailedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      <Image source={require('../assets/failed.png')} style={styles.image} />
      <Text style={styles.title}>Oops! Order Failed</Text>
      <Text style={styles.subtitle}>Something went terribly wrong.</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Please Try Again</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
        <Text style={styles.backLink}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: 'center', alignItems: 'center' },
  closeBtn: {
    position: 'absolute', top: 40, left: 20,
    zIndex: 1,
  },
  closeText: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  image: { width: 130, height: 130, marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 20 },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  backLink: {
    marginTop: 20,
    color: '#555',
  },
});
