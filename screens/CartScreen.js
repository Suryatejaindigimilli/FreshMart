// import React, { useMemo, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import CheckoutSheet from '../screens/CheckoutSheet';
// import { useCart } from '../context/CartContext';
// import { useOrders } from '../context/OrdersContext';

// const t = {
//   c: {
//     bg: '#F6F7FB',
//     card: '#FFFFFF',
//     text: '#121212',
//     sub: '#6A6A6A',
//     pri: '#18A957',
//     priSoft: '#EAF8F1',
//     line: '#E9ECF3',
//     danger: '#FF3B30',
//   },
// };

// export default function CartScreen({ navigation }) {
//   const { items, incrementItem, decrementItem, removeItem, clearCart, getCartTotal } = useCart();
//   const { createOrderFromCart } = useOrders();

//   const [sheet, setSheet] = useState(false);
//   const [placing, setPlacing] = useState(false);

//   const total = useMemo(() => getCartTotal(), [items, getCartTotal]);

//   const onPlaceOrder = async () => {
//     if (!items.length) return;

//     setPlacing(true);
//     try {
//       // ✅ If you have backend API, call it here and throw on failure.
//       const order = createOrderFromCart({
//         cartItems: items,
//         status: 'PLACED',
//         paymentMode: 'COD',
//         shopName: 'FreshCart',
//         address: '',
//       });

//       await clearCart();
//       setSheet(false);
//       navigation.replace('OrderSuccessScreen', { orderId: order.id });
//     } catch (e) {
//       createOrderFromCart({
//         cartItems: items,
//         status: 'FAILED',
//         paymentMode: 'COD',
//         shopName: 'FreshCart',
//         address: '',
//       });
//       setSheet(false);
//       navigation.navigate('OrderFailedScreen');
//     } finally {
//       setPlacing(false);
//     }
//   };

//   const renderItem = ({ item }) => {
//     const name = item.product_name || item.name || 'Item';
//     const img = item.product_image_url || null;
//     const qty = item.qty || 1;

//     return (
//       <View style={styles.row}>
//         <View style={styles.imgWrap}>
//           {img ? (
//             <Image source={{ uri: img }} style={styles.img} />
//           ) : item.image ? (
//             <Image source={item.image} style={styles.img} />
//           ) : (
//             <Icon name="image-outline" size={22} color={t.c.sub} />
//           )}
//         </View>

//         <View style={{ flex: 1, marginLeft: 10 }}>
//           <Text style={styles.name} numberOfLines={1}>{name}</Text>
//           <Text style={styles.sub} numberOfLines={1}>{item.quantity || item.weight || ''}</Text>

//           <View style={styles.bottomRow}>
//             <Text style={styles.price}>₹{Number(item.price || 0).toFixed(2)}</Text>

//             <View style={styles.qtyBox}>
//               <TouchableOpacity style={styles.qtyBtn} onPress={() => decrementItem(item)} activeOpacity={0.85}>
//                 <Icon name="remove" size={16} color={t.c.text} />
//               </TouchableOpacity>
//               <Text style={styles.qtyText}>{qty}</Text>
//               <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: t.c.pri }]} onPress={() => incrementItem(item)} activeOpacity={0.85}>
//                 <Icon name="add" size={16} color="#fff" />
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity onPress={() => removeItem(item.id)} activeOpacity={0.85}>
//               <Icon name="trash-outline" size={18} color={t.c.danger} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.85}>
//           <Icon name="chevron-back" size={22} color={t.c.text} />
//         </TouchableOpacity>
//         <Text style={styles.title}>Cart</Text>
//         <TouchableOpacity onPress={() => clearCart()} style={styles.clearBtn} activeOpacity={0.85}>
//           <Text style={styles.clearText}>Clear</Text>
//         </TouchableOpacity>
//       </View>

//       {items.length === 0 ? (
//         <View style={styles.empty}>
//           <Icon name="cart-outline" size={34} color={t.c.pri} />
//           <Text style={styles.emptyTitle}>Your cart is empty</Text>
//           <Text style={styles.emptySub}>Add items to continue.</Text>
//           <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate('MainTabs')} activeOpacity={0.85}>
//             <Text style={styles.shopBtnText}>Go Shopping</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <>
//           <FlatList
//             data={items}
//             keyExtractor={(x) => String(x.id)}
//             renderItem={renderItem}
//             contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
//             showsVerticalScrollIndicator={false}
//           />

