// /* eslint-disable react-native/no-inline-styles */
// // import React from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   Image,
// //   TouchableOpacity,
// //   ScrollView,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/Ionicons';

// // const cartItems = [
// //   {
// //     id: '1',
// //     name: 'Bell Pepper Red',
// //     desc: '1kg, Price',
// //     price: '$4.99',
// //     image: require('../assets/bell-pepper.png'), // Replace with actual path
// //   },
// //   {
// //     id: '2',
// //     name: 'Egg Chicken Red',
// //     desc: '4pcs, Price',
// //     price: '$1.99',
// //     image: require('../assets/egg-red.png'), // Replace with actual path
// //   },
// // ];

// // const CheckoutScreen = () => {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>My Cart</Text>

// //       <ScrollView style={styles.cartList}>
// //         {cartItems.map((item) => (
// //           <View key={item.id} style={styles.itemContainer}>
// //             <Image source={item.image} style={styles.itemImage} />
// //             <View style={styles.itemInfo}>
// //               <Text style={styles.itemName}>{item.name}</Text>
// //               <Text style={styles.itemDesc}>{item.desc}</Text>
// //               <View style={styles.qtyRow}>
// //                 <TouchableOpacity style={styles.qtyBtn}>
// //                   <Text style={styles.qtyText}>-</Text>
// //                 </TouchableOpacity>
// //                 <Text style={styles.qtyNum}>1</Text>
// //                 <TouchableOpacity style={styles.qtyBtn}>
// //                   <Text style={styles.qtyText}>+</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             </View>
// //             <Text style={styles.itemPrice}>{item.price}</Text>
// //             <TouchableOpacity>
// //               <Icon name="close" size={20} color="#ccc" />
// //             </TouchableOpacity>
// //           </View>
// //         ))}
// //       </ScrollView>

// //       {/* Checkout Panel */}
// //       <View style={styles.checkoutContainer}>
// //         <View style={styles.checkoutHeader}>
// //           <Text style={styles.checkoutTitle}>Checkout</Text>
// //           <TouchableOpacity>
// //             <Icon name="close" size={20} />
// //           </TouchableOpacity>
// //         </View>

// //         <TouchableOpacity style={styles.checkoutRow}>
// //           <Text style={styles.label}>Delivery</Text>
// //           <View style={styles.rowRight}>
// //             <Text style={styles.selectText}>Select Method</Text>
// //             <Icon name="chevron-forward" size={18} />
// //           </View>
// //         </TouchableOpacity>

// //         <TouchableOpacity style={styles.checkoutRow}>
// //           <Text style={styles.label}>Payment</Text>
// //           <Icon name="card" size={20} color="#3366ff" />
// //         </TouchableOpacity>

// //         <TouchableOpacity style={styles.checkoutRow}>
// //           <Text style={styles.label}>Promo Code</Text>
// //           <View style={styles.rowRight}>
// //             <Text style={styles.selectText}>Pick discount</Text>
// //             <Icon name="chevron-forward" size={18} />
// //           </View>
// //         </TouchableOpacity>

// //         <View style={styles.checkoutRow}>
// //           <Text style={styles.label}>Total Cost</Text>
// //           <Text style={styles.price}>$13.97</Text>
// //         </View>

// //         <Text style={styles.agreeText}>
// //           By placing an order you agree to our{' '}
// //           <Text style={styles.termsText}>Terms And Conditions</Text>
// //         </Text>

// //         <TouchableOpacity style={styles.placeOrderBtn}>
// //           <Text style={styles.placeOrderText}>Place Order</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };

// // export default CheckoutScreen;

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#fff' },
// //   header: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     margin: 16,
// //     textAlign: 'center',
// //   },
// //   cartList: { paddingHorizontal: 16 },
// //   itemContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingVertical: 12,
// //     borderBottomColor: '#eee',
// //     borderBottomWidth: 1,
// //   },
// //   itemImage: { width: 50, height: 50, resizeMode: 'contain', marginRight: 12 },
// //   itemInfo: { flex: 1 },
// //   itemName: { fontSize: 16, fontWeight: 'bold' },
// //   itemDesc: { color: '#666' },
// //   qtyRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginTop: 6,
// //   },
// //   qtyBtn: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 5,
// //     paddingHorizontal: 10,
// //     paddingVertical: 2,
// //   },
// //   qtyText: { fontSize: 16 },
// //   qtyNum: { marginHorizontal: 10, fontSize: 16 },
// //   itemPrice: { fontWeight: 'bold', marginRight: 10 },

