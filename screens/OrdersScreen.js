import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrders } from '../context/OrdersContext';

const t = {
  c: {
    bg: '#F6F7FB',
    card: '#FFFFFF',
    text: '#121212',
    sub: '#6A6A6A',
    pri: '#18A957',
    priSoft: '#EAF8F1',
    danger: '#FF3B30',
    dangerSoft: '#FFF1F3',
  },
};

export default function OrdersScreen({ navigation }) {
  const { orders } = useOrders();

  const data = useMemo(() => orders || [], [orders]);

  const pillStyle = (s) => {
    if (s === 'FAILED') return { bg: t.c.dangerSoft, fg: t.c.danger, label: 'Failed' };
    return { bg: t.c.priSoft, fg: t.c.pri, label: 'Placed' };
  };

  const renderItem = ({ item }) => {
    const p = pillStyle(item.status);
    const when = item.createdAt ? new Date(item.createdAt).toLocaleString() : '';

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => navigation.navigate('OrderDetailsScreen', { orderId: item.id })}
      >
        <View style={styles.topRow}>
          <View style={[styles.pill, { backgroundColor: p.bg }]}>
            <Text style={[styles.pillText, { color: p.fg }]}>{p.label}</Text>
          </View>
          <Text style={styles.id} numberOfLines={1}>{item.id}</Text>
          <Icon name="chevron-forward" size={18} color="#111" />
        </View>

        <Text style={styles.shop} numberOfLines={1}>{item.shopName || 'Shop'}</Text>
        <Text style={styles.sub} numberOfLines={1}>
          {item.items?.length || 0} items • ₹{Number(item.total || 0).toFixed(2)}
        </Text>
        <Text style={styles.time} numberOfLines={1}>{when}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.85}>
          <Icon name="chevron-back" size={22} color={t.c.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Orders</Text>
        <View style={{ width: 40 }} />
      </View>

      {data.length === 0 ? (
        <View style={styles.empty}>
          <Icon name="receipt-outline" size={34} color={t.c.pri} />
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySub}>Place an order to see it here.</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(x) => String(x.id)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: t.c.bg },
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8, flexDirection: 'row', alignItems: 'center' },
  iconBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: t.c.card, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '900', color: t.c.text },

  card: { backgroundColor: t.c.card, borderRadius: 18, padding: 14, marginBottom: 12 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  pillText: { fontSize: 11, fontWeight: '900' },
  id: { flex: 1, fontSize: 12, fontWeight: '900', color: '#333' },

  shop: { marginTop: 10, fontSize: 14, fontWeight: '900', color: t.c.text },
  sub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },
  time: { marginTop: 6, fontSize: 11, fontWeight: '800', color: '#8E8E8E' },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyTitle: { marginTop: 10, fontSize: 16, fontWeight: '900', color: t.c.text },
  emptySub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },
});
