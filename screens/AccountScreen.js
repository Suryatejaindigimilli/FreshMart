import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AccountScreen({ navigation }) {
  const profile = {
    name: 'Surya Teja',
    email: 'suryateja5483@gmail.com',
    image: require('../assets/profile.jpg'),
  };

  const menuItems = [
    { icon: 'clipboard-list', title: 'Orders', screen: 'OrderDetailsScreen' },
    // { icon: 'account', title: 'My Details', screen: 'MyDetailsScreen' },
    { icon: 'map-marker', title: 'Delivery Address', screen: 'DeliveryAddressScreen' },
    { icon: 'credit-card', title: 'Payment Methods', screen: 'PaymentScreen' },
    { icon: 'bell-outline', title: 'Notifications', screen: 'NotificationsScreen' },
    { icon: 'help-circle-outline', title: 'Help', screen: 'HelpScreen' },
    { icon: 'information-outline', title: 'About', screen: 'AboutScreen' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.replace('LoginScreen'),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image source={profile.image} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.email}>{profile.email}</Text>
          </View>
          <Icon name="pencil" size={18} color="#0aaf7d" />
        </View>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              if (item.screen) {
                navigation.navigate(item.screen);
              }
            }}
          >
            <View style={styles.menuLeft}>
              <Icon name={item.icon} size={20} color="#222" />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#aaa" />
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#0aaf7d" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  email: {
    color: '#666',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 15,
    fontSize: 15,
    color: '#333',
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#f3f3f3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#0aaf7d',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
});