//           <View style={styles.footer}>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.totalLabel}>Total</Text>
//               <Text style={styles.totalValue}>₹{Number(total).toFixed(2)}</Text>
//             </View>
//             <TouchableOpacity style={styles.checkoutBtn} onPress={() => setSheet(true)} activeOpacity={0.85}>
//               <Text style={styles.checkoutText}>Checkout</Text>
//             </TouchableOpacity>
//           </View>

//           <CheckoutSheet
//             visible={sheet}
//             onClose={() => setSheet(false)}
//             onPlaceOrder={onPlaceOrder}
//             total={total}
//             placing={placing}
//           />
//         </>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: t.c.bg },
//   header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8, flexDirection: 'row', alignItems: 'center' },
//   iconBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: t.c.card, alignItems: 'center', justifyContent: 'center' },
//   title: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '900', color: t.c.text },
//   clearBtn: { paddingHorizontal: 10, paddingVertical: 8 },
//   clearText: { fontSize: 13, fontWeight: '900', color: t.c.danger },

//   row: { flexDirection: 'row', backgroundColor: t.c.card, marginBottom: 12, borderRadius: 18, padding: 12, marginHorizontal: 16 },
//   imgWrap: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#EEF1F6', alignItems: 'center', justifyContent: 'center' },
//   img: { width: 54, height: 54, resizeMode: 'contain' },

//   name: { fontSize: 14, fontWeight: '900', color: t.c.text },
//   sub: { marginTop: 3, fontSize: 12, fontWeight: '800', color: t.c.sub },

//   bottomRow: { marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
//   price: { fontSize: 14, fontWeight: '900', color: t.c.text },

//   qtyBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: t.c.priSoft, borderRadius: 999, padding: 4 },
//   qtyBtn: { width: 34, height: 34, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
//   qtyText: { marginHorizontal: 10, fontSize: 14, fontWeight: '900', color: t.c.text },

//   footer: { position: 'absolute', left: 16, right: 16, bottom: 16, backgroundColor: t.c.card, borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center' },
//   totalLabel: { fontSize: 12, fontWeight: '800', color: t.c.sub },
//   totalValue: { marginTop: 2, fontSize: 16, fontWeight: '900', color: t.c.text },
//   checkoutBtn: { backgroundColor: t.c.pri, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 14 },
//   checkoutText: { color: '#fff', fontWeight: '900' },

//   empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
//   emptyTitle: { marginTop: 10, fontSize: 16, fontWeight: '900', color: t.c.text },
//   emptySub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },
//   shopBtn: { marginTop: 16, backgroundColor: t.c.pri, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 14 },
//   shopBtnText: { color: '#fff', fontWeight: '900' },
// });


import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import CheckoutSheet from '../screens/CheckoutSheet';

const t = {
  c: {
    bg: '#F6F7FB',
    card: '#FFFFFF',
    text: '#121212',
    sub: '#6A6A6A',
    line: '#E9ECF3',
    pri: '#18A957',
    priSoft: '#EAF8F1',
    danger: '#FF3B30',
    dangerSoft: '#FFF1F3',
  },
};

const getQty = (x) => {
  const v = Number(x?.qty ?? x?.count ?? x?.cartQty ?? x?.q ?? 1);
  return Number.isFinite(v) && v > 0 ? v : 1;
};

const getName = (x) => String(x?.product_name ?? x?.name ?? 'Item');
const getPrice = (x) => {
  const v = Number(x?.price ?? x?.unit_price ?? x?.p ?? 0);
  return Number.isFinite(v) ? v : 0;
};

const getImg = (x) => x?.product_image_url || x?.image_url || x?.img || null;

const makeId = () => {
  const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let r = '';
  for (let i = 0; i < 8; i += 1) r += s[Math.floor(Math.random() * s.length)];
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `OD-${mm}-${dd}-${r}`;
};

