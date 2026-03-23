// import React, { useMemo } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useOrders } from '../context/OrdersContext';

// const t = {
//   c: {
//     bg: '#F6F7FB',
//     card: '#FFFFFF',
//     text: '#121212',
//     sub: '#6A6A6A',
//     pri: '#18A957',
//     priSoft: '#EAF8F1',
//     danger: '#FF3B30',
//     dangerSoft: '#FFF1F3',
//     line: '#E9ECF3',
//   },
// };

// export default function OrderDetailsScreen({ navigation, route }) {
//   const { orderId } = route.params || {};
//   const { getOrderById } = useOrders();

//   const order = useMemo(() => (orderId ? getOrderById(orderId) : null), [orderId, getOrderById]);

//   const pill = (s) => {
//     if (s === 'FAILED') return { bg: t.c.dangerSoft, fg: t.c.danger, label: 'Failed' };
//     return { bg: t.c.priSoft, fg: t.c.pri, label: 'Placed' };
//   };

//   if (!order) {
//     return (
//       <SafeAreaView style={styles.safe}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.85}>
//             <Icon name="chevron-back" size={22} color={t.c.text} />
//           </TouchableOpacity>
//           <Text style={styles.title}>Order Details</Text>
//           <View style={{ width: 40 }} />
//         </View>

//         <View style={styles.empty}>
//           <Icon name="alert-circle-outline" size={34} color={t.c.danger} />
//           <Text style={styles.emptyTitle}>Order not found</Text>
//           <Text style={styles.emptySub}>This order may have been cleared.</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   const p = pill(order.status);
//   const when = order.createdAt ? new Date(order.createdAt).toLocaleString() : '';

//   return (
//     <SafeAreaView style={styles.safe}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.85}>
//           <Icon name="chevron-back" size={22} color={t.c.text} />
//         </TouchableOpacity>
//         <Text style={styles.title}>Order Details</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('MainTabs')} style={styles.iconBtn} activeOpacity={0.85}>
//           <Icon name="home-outline" size={20} color={t.c.text} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
//         <View style={styles.card}>
//           <View style={styles.topRow}>
//             <View style={[styles.pill, { backgroundColor: p.bg }]}>
//               <Text style={[styles.pillText, { color: p.fg }]}>{p.label}</Text>
//             </View>
//             <Text style={styles.id} numberOfLines={1}>{order.id}</Text>
//           </View>

//           <Text style={styles.shop} numberOfLines={1}>{order.shopName || 'Shop'}</Text>
//           <Text style={styles.time}>{when}</Text>

//           <View style={styles.line} />

//           {order.items.map((it, idx) => (
//             <View key={idx} style={styles.itemRow}>
//               <Text style={styles.qty}>x{it.qty}</Text>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.itemName} numberOfLines={1}>{it.name}</Text>
//                 {!!it.quantity && <Text style={styles.itemSub} numberOfLines={1}>{it.quantity}</Text>}
//               </View>
//               <Text style={styles.itemPrice}>₹{Number(it.price * it.qty).toFixed(2)}</Text>
//             </View>
//           ))}

//           <View style={styles.line} />

//           <View style={styles.chargeRow}>
//             <Text style={styles.chargeLabel}>Store Charges</Text>
//             <Text style={styles.chargeValue}>₹{Number(order.charges?.store || 0).toFixed(2)}</Text>
//           </View>
//           <View style={styles.chargeRow}>
//             <Text style={styles.chargeLabel}>Distance Charges</Text>
//             <Text style={styles.chargeValue}>₹{Number(order.charges?.distance || 0).toFixed(2)}</Text>
//           </View>
//           <View style={styles.chargeRow}>
//             <Text style={styles.chargeLabel}>GST</Text>
//             <Text style={styles.chargeValue}>₹{Number(order.charges?.gst || 0).toFixed(2)}</Text>
//           </View>

//           <View style={[styles.chargeRow, { marginTop: 10 }]}>
//             <Text style={styles.totalLabel}>Total</Text>
//             <Text style={styles.totalValue}>₹{Number(order.total || 0).toFixed(2)}</Text>
//           </View>

//           <View style={styles.line} />

//           <View style={styles.chargeRow}>
//             <Text style={styles.payLabel}>Payment Mode</Text>
//             <Text style={styles.payValue}>{order.paymentMode || 'COD'}</Text>
//           </View>

//           {!!order.address && (
//             <>
//               <View style={styles.line} />
//               <Text style={styles.addr}>{order.address}</Text>
//             </>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: t.c.bg },

//   header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8, flexDirection: 'row', alignItems: 'center' },
//   iconBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: t.c.card, alignItems: 'center', justifyContent: 'center' },
//   title: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '900', color: t.c.text },

//   card: { backgroundColor: t.c.card, borderRadius: 18, padding: 14 },
//   topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
//   pillText: { fontSize: 11, fontWeight: '900' },
//   id: { flex: 1, fontSize: 12, fontWeight: '900', color: '#333' },

//   shop: { marginTop: 10, fontSize: 14, fontWeight: '900', color: t.c.text },
//   time: { marginTop: 4, fontSize: 11, fontWeight: '800', color: '#8E8E8E' },

//   line: { height: 1, backgroundColor: t.c.line, marginVertical: 12 },

//   itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
//   qty: { width: 34, textAlign: 'center', fontWeight: '900', color: '#333' },
//   itemName: { fontWeight: '900', color: t.c.text },
//   itemSub: { marginTop: 2, fontSize: 11, fontWeight: '800', color: t.c.sub },
//   itemPrice: { fontWeight: '900', color: t.c.text },

