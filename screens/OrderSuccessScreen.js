import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native'; // ✅ Lottie import

const OrderSuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* ✅ Lottie Animation */}
      <LottieView
        source={require('../assets/order-success.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
      />

      <Text style={styles.title}>Your Order has been accepted</Text>
      <Text style={styles.subtitle}>
        Your items have been placed and are on their way to being processed
      </Text>

      <TouchableOpacity
        style={styles.trackButton}
        onPress={() => navigation.navigate('TrackOrder')}
      >
        <Text style={styles.trackButtonText}>Track Order</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
        <Text style={styles.homeLink}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20,
  },
  lottie: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 30,
  },
  trackButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 15,
  },
  trackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  homeLink: {
    textDecorationLine: 'underline',
    fontSize: 14,
    color: '#000',
  },
});
