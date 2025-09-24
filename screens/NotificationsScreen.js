import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([
    { id: 1, image: require('../assets/fresh-stock.png'), title: 'Fresh stock available', subtitle: 'Get 40% off', read: false },
    { id: 2, image: require('../assets/fresh-stock.png'), title: 'Limited offer!', subtitle: 'Buy 1 Get 1 Free', read: false },
    { id: 3, image: require('../assets/fresh-stock.png'), title: 'Weekly deals', subtitle: 'Up to 70% off', read: true },
    { id: 4, image: require('../assets/fresh-stock.png'), title: 'New arrivals', subtitle: 'Fresh produce stocked', read: true },
  ]);

  const fadeAnim = useRef(notifications.map(() => new Animated.Value(0))).current;

  // Animate on mount
  useEffect(() => {
    fadeAnim.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    });
  }, [fadeAnim]);

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {notifications.map((item, index) => (
          <Animated.View
            key={item.id}
            style={[styles.notificationCard, { opacity: fadeAnim[index] }]}
          >
            <Image source={item.image} style={styles.notificationImage} />
            <View style={styles.notificationTextContainer}>
              <Text
                style={[
                  styles.notificationTitle,
                  !item.read && styles.unreadText,
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.notificationSubtitle,
                  !item.read && styles.unreadText,
                ]}
              >
                {item.subtitle}
              </Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
          </Animated.View>
        ))}
      </ScrollView>
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
  markReadText: {
    fontSize: 12,
    color: '#1b5e20',
    fontWeight: 'bold',
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: 'relative',
  },
  notificationImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    color: '#2e7d32',
  },
  notificationSubtitle: {
    fontSize: 13,
    color: '#444',
  },
  unreadText: {
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  unreadDot: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginLeft: 8,
  },
});
