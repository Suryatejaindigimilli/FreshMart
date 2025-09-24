import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeliveryAddressScreen({ navigation }) {
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchAddresses = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://192.168.0.191:3000/delivery-addresses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data || [];
      setAddresses(data);
      const defaultAddr = data.find(addr => addr.default_address === 1);
      if (defaultAddr) setSelected(defaultAddr.id);
    } catch (err) {
      console.error('Error fetching addresses:', err.message);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSelectDefault = async (addr) => {
    setSelected(addr.id);
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.put(`http://192.168.0.191:3000/delivery-addresses/${addr.id}`, {
        ...addr,
        default_address: 1,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAddresses();
    } catch (err) {
      console.error('Failed to update default address:', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Choose Delivery Address</Text>
        <View style={{ width: 22 }} />
      </View>

      <TouchableOpacity style={styles.locationButton}>
        <Icon name="location-outline" size={18} color="#000" />
        <Text style={styles.locationText}>Use current location</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>SAVED ADDRESSES</Text>

      <ScrollView style={{ flex: 1 }}>
        {addresses.map(addr => (
          <View key={addr.id} style={styles.addressCard}>
            <TouchableOpacity
              style={styles.radioRow}
              onPress={() => handleSelectDefault(addr)}
            >
              <MaterialIcon
                name={selected === addr.id ? 'radiobox-marked' : 'radiobox-blank'}
                size={22}
                color="#00B14F"
              />
              <Text style={styles.addressLabel}>
                {addr.address_type} {addr.default_address ? '(Default)' : ''}
              </Text>
            </TouchableOpacity>

            <Text style={styles.name}>{addr.full_name}</Text>
            <Text style={styles.address}>
              {addr.house_number}, {addr.street_address}, {addr.city}, {addr.state}
            </Text>

            <View style={styles.iconRow}>
              <TouchableOpacity>
                <Icon name="pencil" size={18} color="#555" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="trash-outline" size={18} color="#555" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NewAddressScreen')}
      >
        <Text style={styles.addButtonText}>+ Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  locationText: {
    marginLeft: 10,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  addressCard: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  addressLabel: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  address: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 20,
  },
  addButton: {
    backgroundColor: '#FF5A5F',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
