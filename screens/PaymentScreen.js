import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PaymentScreen({ navigation }) {
  const [methods, setMethods] = useState([
    { id: 1, type: 'UPI', details: 'raj@upi', isDefault: true },
    { id: 2, type: 'Card', details: '**** **** **** 1234', isDefault: false },
  ]);

  const setDefault = (id) => {
    setMethods(methods.map(m => ({
      ...m,
      isDefault: m.id === id,
    })));
  };

  const removeMethod = (id) => {
    Alert.alert('Remove Payment Method', 'Are you sure you want to remove this method?', [
      { text: 'Cancel' },
      { text: 'Remove', onPress: () => setMethods(methods.filter(m => m.id !== id)) },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}>
          <Icon name="home-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {methods.map(method => (
          <View key={method.id} style={styles.methodCard}>
            <View>
              <Text style={styles.methodType}>{method.type}</Text>
              <Text style={styles.methodDetails}>{method.details}</Text>
              {method.isDefault && <Text style={styles.defaultTag}>Default</Text>}
            </View>
            <View style={styles.methodActions}>
              {!method.isDefault && (
                <TouchableOpacity onPress={() => setDefault(method.id)}>
                  <Icon name="checkmark-circle-outline" size={22} color="#2e7d32" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => removeMethod(method.id)}>
                <Icon name="trash-outline" size={22} color="#d32f2f" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddPaymentMethodScreen')}>
          <Text style={styles.addButtonText}>+ Add New Method</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 10 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20,
  },
  headerTitle: { fontSize: 16, fontWeight: 'bold' },
  methodCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodType: { fontWeight: 'bold', fontSize: 15, color: '#222' },
  methodDetails: { color: '#555', fontSize: 13 },
  defaultTag: {
    marginTop: 4,
    fontSize: 12,
    color: '#2e7d32',
    fontWeight: '600',
  },
  methodActions: {
    flexDirection: 'row',
    gap: 15,
  },
  addButton: {
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
