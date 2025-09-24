import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HelpScreen({ navigation }) {
  const supportPhone = '+91 98765 43210';
  const supportEmail = 'admin@pincodeapp.com';

  const handleCall = () => Linking.openURL(`tel:${supportPhone}`);
  const handleEmail = () => Linking.openURL(`mailto:${supportEmail}`);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}>
          <Icon name="home-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* SuperAdmin Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SuperAdmin Contact</Text>
          <Text style={styles.label}>Name: <Text style={styles.value}>Surya Teja</Text></Text>
          {/* <Text style={styles.label}>Phone: <Text style={styles.link} onPress={handleCall}>{supportPhone}</Text></Text> */}
          <Text style={styles.label}>Email: <Text style={styles.link} onPress={handleEmail}>{supportEmail}</Text></Text>
        </View>

        {/* Help Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Help Topics</Text>
          <Text style={styles.helpItem}>• How to track my order</Text>
          <Text style={styles.helpItem}>• Payment not going through</Text>
          <Text style={styles.helpItem}>• Refund and return policy</Text>
          <Text style={styles.helpItem}>• Delivery timings</Text>
          <Text style={styles.helpItem}>• Updating address</Text>
        </View>

        {/* Contact Support */}
        <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
          <Text style={styles.contactText}>Contact Support</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 10, paddingHorizontal: 20 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20,
  },
  headerTitle: { fontSize: 16, fontWeight: 'bold' },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 10, color: '#2e7d32' },
  label: { fontSize: 14, marginBottom: 6 },
  value: { fontWeight: '600', color: '#333' },
  link: { color: '#007BFF' },
  helpItem: { fontSize: 13, color: '#555', marginBottom: 4 },
  contactButton: {
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  contactText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
