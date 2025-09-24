import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  // Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function OrderDetailsScreen({ navigation }) {
  const order = {
    orderId: 'OD-05-29-T4RA-MJQMQ',
    shopName: 'ZAM ZAM FAMILY RESTAURANT',
    status: 'Delivered',
    deliveredTime: '2 hours ago',
    items: [
      { name: 'Chicken Fry Biryani', qty: 1, price: 280.0 },
      { name: 'S.P Chicken Biryani', qty: 1, price: 280.0 },
    ],
    storeCharges: 0,
    distanceCharges: 0,
    gst: 0,
    total: 560,
    paymentMode: 'COD',
    address: 'Srmap, FG85+56H, Guntur, Amaravati, Andhra Pradesh 522503, India',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}>
            <Icon name="home-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.card}>
        <View style={styles.statusRow}>
          <View style={styles.statusBox}>
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
          <Text style={styles.orderId}>{order.orderId}</Text>
          <Text style={styles.timeText}>{order.deliveredTime}</Text>
        </View>

        <Text style={styles.shopName}>{order.shopName}</Text>

        {order.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemQty}>x{item.qty}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
          </View>
        ))}

        <View style={styles.chargesRow}>
          <Text>Store Charges:</Text>
          <Text>₹{order.storeCharges.toFixed(2)}</Text>
        </View>
        <View style={styles.chargesRow}>
          <Text>Distance Charges:</Text>
          <Text>₹{order.distanceCharges.toFixed(2)}</Text>
        </View>
        <View style={styles.chargesRow}>
          <Text>GSTIN:</Text>
          <Text>₹{order.gst.toFixed(2)}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>₹{order.total}</Text>
        </View>

        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Payment Mode:</Text>
          <Text style={styles.paymentMode}>{order.paymentMode}</Text>
        </View>

        <Text style={styles.address}>{order.address}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBox: {
    borderWidth: 1,
    borderColor: '#0aaf7d',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 10,
  },
  statusText: {
    color: '#0aaf7d',
    fontWeight: 'bold',
    fontSize: 12,
  },
  orderId: {
    color: 'green',
    fontWeight: 'bold',
    flex: 1,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  shopName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemQty: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 6,
    marginRight: 10,
    fontSize: 12,
  },
  itemName: {
    flex: 1,
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  chargesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 10,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    fontWeight: 'bold',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  paymentLabel: {
    fontWeight: 'bold',
  },
  paymentMode: {
    fontWeight: 'bold',
  },
  address: {
    marginTop: 10,
    fontSize: 12,
    color: '#555',
  },
});
