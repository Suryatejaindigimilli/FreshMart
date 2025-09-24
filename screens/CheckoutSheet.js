import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CheckoutSheet({ visible, onClose, onPlaceOrder }) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Checkout</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.label}>Delivery</Text>
            <Text style={styles.value}>Select Method</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.label}>Payment</Text>
            <Text style={styles.value}>💳</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.label}>Promo Code</Text>
            <Text style={styles.value}>Pick discount</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.label}>Total Cost</Text>
            <Text style={styles.value}>$13.97</Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            By placing an order you agree to our{' '}
            <Text style={styles.bold}>Terms And Conditions</Text>
          </Text>

          <TouchableOpacity style={styles.button} onPress={onPlaceOrder}>
            <Text style={styles.buttonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.2)' },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 14, borderBottomWidth: 1, borderColor: '#eee',
  },
  label: { fontSize: 15, color: '#444' },
  value: { fontWeight: '600', fontSize: 15 },
  terms: {
    fontSize: 12, color: '#888',
    marginTop: 16,
  },
  bold: { fontWeight: '600', color: '#000' },
  button: {
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