// //   checkoutContainer: {
// //     backgroundColor: '#fff',
// //     borderTopLeftRadius: 20,
// //     borderTopRightRadius: 20,
// //     padding: 20,
// //     elevation: 10,
// //   },
// //   checkoutHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 16,
// //   },
// //   checkoutTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   checkoutRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 14,
// //   },
// //   label: {
// //     fontSize: 16,
// //     color: '#333',
// //   },
// //   selectText: {
// //     color: '#555',
// //   },
// //   rowRight: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 4,
// //   },
// //   price: {
// //     fontWeight: 'bold',
// //   },
// //   agreeText: {
// //     fontSize: 12,
// //     color: '#666',
// //     marginTop: 10,
// //     marginBottom: 10,
// //   },
// //   termsText: {
// //     fontWeight: 'bold',
// //     color: '#00a859',
// //   },
// //   placeOrderBtn: {
// //     backgroundColor: '#4CAF50',
// //     paddingVertical: 14,
// //     borderRadius: 12,
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   placeOrderText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //     fontSize: 16,
// //   },
// // });


// import React, { useState } from 'react';
// import {
//   View, Text, StyleSheet, Image, TouchableOpacity,
//   ScrollView, Alert
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import AddressSelectorModal from './AddressSelectorModal';
// import axios from 'axios';
// import CheckBox from '@react-native-community/checkbox'; // ✅ Imported checkbox

// const DELIVERY_FEE = 10;
// const TAX_RATE = 19;

// const CheckoutScreen = ({ route, navigation }) => {
//   const { cartItems: initialCartItems = [], selectedAddress, token } = route.params || {};
//   const [cartItems, setCartItems] = useState(initialCartItems);
//   const [deliveryAddress, setDeliveryAddress] = useState(selectedAddress || null);
//   const [paymentMethod, setPaymentMethod] = useState(null);
//   const [discount, setDiscount] = useState(0);
//   const [addressModalVisible, setAddressModalVisible] = useState(false);
//   const [isAgreed, setIsAgreed] = useState(false); // ✅ Checkbox state

//   const getSubtotal = () =>
//     cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

//   const subtotal = cartItems.length > 0 ? Number(getSubtotal()) : 0;
//   const tax = cartItems.length > 0 ? TAX_RATE : 0;
//   const grandTotal = cartItems.length > 0 ? subtotal - discount + DELIVERY_FEE + tax : 0;

//   const handleIncrement = (itemId) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === itemId ? { ...item, count: item.count + 1 } : item
//       )
//     );
//   };

//   const handleDecrement = (itemId) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === itemId ? { ...item, count: item.count - 1 } : item
//       ).filter((item) => item.count > 0)
//     );
//   };

//   const handlePlaceOrder = async () => {
//     if (cartItems.length === 0) {
//       Alert.alert('Cart is Empty', 'Please add items to cart before placing an order.');
//       return;
//     }

//     if (!deliveryAddress) {
//       setAddressModalVisible(true);
//       return;
//     }

//     if (!paymentMethod) {
//       Alert.alert('Payment Method Required', 'Please select a payment method.');
//       return;
//     }

//     try {
//       try {
//         const res = await axios.post(
//           'http://192.168.0.191:3000/delivery-addresses',
//           deliveryAddress,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             timeout: 5000, // optional: 5 seconds timeout
//           }
//         );
//         console.log('Address Saved:', res.data);
//       } catch (error) {
//         console.error('Address Save Failed:', error.message);
//         Alert.alert('Network Error', 'Could not save address. Please check your connection.');
//       }



