import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AddPaymentMethodScreen({ navigation }) {
  const [type, setType] = useState('UPI'); // 'UPI' or 'Card'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSave = () => {
    if (type === 'UPI' && upiId.trim() === '') {
      Alert.alert('Error', 'Please enter your UPI ID');
      return;
    }

    if (
      type === 'Card' &&
      (cardNumber.length < 12 || expiry === '' || cvv.length < 3)
    ) {
      Alert.alert('Error', 'Please enter valid card details');
      return;
    }

    Alert.alert('Success', `${type} method added successfully`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Payment Method</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}>
          <Icon name="home-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Payment Type Selector */}
      <View style={styles.typeSwitch}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'UPI' && styles.activeType]}
          onPress={() => setType('UPI')}
        >
          <Text style={type === 'UPI' ? styles.activeText : styles.inactiveText}>UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === 'Card' && styles.activeType]}
          onPress={() => setType('Card')}
        >
          <Text style={type === 'Card' ? styles.activeText : styles.inactiveText}>Card</Text>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      {type === 'UPI' ? (
        <>
          <Text style={styles.label}>UPI ID</Text>
          <TextInput
            style={styles.input}
            placeholder="example@upi"
            value={upiId}
            onChangeText={setUpiId}
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="**** **** **** ****"
            keyboardType="number-pad"
            value={cardNumber}
            onChangeText={setCardNumber}
          />

          <Text style={styles.label}>Expiry (MM/YY)</Text>
          <TextInput
            style={styles.input}
            placeholder="08/28"
            value={expiry}
            onChangeText={setExpiry}
          />

          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="***"
            keyboardType="number-pad"
            secureTextEntry
            value={cvv}
            onChangeText={setCvv}
          />
        </>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Method</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20,
  },
  headerTitle: { fontSize: 16, fontWeight: 'bold' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  typeSwitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  typeButton: {
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  activeType: {
    backgroundColor: '#2e7d32',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#555',
  },
  saveButton: {
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
