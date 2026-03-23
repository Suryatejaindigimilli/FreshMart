// import React, { useMemo } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useOrders } from '../context/OrdersContext';

// export default function OrdersListScreen() {
//   const nav = useNavigation();
//   const { orders } = useOrders();

//   const data = useMemo(() => {
//     const a = Array.isArray(orders) ? [...orders] : [];
//     a.sort((x, y) => (y?.createdAt || 0) - (x?.createdAt || 0));
//     return a;
//   }, [orders]);

//   return (
//     <View style={s.c}>
//       <Text style={s.h}>My Orders</Text>

//       <FlatList
//         data={data}
//         keyExtractor={(it) => String(it.id || it.orderId || it.createdAt)}
//         contentContainerStyle={{ paddingBottom: 24 }}
//         ListEmptyComponent={<Text style={s.e}>No orders yet.</Text>}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={s.card}
//             onPress={() => nav.navigate('OrderDetailsScreen', { order: item })}
//           >
//             <Text style={s.t}>{item.status || 'Placed'}</Text>
//             <Text style={s.sub}>Order ID: {item.id || item.orderId || '-'}</Text>
//             <Text style={s.sub}>Total: ₹{item.total ?? '-'}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const s = StyleSheet.create({
//   c: { flex: 1, backgroundColor: '#fff', padding: 16 },
//   h: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
//   e: { marginTop: 16, color: '#666' },
//   card: { padding: 14, borderWidth: 1, borderColor: '#eee', borderRadius: 12, marginBottom: 10 },
//   t: { fontSize: 15, fontWeight: '700' },
//   sub: { marginTop: 4, color: '#555' },
// });


import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, StatusBar } from 'react-native';
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

export default function OrdersListScreen({ navigation }) {
  const { orders } = useOrders();
  const [tab, setTab] = useState('PLACED'); // PLACED | FAILED

  const data = useMemo(() => orders.filter((x) => x.status === tab), [orders, tab]);

  const Item = ({ item }) => {
    const dt = item.createdAt ? new Date(item.createdAt) : null;
    const when = dt ? dt.toLocaleString() : '';

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => navigation.navigate('OrderDetailsScreen', { orderId: item.id })}
      >
        <View style={styles.topRow}>
          <View style={[styles.pill, item.status === 'PLACED' ? styles.pillOk : styles.pillBad]}>
            <Text style={[styles.pillText, item.status === 'PLACED' ? styles.pillTextOk : styles.pillTextBad]}>
              {item.status === 'PLACED' ? 'Placed' : 'Failed'}
            </Text>
          </View>
          <Text style={styles.id} numberOfLines={1}>{item.id}</Text>
        </View>

        <Text style={styles.meta} numberOfLines={1}>{when}</Text>

        <View style={styles.bottomRow}>
          <Text style={styles.count}>{item.items?.length || 0} items</Text>
          <Text style={styles.total}>₹{Number(item.total || 0).toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.9} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={22} color={t.c.text} />
        </TouchableOpacity>

        <Text style={styles.hTitle}>Orders</Text>

        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.9} onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}>
          <Icon name="home-outline" size={20} color={t.c.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => setTab('PLACED')} style={[styles.tab, tab === 'PLACED' && styles.tabOn]}>
          <Text style={[styles.tabText, tab === 'PLACED' && styles.tabTextOn]}>Placed</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} onPress={() => setTab('FAILED')} style={[styles.tab, tab === 'FAILED' && styles.tabOnBad]}>
          <Text style={[styles.tabText, tab === 'FAILED' && styles.tabTextOnBad]}>Failed</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(x) => x.id}
        renderItem={({ item }) => <Item item={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No {tab === 'PLACED' ? 'placed' : 'failed'} orders</Text>
            <Text style={styles.emptySub}>Place an order to see it here.</Text>
          </View>
        }
      />
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

  tabs: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6 },
  tab: { flex: 1, paddingVertical: 12, borderRadius: 16, backgroundColor: t.c.card, borderWidth: 1, borderColor: t.c.line, alignItems: 'center' },
  tabOn: { backgroundColor: t.c.priSoft, borderColor: '#CFEFDB' },
  tabOnBad: { backgroundColor: t.c.dangerSoft, borderColor: '#FFD1D6' },
  tabText: { fontSize: 13, fontWeight: '900', color: t.c.sub },
  tabTextOn: { color: t.c.pri },
  tabTextOnBad: { color: t.c.danger },

  card: { marginTop: 12, backgroundColor: t.c.card, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: t.c.line },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  pillOk: { backgroundColor: t.c.priSoft },
  pillBad: { backgroundColor: t.c.dangerSoft },
  pillText: { fontSize: 11, fontWeight: '900' },
  pillTextOk: { color: t.c.pri },
  pillTextBad: { color: t.c.danger },
  id: { flex: 1, fontSize: 12, fontWeight: '900', color: t.c.text },

  meta: { marginTop: 8, fontSize: 12, fontWeight: '800', color: t.c.sub },
  bottomRow: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  count: { fontSize: 12, fontWeight: '900', color: t.c.sub },
  total: { fontSize: 14, fontWeight: '900', color: t.c.text },

  empty: { padding: 24, alignItems: 'center' },
  emptyTitle: { fontSize: 14, fontWeight: '900', color: t.c.text },
  emptySub: { marginTop: 6, fontSize: 12, fontWeight: '800', color: t.c.sub, textAlign: 'center' },
});
