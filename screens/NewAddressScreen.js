import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function NewAddressScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [isDefault, setIsDefault] = useState(false);

  const handleSave = async () => {
    if (!fullName || !phoneNumber || !houseNumber || !streetAddress || !city || !state) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    const address = {
      full_name: fullName,
      phone_number: phoneNumber,
      house_number: houseNumber,
      street_address: streetAddress,
      city,
      state,
      address_type: addressType,
      default_address: isDefault,
    };

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Unauthorized', 'Please login again.');
        return;
      }

      const response = await axios.post(
        'http://192.168.0.191:3000/delivery-addresses',
        address,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert('Success', 'Address saved successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Save Address Error:', error.message);
      Alert.alert('Error', 'Failed to save address.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Delivery Address</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} placeholder="Enter full name" value={fullName} onChangeText={setFullName} />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.input} placeholder="Enter phone number" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />

      <Text style={styles.label}>House Number</Text>
      <TextInput style={styles.input} placeholder="Enter house number" value={houseNumber} onChangeText={setHouseNumber} />

      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>Street Address</Text>
          <TextInput style={styles.input} placeholder="Street Address" value={streetAddress} onChangeText={setStreetAddress} />
        </View>
        <View style={styles.half}>
          <Text style={styles.label}>City</Text>
          <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
        </View>
      </View>

      <Text style={styles.label}>State</Text>
      <View style={styles.picker}>
        <Picker selectedValue={state} onValueChange={setState}>
          <Picker.Item label="Select state" value="" />
          <Picker.Item label="Andhra Pradesh" value="AP" />
          <Picker.Item label="Telangana" value="TG" />
          <Picker.Item label="Tamil Nadu" value="TN" />
          <Picker.Item label="Karnataka" value="KA" />
        </Picker>
      </View>

      <Text style={styles.label}>Address Type</Text>
      <View style={styles.radioGroup}>
        {['Home', 'Work', 'Other'].map(type => (
          <TouchableOpacity
            key={type}
            style={styles.radioItem}
            onPress={() => setAddressType(type)}>
            <Text>{addressType === type ? '🔘' : '⚪'} {type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setIsDefault(!isDefault)}
      >
        <Text style={styles.checkboxLabel}>
          {isDefault ? '☑' : '☐'} Set as default address
        </Text>
      </TouchableOpacity>

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.btnText}>Save Address</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.btnText, { color: '#333' }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', color: '#2e7d32', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 15,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  half: { width: '48%' },
  picker: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    marginBottom: 15, overflow: 'hidden',
  },
  radioGroup: { flexDirection: 'row', gap: 20, marginBottom: 10 },
  radioItem: { flexDirection: 'row', alignItems: 'center' },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between' },
  saveBtn: {
    backgroundColor: '#2e7d32', padding: 12,
    flex: 1, alignItems: 'center', borderRadius: 8, marginRight: 10,
  },
  cancelBtn: {
    backgroundColor: '#f1f1f1', padding: 12,
    flex: 1, alignItems: 'center', borderRadius: 8,
  },
  btnText: { fontWeight: 'bold', color: '#fff' },
});