export default function CartScreen({ navigation, route }) {
  const { cartItems = [], incrementItem, decrementItem, removeItem, clearCart } = useCart();
  const { addOrder } = useOrders();

  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (route?.params?.selectedAddress) {
      setSelectedAddress(route.params.selectedAddress);
    }
  }, [route?.params?.selectedAddress]);

  const deliveryFee = 20;
  const taxPercent = 5;

  const subtotal = useMemo(() => {
    return cartItems.reduce((s, it) => s + getPrice(it) * getQty(it), 0);
  }, [cartItems]);

  const tax = useMemo(() => {
    return (subtotal + Number(deliveryFee || 0)) * ((Number(taxPercent) || 0) / 100);
  }, [subtotal]);

  const total = useMemo(() => subtotal + Number(deliveryFee || 0) + tax, [subtotal, tax]);

  const addrLine = useMemo(() => {
    if (!selectedAddress) return 'Select delivery address';
    const a = selectedAddress;
    const l1 = `${a.house_number || ''}${a.house_number ? ', ' : ''}${a.street_address || ''}`.trim();
    const l2 = `${a.city || ''}${a.city ? ', ' : ''}${a.state || ''}`.trim();
    const tag = a.address_type ? ` (${a.address_type})` : '';
    return `${(l1 || 'Address')}${l2 ? `, ${l2}` : ''}${tag}`;
  }, [selectedAddress]);

  const askRemove = (it) => {
    Alert.alert('Remove item', 'Remove this item from cart?', [
      { text: 'Cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          if (typeof removeItem === 'function') removeItem(it);
          else {
            const q = getQty(it);
            for (let i = 0; i < q; i += 1) decrementItem?.(it);
          }
        },
      },
    ]);
  };

  const placeOrder = async (payload) => {
    if (!payload?.selectedAddress) {
      Alert.alert('Select address', 'Please select delivery address.');
      return;
    }
    if (!payload?.items?.length) {
      Alert.alert('Cart empty', 'Add items to place order.');
      return;
    }

    setPlacing(true);
    try {
      await new Promise((r) => setTimeout(r, 700));

      const o = {
        orderId: makeId(),
        status: 'Placed',
        paymentMode: payload.paymentMethod || 'COD',
        items: payload.items,
        subtotal: payload.subtotal,
        deliveryFee: payload.deliveryFee,
        tax: payload.tax,
        total: payload.total,
        address: payload.selectedAddress,
        createdAt: Date.now(),
      };

      addOrder?.(o);
      await clearCart?.();

      setCheckoutVisible(false);

      if (navigation?.navigate) {
        navigation.navigate('OrderSuccessScreen', { order: o });
      }
    } catch (e) {
      const o = {
        orderId: makeId(),
        status: 'Failed',
        paymentMode: payload.paymentMethod || 'COD',
        items: payload.items,
        subtotal: payload.subtotal,
        deliveryFee: payload.deliveryFee,
        tax: payload.tax,
        total: payload.total,
        address: payload.selectedAddress,
        createdAt: Date.now(),
      };

      addOrder?.(o);

      setCheckoutVisible(false);
      navigation.navigate('OrderFailedScreen', { order: o });
    } finally {
      setPlacing(false);
    }
  };

  const ItemRow = ({ item }) => {
    const q = getQty(item);
    const img = getImg(item);

    return (
      <View style={styles.itemCard}>
        <View style={styles.itemLeft}>
          <View style={styles.imgWrap}>
            {img ? (
              <Image source={{ uri: img }} style={styles.img} />
            ) : (
              <Icon name="image-outline" size={22} color="#9A9A9A" />
            )}
          </View>

          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.itemName} numberOfLines={2}>
              {getName(item)}
            </Text>
            <Text style={styles.itemSub}>₹{getPrice(item).toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.rightCol}>
          <TouchableOpacity activeOpacity={0.9} style={styles.trashBtn} onPress={() => askRemove(item)}>
            <Icon name="trash-outline" size={18} color={t.c.danger} />
          </TouchableOpacity>

          <View style={styles.qtyRow}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => decrementItem?.(item)}
              style={styles.qtyBtn}
            >
              <Icon name="remove" size={16} color={t.c.text} />
            </TouchableOpacity>

            <Text style={styles.qtyVal}>{q}</Text>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => incrementItem?.(item)}
              style={[styles.qtyBtn, styles.qtyBtnPri]}
            >
              <Icon name="add" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="chevron-back" size={22} color={t.c.text} />
        </TouchableOpacity>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.hTitle}>Cart</Text>
          <Text style={styles.hSub}>{cartItems.length} items</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
          style={styles.iconBtn}
        >
          <Icon name="home-outline" size={20} color={t.c.text} />
        </TouchableOpacity>
      </View>

      {placing && (
        <View style={styles.topLoader}>
          <ActivityIndicator size="small" color={t.c.pri} />
          <Text style={styles.topLoaderText}>Placing order...</Text>
        </View>
      )}

      <FlatList
        data={cartItems}
        keyExtractor={(x, i) => String(x?.id ?? i)}
        renderItem={ItemRow}
        contentContainerStyle={{ padding: 16, paddingBottom: 160 }}
        ListHeaderComponent={
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('AddressSelectScreen')}
            style={styles.addrCard}
          >
            <View style={styles.addrIcon}>
              <Icon name="location-outline" size={18} color={t.c.pri} />
            </View>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.addrK}>Delivery Address</Text>
              <Text style={[styles.addrV, !selectedAddress && { color: t.c.sub }]} numberOfLines={2}>
                {addrLine}
              </Text>
            </View>
            <Icon name="chevron-forward" size={18} color="#8E8E8E" />
          </TouchableOpacity>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="cart-outline" size={34} color={t.c.pri} />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySub}>Add some items to continue.</Text>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.emptyCta}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
            >
              <Text style={styles.emptyCtaText}>Shop now</Text>
              <Icon name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        }
      />

      {cartItems.length > 0 ? (
        <View style={styles.footer}>
          <View style={styles.sumCard}>
            <View style={styles.sumRow}>
              <Text style={styles.sumK}>Subtotal</Text>
              <Text style={styles.sumV}>₹{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.sumRow}>
              <Text style={styles.sumK}>Delivery Fee</Text>
              <Text style={styles.sumV}>₹{Number(deliveryFee).toFixed(2)}</Text>
            </View>
            <View style={styles.sumRow}>
              <Text style={styles.sumK}>Tax ({taxPercent}%)</Text>
              <Text style={styles.sumV}>₹{tax.toFixed(2)}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalK}>Total</Text>
              <Text style={styles.totalV}>₹{total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.cta, (!selectedAddress || placing) && { opacity: 0.65 }]}
              onPress={() => setCheckoutVisible(true)}
              disabled={placing}
            >
              <Text style={styles.ctaText}>Checkout</Text>
              <Icon name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>

            {!selectedAddress ? (
              <Text style={styles.hint}>Select address to place order.</Text>
            ) : null}
          </View>
        </View>
      ) : null}

      <CheckoutSheet
        visible={checkoutVisible}
        onClose={() => setCheckoutVisible(false)}
        items={cartItems}
        deliveryFee={deliveryFee}
        taxPercent={taxPercent}
        selectedAddress={selectedAddress}
        onOpenAddressSelect={() => {
          setCheckoutVisible(false);
          navigation.navigate('AddressSelectScreen');
        }}
        placing={placing}
        onPlaceOrder={(payload) => placeOrder(payload)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: t.c.bg,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },
  hSub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: t.c.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },

  topLoader: {
    marginHorizontal: 16,
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: t.c.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  topLoaderText: { fontSize: 12, fontWeight: '900', color: t.c.sub },

  addrCard: {
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: t.c.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  addrIcon: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addrK: { fontSize: 12, fontWeight: '900', color: t.c.sub },
  addrV: { marginTop: 6, fontSize: 12, fontWeight: '900', color: t.c.text, lineHeight: 18 },

  itemCard: {
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: t.c.line,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 10 },

  imgWrap: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#EEF1F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    overflow: 'hidden',
  },
  img: { width: '100%', height: '100%', resizeMode: 'cover' },

  itemName: { fontSize: 13, fontWeight: '900', color: t.c.text },
  itemSub: { marginTop: 6, fontSize: 12, fontWeight: '800', color: t.c.sub },

  rightCol: { alignItems: 'flex-end', justifyContent: 'center' },
  trashBtn: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: t.c.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: '#F3F4F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnPri: { backgroundColor: t.c.pri },
  qtyVal: { marginHorizontal: 10, fontSize: 14, fontWeight: '900', color: t.c.text },

  empty: {
    marginTop: 40,
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: t.c.line,
    alignItems: 'center',
  },
  emptyTitle: { marginTop: 10, fontSize: 16, fontWeight: '900', color: t.c.text },
  emptySub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub, textAlign: 'center' },
  emptyCta: {
    marginTop: 14,
    backgroundColor: t.c.pri,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  emptyCtaText: { color: '#fff', fontWeight: '900', fontSize: 14 },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10,
    backgroundColor: 'rgba(246,247,251,0.92)',
  },

  sumCard: {
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: t.c.line,
  },

  sumRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  sumK: { fontSize: 12, fontWeight: '900', color: t.c.sub },
  sumV: { fontSize: 12, fontWeight: '900', color: t.c.text },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: t.c.line,
  },
  totalK: { fontSize: 13, fontWeight: '900', color: t.c.text },
  totalV: { fontSize: 13, fontWeight: '900', color: t.c.text },

  cta: {
    marginTop: 14,
    backgroundColor: t.c.pri,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  ctaText: { color: '#fff', fontWeight: '900', fontSize: 14 },

  hint: { marginTop: 10, fontSize: 12, fontWeight: '800', color: t.c.sub, textAlign: 'center' },
});