//   chargeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
//   chargeLabel: { fontSize: 12, fontWeight: '800', color: t.c.sub },
//   chargeValue: { fontSize: 12, fontWeight: '900', color: t.c.text },

//   totalLabel: { fontSize: 14, fontWeight: '900', color: t.c.text },
//   totalValue: { fontSize: 14, fontWeight: '900', color: t.c.text },

//   payLabel: { fontSize: 12, fontWeight: '800', color: t.c.sub },
//   payValue: { fontSize: 12, fontWeight: '900', color: t.c.text },

//   addr: { fontSize: 12, fontWeight: '800', color: '#555' },

//   empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
//   emptyTitle: { marginTop: 10, fontSize: 16, fontWeight: '900', color: t.c.text },
//   emptySub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },
// });


import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrders } from '../context/OrdersContext';

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

export default function OrderDetailsScreen({ navigation, route }) {
  const { getOrderById } = useOrders();
  const orderId = route?.params?.orderId || '';
  const order = getOrderById(orderId);

  const total = useMemo(() => Number(order?.total || 0), [order]);

  if (!order) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.9} onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={22} color={t.c.text} />
          </TouchableOpacity>
          <Text style={styles.hTitle}>Order Details</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>Order not found</Text>
          <Text style={styles.notFoundSub}>Please open from Orders list.</Text>
          <TouchableOpacity style={styles.cta} activeOpacity={0.9} onPress={() => navigation.replace('OrdersListScreen')}>
            <Text style={styles.ctaText}>Go to Orders</Text>
            <Icon name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const dt = order.createdAt ? new Date(order.createdAt) : null;
  const when = dt ? dt.toLocaleString() : '';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.9} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={22} color={t.c.text} />
        </TouchableOpacity>

        <Text style={styles.hTitle}>Order Details</Text>

        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.9} onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}>
          <Icon name="home-outline" size={20} color={t.c.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.topRow}>
            <View style={[styles.pill, order.status === 'PLACED' ? styles.pillOk : styles.pillBad]}>
              <Text style={[styles.pillText, order.status === 'PLACED' ? styles.pillTextOk : styles.pillTextBad]}>
                {order.status === 'PLACED' ? 'Placed' : 'Failed'}
              </Text>
            </View>
            <Text style={styles.oid} numberOfLines={1}>{order.id}</Text>
          </View>

          <Text style={styles.meta}>{when}</Text>
          {!!order.shopName && <Text style={styles.meta}>Shop: {order.shopName}</Text>}
          {!!order.address && <Text style={styles.addr} numberOfLines={3}>{order.address}</Text>}
        </View>

        <View style={styles.card}>
          <Text style={styles.secTitle}>Items</Text>

          {(order.items || []).map((it, i) => (
            <View key={`${it.id}-${i}`} style={styles.itemRow}>
              <Text style={styles.qty}>x{Number(it.qty || 0)}</Text>
              <Text style={styles.itemName} numberOfLines={2}>{it.name}</Text>
              <Text style={styles.itemPrice}>₹{(Number(it.price || 0) * Number(it.qty || 0)).toFixed(2)}</Text>
            </View>
          ))}

          <View style={styles.line} />

          <View style={styles.kv}>
            <Text style={styles.k}>Payment</Text>
            <Text style={styles.v}>{order.paymentMode || 'COD'}</Text>
          </View>

          <View style={styles.kv}>
            <Text style={styles.k}>Total</Text>
            <Text style={styles.vBig}>₹{total.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.cta} activeOpacity={0.9} onPress={() => navigation.replace('OrdersListScreen')}>
          <Text style={styles.ctaText}>Back to Orders</Text>
          <Icon name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: t.c.bg, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },

  header: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: {
    width: 40, height: 40, borderRadius: 14, backgroundColor: t.c.card,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10, elevation: 2,
  },
  hTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },

  card: { marginTop: 12, backgroundColor: t.c.card, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: t.c.line },

  topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  pillOk: { backgroundColor: t.c.priSoft },
  pillBad: { backgroundColor: t.c.dangerSoft },
  pillText: { fontSize: 11, fontWeight: '900' },
  pillTextOk: { color: t.c.pri },
  pillTextBad: { color: t.c.danger },

  oid: { flex: 1, fontSize: 12, fontWeight: '900', color: t.c.text },
  meta: { marginTop: 8, fontSize: 12, fontWeight: '800', color: t.c.sub },
  addr: { marginTop: 10, fontSize: 12, fontWeight: '800', color: '#555', lineHeight: 18 },

  secTitle: { fontSize: 13, fontWeight: '900', color: t.c.text, marginBottom: 10 },

  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  qty: { width: 34, textAlign: 'center', fontSize: 12, fontWeight: '900', color: t.c.sub },
  itemName: { flex: 1, fontSize: 12, fontWeight: '900', color: t.c.text, paddingRight: 10 },
  itemPrice: { fontSize: 12, fontWeight: '900', color: t.c.text },

  line: { height: 1, backgroundColor: t.c.line, marginVertical: 10 },

  kv: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  k: { fontSize: 12, fontWeight: '900', color: t.c.sub },
  v: { fontSize: 12, fontWeight: '900', color: t.c.text },
  vBig: { fontSize: 15, fontWeight: '900', color: t.c.text },

  cta: { marginTop: 14, backgroundColor: t.c.pri, paddingVertical: 14, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10 },
  ctaText: { color: '#fff', fontWeight: '900', fontSize: 14 },

  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  notFoundTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },
  notFoundSub: { marginTop: 8, fontSize: 12, fontWeight: '800', color: t.c.sub, textAlign: 'center' },
});
