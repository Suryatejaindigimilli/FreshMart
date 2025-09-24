import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ABOUT</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}>
          <Icon name="home-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content Card */}
      <View style={styles.card}>
        <Text style={styles.title}>FreshCart</Text>
        <Text style={styles.description}>
          Welcome to FreshCart – your smart grocery partner! 🛒✨{"\n\n"}
          We deliver fresh groceries to your doorstep in just 10 minutes. With real-time location tracking, Pincode instantly shows you all the nearby grocery stores around your area, so you can shop from the closest and fastest options available.{"\n\n"}
          Whether it's your daily essentials or a last-minute item, we’ve got you covered — quick, reliable, and right on time.{"\n"}
          Your location. Your stores. Your FreshCart.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