//       Alert.alert('Order Placed', 'Your order has been successfully placed.');
//       navigation.navigate('OrderSuccessScreen');
//     } catch (error) {
//       console.error('Save Address Failed:', error);
//       Alert.alert('Error', 'Failed to save address.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {cartItems.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Icon name="cart-outline" size={80} color="#ccc" />
//           <Text style={styles.emptyText}>Your cart is empty</Text>
//           <TouchableOpacity
//             style={styles.continueBtn}
//             onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
//           >
//             <Text style={styles.continueBtnText}>Continue Shopping</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <>
//           <ScrollView style={styles.cartList}>
//             {cartItems.map((item) => (
//               <View key={item.id} style={styles.itemContainer}>
//                 <Image source={{ uri: item.product_image_url }} style={styles.itemImage} />
//                 <View style={styles.itemInfo}>
//                   <Text style={styles.itemName}>{item.product_name}</Text>
//                   <Text style={styles.itemDesc}>{item.quantity}</Text>
//                   <View style={styles.priceQtyRow}>
//                     <View style={styles.quantityRow}>
//                       <TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.qtyButton}>
//                         <Text style={styles.qtyButtonText}>-</Text>
//                       </TouchableOpacity>
//                       <Text style={styles.qtyValue}>{item.count}</Text>
//                       <TouchableOpacity onPress={() => handleIncrement(item.id)} style={styles.qtyButton}>
//                         <Text style={styles.qtyButtonText}>+</Text>
//                       </TouchableOpacity>
//                     </View>
//                     <Text style={styles.itemPrice}>₹{(item.price * item.count).toFixed(2)}</Text>
//                   </View>
//                 </View>
//               </View>
//             ))}
//           </ScrollView>

//           <View style={styles.checkoutContainer}>
//             <Text style={styles.checkoutTitle}>Checkout Summary</Text>

//             <TouchableOpacity style={styles.checkoutRow} onPress={() => setAddressModalVisible(true)}>
//               <Text style={styles.label}>Delivery</Text>
//               <View style={styles.rowRight}>
//                 <Text style={styles.selectText}>
//                   {deliveryAddress?.full_name
//                     ? `${deliveryAddress.full_name}, ${deliveryAddress.street_address}`
//                     : 'Select Address'}
//                 </Text>
//                 <Icon name="chevron-forward" size={18} />
//               </View>
//             </TouchableOpacity>

//             <View style={styles.priceRow}>
//               <Text style={styles.label}>Subtotal</Text>
//               <Text>₹{subtotal.toFixed(2)}</Text>
//             </View>
//             <View style={styles.priceRow}>
//               <Text style={styles.label}>Discount</Text>
//               <Text style={{ color: 'green' }}>– ₹{discount.toFixed(2)}</Text>
//             </View>
//             <View style={styles.priceRow}>
//               <Text style={styles.label}>Delivery Fee</Text>
//               <Text>₹{DELIVERY_FEE.toFixed(2)}</Text>
//             </View>
//             <View style={styles.priceRow}>
//               <Text style={styles.label}>Platform Fee</Text>
//               <Text>₹{tax.toFixed(2)}</Text>
//             </View>

//             <View style={[styles.priceRow, { marginTop: 10 }]}>
//               <Text style={[styles.label, { fontWeight: 'bold' }]}>Total</Text>
//               <Text style={[styles.price, { fontWeight: 'bold' }]}>₹{grandTotal.toFixed(2)}</Text>
//             </View>

//             <Text style={styles.label1}>Payment Method</Text>
//             <View style={styles.paymentOptions}>
//               <TouchableOpacity
//                 style={[
//                   styles.paymentOption,
//                   paymentMethod === 'Cash on Delivery' && styles.paymentOptionSelected,
//                 ]}
//                 onPress={() => setPaymentMethod('Cash on Delivery')}
//               >
//                 <Icon name="cash-outline" size={18} color="#333" />
//                 <Text style={styles.paymentText}>Cash on Delivery</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[
//                   styles.paymentOption,
//                   paymentMethod === 'UPI' && styles.paymentOptionSelected,
//                 ]}
//                 onPress={() => setPaymentMethod('UPI')}
//               >
//                 <Icon name="logo-google-playstore" size={18} color="#333" />
//                 <Text style={styles.paymentText}>UPI</Text>
//               </TouchableOpacity>
//             </View>

