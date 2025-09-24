import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddressSelectorModal = ({ visible, onClose, onSelect }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (visible) {
      // Simulated sample address for demo/testing
      setAddresses([
        {
          id: 7,
          full_name: 'Surya Teja',
          phone_number: '9876543210',
          house_number: '126/A',
          street_address: '5th Cross Street, KPHB Phase 6',
          city: 'Hyderabad',
          state: 'Telangana',
          address_type: 'Home',
          default_address: 1,
          created_at: '2024-07-31 10:23:45',
        }
      ]);
    }
  }, [visible]);

  const handleSelect = (address) => {
    onSelect(address);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Delivery Address</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={22} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
                <Text style={styles.name}>{item.full_name}</Text>
                <Text style={styles.phone}>{item.phone_number}</Text>
                <Text style={styles.address}>
                  {item.house_number}, {item.street_address}, {item.city}, {item.state}
                </Text>
                <Text style={styles.type}>{item.address_type}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddressSelectorModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  phone: {
    fontSize: 13,
    color: '#333',
  },
  address: {
    fontSize: 13,
    color: '#555',
    marginVertical: 4,
  },
  type: {
    fontSize: 12,
    color: '#777',
  },
});
