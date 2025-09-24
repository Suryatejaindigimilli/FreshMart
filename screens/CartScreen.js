import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';



const CartScreen = () => {
  const {
    cartItems,
    incrementItem,
    decrementItem,
    removeFromCart,
    getTotalPrice,
  } = useCart();
const navigation = useNavigation();



  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Image source={{ uri: item.product_image_url }} style={styles.itemImage} />

      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.product_name}</Text>
        <Text style={styles.itemDesc}>{item.quantity}</Text>

        {/* Unit Price */}
        <Text style={styles.unitPrice}>Unit Price: ₹{item.price}</Text>

        <View style={styles.priceQtyRow}>
          {/* Quantity Controller */}
          <View style={styles.quantityRow}>
            <TouchableOpacity onPress={() => decrementItem(item)} style={styles.qtyButton}>
              <Text style={styles.qtyButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{item.count}</Text>
            <TouchableOpacity onPress={() => incrementItem(item)} style={styles.qtyButton}>
              <Text style={styles.qtyButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Total Price of This Item */}
          <Text style={styles.itemPrice}>Total: ₹{(item.price * item.count).toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeIcon}>
        <Icon name="close" size={18} color="#555" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('CheckoutScreen', { cartItems, total: getTotalPrice() })}>
        <Text style={styles.checkoutText}>Go to Checkout</Text>
        <Text style={styles.totalPrice}>₹{getTotalPrice()}</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    position: 'relative',
  },
  itemImage: { width: 50, height: 50, resizeMode: 'contain' },
  itemContent: { flex: 1, marginLeft: 10 },
  itemName: { fontWeight: 'bold', fontSize: 15 },
  itemDesc: { color: '#666', fontSize: 12, marginBottom: 4 },
  unitPrice: { fontSize: 13, color: '#333', marginBottom: 4 },

  priceQtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  qtyButtonText: { fontSize: 16, fontWeight: 'bold' },
  qtyValue: { marginHorizontal: 10, fontWeight: 'bold', fontSize: 14 },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2e7d32',
  },
  removeIcon: {
    padding: 6,
  },
  checkoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#3CB371',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