//             {/* ✅ Checkbox for Terms */}
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
//               <CheckBox
//                 value={isAgreed}
//                 onValueChange={setIsAgreed}
//                 tintColors={{ true: '#00B14F', false: '#aaa' }}
//               />
//               <Text style={styles.agreeText}>
//                 By placing an order you agree to our{' '}
//                 <Text style={styles.termsText}>Terms And Conditions</Text>
//               </Text>
//             </View>

//             <TouchableOpacity
//               style={[styles.placeOrderBtn, !isAgreed && { backgroundColor: '#ccc' }]}
//               onPress={() => {
//                 if (!isAgreed) {
//                   Alert.alert('Terms Required', 'Please agree to the Terms and Conditions.');
//                   return;
//                 }
//                 if (deliveryAddress) {
//                   handlePlaceOrder();
//                 } else {
//                   setAddressModalVisible(true);
//                 }
//               }}
//             >
//               <Text style={styles.placeOrderText}>
//                 {deliveryAddress ? 'Place Order' : 'Select Address'}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <AddressSelectorModal
//             visible={addressModalVisible}
//             onClose={() => setAddressModalVisible(false)}
//             onSelect={(address) => {
//               setDeliveryAddress(address);
//               setAddressModalVisible(false);
//             }}
//             token={token}
//           />
//         </>
//       )}
//     </View>
//   );
// };

// export default CheckoutScreen;


// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   cartList: { paddingHorizontal: 16 },
//   itemContainer: {
//     flexDirection: 'row',
//     paddingVertical: 12,
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//   },
//   itemImage: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//     marginRight: 12,
//     borderRadius: 6,
//   },
//   itemInfo: { flex: 1 },
//   itemName: { fontSize: 16, fontWeight: 'bold' },
//   itemDesc: { color: '#666', fontSize: 12 },
//   priceQtyRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   quantityRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   qtyButton: {
//     backgroundColor: '#eee',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 5,
//   },
//   qtyButtonText: { fontSize: 16, fontWeight: 'bold' },
//   qtyValue: { marginHorizontal: 10, fontWeight: 'bold', fontSize: 14 },
//   itemPrice: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     color: '#2e7d32',
//   },
//   checkoutContainer: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     elevation: 10,
//   },
//   checkoutTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   checkoutRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 14,
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//   },
//   label1: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   selectText: {
//     color: '#555',
//   },
//   rowRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   price: {
//     fontSize: 16,
//   },
//   paymentOptions: {
//     flexDirection: 'row',
//     gap: 10,
//     marginBottom: 16,
//   },
//   paymentOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//   },
//   paymentOptionSelected: {
//     backgroundColor: '#e0f2f1',
//     borderColor: '#4CAF50',
//   },
//   paymentText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   agreeText: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   termsText: {
//     fontWeight: 'bold',
//     color: '#00a859',
//   },
//   placeOrderBtn: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   placeOrderText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#888',
//     marginTop: 10,
//     fontWeight: '600',
//   },
//   continueBtn: {
//     marginTop: 20,
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   continueBtnText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

/* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const cartItems = [
//   {
//     id: '1',
//     name: 'Bell Pepper Red',
//     desc: '1kg, Price',
//     price: '$4.99',
//     image: require('../assets/bell-pepper.png'), // Replace with actual path
//   },
//   {
//     id: '2',
//     name: 'Egg Chicken Red',
//     desc: '4pcs, Price',
//     price: '$1.99',
//     image: require('../assets/egg-red.png'), // Replace with actual path
//   },
// ];

// const CheckoutScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>My Cart</Text>

//       <ScrollView style={styles.cartList}>
//         {cartItems.map((item) => (
//           <View key={item.id} style={styles.itemContainer}>
//             <Image source={item.image} style={styles.itemImage} />
//             <View style={styles.itemInfo}>
//               <Text style={styles.itemName}>{item.name}</Text>
//               <Text style={styles.itemDesc}>{item.desc}</Text>
//               <View style={styles.qtyRow}>
//                 <TouchableOpacity style={styles.qtyBtn}>
//                   <Text style={styles.qtyText}>-</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.qtyNum}>1</Text>
//                 <TouchableOpacity style={styles.qtyBtn}>
//                   <Text style={styles.qtyText}>+</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <Text style={styles.itemPrice}>{item.price}</Text>
//             <TouchableOpacity>
//               <Icon name="close" size={20} color="#ccc" />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>

//       {/* Checkout Panel */}
//       <View style={styles.checkoutContainer}>
//         <View style={styles.checkoutHeader}>
//           <Text style={styles.checkoutTitle}>Checkout</Text>
//           <TouchableOpacity>
//             <Icon name="close" size={20} />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.checkoutRow}>
//           <Text style={styles.label}>Delivery</Text>
//           <View style={styles.rowRight}>
//             <Text style={styles.selectText}>Select Method</Text>
//             <Icon name="chevron-forward" size={18} />
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.checkoutRow}>
//           <Text style={styles.label}>Payment</Text>
//           <Icon name="card" size={20} color="#3366ff" />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.checkoutRow}>
//           <Text style={styles.label}>Promo Code</Text>
//           <View style={styles.rowRight}>
//             <Text style={styles.selectText}>Pick discount</Text>
//             <Icon name="chevron-forward" size={18} />
//           </View>
//         </TouchableOpacity>

//         <View style={styles.checkoutRow}>
//           <Text style={styles.label}>Total Cost</Text>
//           <Text style={styles.price}>$13.97</Text>
//         </View>

//         <Text style={styles.agreeText}>
//           By placing an order you agree to our{' '}
//           <Text style={styles.termsText}>Terms And Conditions</Text>
//         </Text>

//         <TouchableOpacity style={styles.placeOrderBtn}>
//           <Text style={styles.placeOrderText}>Place Order</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CheckoutScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     margin: 16,
//     textAlign: 'center',
//   },
//   cartList: { paddingHorizontal: 16 },
//   itemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//   },
//   itemImage: { width: 50, height: 50, resizeMode: 'contain', marginRight: 12 },
//   itemInfo: { flex: 1 },
//   itemName: { fontSize: 16, fontWeight: 'bold' },
//   itemDesc: { color: '#666' },
//   qtyRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 6,
//   },
//   qtyBtn: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//   },
//   qtyText: { fontSize: 16 },
//   qtyNum: { marginHorizontal: 10, fontSize: 16 },
//   itemPrice: { fontWeight: 'bold', marginRight: 10 },

//   checkoutContainer: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     elevation: 10,
//   },
//   checkoutHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   checkoutTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   checkoutRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 14,
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//   },
//   selectText: {
//     color: '#555',
//   },
//   rowRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   price: {
//     fontWeight: 'bold',
//   },
//   agreeText: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   termsText: {
//     fontWeight: 'bold',
//     color: '#00a859',
//   },
//   placeOrderBtn: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   placeOrderText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });


import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  ScrollView, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AddressSelectorModal from './AddressSelectorModal';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox'; // ✅ Imported checkbox
import RazorpayCheckout from 'react-native-razorpay';

const DELIVERY_FEE = 10;
const TAX_RATE = 19;

const CheckoutScreen = ({ route, navigation }) => {
  const { cartItems: initialCartItems = [], selectedAddress, token } = route.params || {};
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [deliveryAddress, setDeliveryAddress] = useState(selectedAddress || null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false); // ✅ Checkbox state

  const getSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

  const subtotal = cartItems.length > 0 ? Number(getSubtotal()) : 0;
  const tax = cartItems.length > 0 ? TAX_RATE : 0;
  const grandTotal = cartItems.length > 0 ? subtotal - discount + DELIVERY_FEE + tax : 0;

  const handleIncrement = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, count: item.count - 1 } : item
      ).filter((item) => item.count > 0)
    );
  };

  // Razorpay payment handling
  const handleRazorpayPayment = async () => {
    try {
      // Validate amount
      if (grandTotal <= 0) {
        Alert.alert('Invalid Amount', 'Order total must be greater than 0.');
        return;
      }

      // Create order on backend
      const orderResponse = await axios.post('http://192.168.0.101:5000/create-order', {
        amount: Math.round(grandTotal * 100), // Convert to paise
      });

      const order = orderResponse.data;

      // Razorpay options
      const options = {
        description: 'FreshMart Order Payment',
        image: 'https://your-logo-url.com/logo.png',
        currency: 'INR',
        key: 'rzp_test_9A3QWbqnrOe3ds',
        amount: Math.round(grandTotal * 100),
        name: 'FreshMart',
        order_id: order.id,
        prefill: {
          email: 'customer@example.com',
          contact: '9999999999',
          name: deliveryAddress?.full_name || 'Customer',
        },
        theme: { color: '#00B14F' },
        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed');
          },
        },
      };

      // Open Razorpay checkout
      const data = await RazorpayCheckout.open(options);

      console.log('Payment Success:', data);

      // Payment successful - proceed with order
      await processOrderAfterPayment(data);

    } catch (error) {
      console.error('Payment Error:', error);
      if (error.code === 'PAYMENT_CANCELLED') {
        Alert.alert('Payment Cancelled', 'Payment was cancelled by user.');
      } else if (error.code === 'NETWORK_ERROR') {
        Alert.alert('Network Error', 'Please check your internet connection and try again.');
      } else {
        Alert.alert('Payment Failed', 'Payment failed. Please try again.');
      }
    }
  };

  // Process order after successful payment
  const processOrderAfterPayment = async (paymentData) => {
    try {
      // Verify payment with backend
      const verificationResponse = await axios.post('http://192.168.0.191:3000/verify-payment', {
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
      });

      if (verificationResponse.data.success) {
        // Save address
        try {
          const res = await axios.post(
            'http://192.168.0.191:3000/delivery-addresses',
            deliveryAddress,
            {
              headers: { Authorization: `Bearer ${token}` },
              timeout: 5000,
            }
          );

          console.log('Address Saved:', res.data);
        } catch (error) {
          console.error('Address Save Failed:', error.message);
        }

        // Here you would typically save the order to your database
        // with payment details from paymentData

        Alert.alert('Payment Successful', 'Your order has been placed successfully!');
        navigation.navigate('OrderSuccessScreen');
      } else {
        Alert.alert('Payment Verification Failed', 'Please contact support.');
      }
    } catch (error) {
      console.error('Order Processing Error:', error);
      Alert.alert('Error', 'Order processing failed. Please contact support.');
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is Empty', 'Please add items to cart before placing an order.');
      return;
    }

    if (!deliveryAddress) {
      setAddressModalVisible(true);
      return;
    }

    if (!paymentMethod) {
      Alert.alert('Payment Method Required', 'Please select a payment method.');
      return;
    }

    // Handle different payment methods
    if (paymentMethod === 'Online Payment') {
      await handleRazorpayPayment();
      return;
    }

    // For Cash on Delivery and UPI
    try {
      try {
        const res = await axios.post(
          'http://192.168.0.101:5000/delivery-addresses',
          deliveryAddress,
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000,
          }
        );

        console.log('Address Saved:', res.data);
      } catch (error) {
        console.error('Address Save Failed:', error.message);
        Alert.alert('Network Error', 'Could not save address. Please check your connection.');
      }

      // Alert.alert('Order Placed', 'Your order has been successfully placed.');
      navigation.navigate('OrderSuccessScreen');
    } catch (error) {
      console.error('Save Address Failed:', error);
      Alert.alert('Error', 'Failed to save address.');
    }
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
          >
            <Text style={styles.continueBtnText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.cartList}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <Image source={{ uri: item.product_image_url }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.product_name}</Text>
                  <Text style={styles.itemDesc}>{item.quantity}</Text>
                  <View style={styles.priceQtyRow}>
                    <View style={styles.quantityRow}>
                      <TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.qtyButton}>
                        <Text style={styles.qtyButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyValue}>{item.count}</Text>
                      <TouchableOpacity onPress={() => handleIncrement(item.id)} style={styles.qtyButton}>
                        <Text style={styles.qtyButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.itemPrice}>₹{(item.price * item.count).toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.checkoutContainer}>
            <Text style={styles.checkoutTitle}>Checkout Summary</Text>

            <TouchableOpacity style={styles.checkoutRow} onPress={() => setAddressModalVisible(true)}>
              <Text style={styles.label}>Delivery</Text>
              <View style={styles.rowRight}>
                <Text style={styles.selectText}>
                  {deliveryAddress?.full_name
                    ? `${deliveryAddress.full_name}, ${deliveryAddress.street_address}`
                    : 'Select Address'}
                </Text>
                <Icon name="chevron-forward" size={18} />
              </View>
            </TouchableOpacity>

            <View style={styles.priceRow}>
              <Text style={styles.label}>Subtotal</Text>
              <Text>₹{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.label}>Discount</Text>
              <Text style={{ color: 'green' }}>– ₹{discount.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.label}>Delivery Fee</Text>
              <Text>₹{DELIVERY_FEE.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.label}>Platform Fee</Text>
              <Text>₹{tax.toFixed(2)}</Text>
            </View>

            <View style={[styles.priceRow, { marginTop: 10 }]}>
              <Text style={[styles.label, { fontWeight: 'bold' }]}>Total</Text>
              <Text style={[styles.price, { fontWeight: 'bold' }]}>₹{grandTotal.toFixed(2)}</Text>
            </View>

            <Text style={styles.label1}>Payment Method</Text>
            <View style={styles.paymentOptions}>
              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethod === 'Cash on Delivery' && styles.paymentOptionSelected,
                ]}
                onPress={() => setPaymentMethod('Cash on Delivery')}
              >
                <Icon name="cash-outline" size={18} color="#333" />
                <Text style={styles.paymentText}>Cash on Delivery</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethod === 'UPI' && styles.paymentOptionSelected,
                ]}
                onPress={() => setPaymentMethod('UPI')}
              >
                <Icon name="logo-google-playstore" size={18} color="#333" />
                <Text style={styles.paymentText}>UPI</Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethod === 'Online Payment' && styles.paymentOptionSelected,
                ]}
                onPress={() => setPaymentMethod('Online Payment')}
              >
                <Icon name="card-outline" size={18} color="#333" />
                <Text style={styles.paymentText}>Online</Text>
              </TouchableOpacity>
            </View>

            {/* ✅ Checkbox for Terms */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
              <CheckBox
                value={isAgreed}
                onValueChange={setIsAgreed}
                tintColors={{ true: '#00B14F', false: '#aaa' }}
              />
              <Text style={styles.agreeText}>
                By placing an order you agree to our{' '}
                <Text style={styles.termsText}>Terms And Conditions</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.placeOrderBtn, !isAgreed && { backgroundColor: '#ccc' }]}
              onPress={() => {
                if (!isAgreed) {
                  Alert.alert('Terms Required', 'Please agree to the Terms and Conditions.');
                  return;
                }
                if (deliveryAddress) {
                  handlePlaceOrder();
                } else {
                  setAddressModalVisible(true);
                }
              }}
            >
              <Text style={styles.placeOrderText}>
                {deliveryAddress ? 'Place Order' : 'Select Address'}
              </Text>
            </TouchableOpacity>
          </View>

          <AddressSelectorModal
            visible={addressModalVisible}
            onClose={() => setAddressModalVisible(false)}
            onSelect={(address) => {
              setDeliveryAddress(address);
              setAddressModalVisible(false);
            }}
            token={token}
          />
        </>
      )}
    </View>
  );
};

export default CheckoutScreen;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  cartList: { paddingHorizontal: 16 },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 12,
    borderRadius: 6,
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemDesc: { color: '#666', fontSize: 12 },
  priceQtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
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
  checkoutContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  checkoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  checkoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  label1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  selectText: {
    color: '#555',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
  },
  paymentOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    minWidth: '30%',
  },
  paymentOptionSelected: {
    backgroundColor: '#e0f2f1',
    borderColor: '#4CAF50',
  },
  paymentText: {
    fontSize: 14,
    color: '#333',
  },
  agreeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 10,
    marginBottom: 10,
  },
  termsText: {
    fontWeight: 'bold',
    color: '#00a859',
  },
  placeOrderBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  placeOrderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    marginTop: 10,
    fontWeight: '600',
  },
  continueBtn: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
