import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
  },
};

export default function AddressSelectScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const base = 'http://192.168.0.191:3000'; // <- keep same as your NewAddressScreen API

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch {
      return null;
    }
  };

  const fetchAddresses = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        setList([]);
        return;
      }

      const res = await axios.get(`${base}/delivery-addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const arr = Array.isArray(res.data) ? res.data : [];
      setList(arr);

      const def = arr.find((x) => x.default_address);
      if (def) setSelectedId(def.id);
    } catch {
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses(true);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAddresses(false);
    setRefreshing(false);
  };

  const pick = (a) => {
    setSelectedId(a.id);
    navigation.navigate({
      name: 'CartScreen',
      params: { selectedAddress: a },
      merge: true,
    });
  };

  const addNew = () => navigation.navigate('NewAddressScreen');

  const Row = ({ a }) => {
    const active = selectedId === a.id;

    const line1 = `${a.house_number || ''}${a.house_number ? ', ' : ''}${a.street_address || ''}`.trim();
    const line2 = `${a.city || ''}${a.city ? ', ' : ''}${a.state || ''}`.trim();

    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => pick(a)} style={[styles.card, active && styles.cardOn]}>
        <View style={styles.left}>
          <View style={[styles.radio, active && styles.radioOn]}>
            {active ? <Icon name="checkmark" size={14} color="#fff" /> : null}
          </View>

          <View style={{ flex: 1 }}>
            <View style={styles.topLine}>
              <Text style={styles.name} numberOfLines={1}>
                {a.full_name || 'Name'}
              </Text>

              <View style={styles.pills}>
                {a.address_type ? (
                  <View style={styles.pillSoft}>
                    <Text style={styles.pillSoftText}>{a.address_type}</Text>
                  </View>
                ) : null}
                {a.default_address ? (
                  <View style={styles.pill}>
                    <Text style={styles.pillText}>Default</Text>
                  </View>
                ) : null}
              </View>
            </View>

            <Text style={styles.phone}>{a.phone_number || ''}</Text>
            <Text style={styles.addr} numberOfLines={2}>
              {line1 || 'Address line'}
              {line2 ? `\n${line2}` : ''}
            </Text>
          </View>
        </View>

        <Icon name="chevron-forward" size={18} color="#8E8E8E" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="chevron-back" size={22} color={t.c.text} />
        </TouchableOpacity>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.hTitle}>Select Address</Text>
          <Text style={styles.hSub}>Choose delivery location</Text>
        </View>

        <TouchableOpacity activeOpacity={0.9} onPress={addNew} style={styles.iconBtn}>
          <Icon name="add" size={22} color={t.c.text} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={t.c.pri} />
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(x, i) => String(x.id ?? i)}
          renderItem={({ item }) => <Row a={item} />}
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Icon name="location-outline" size={26} color={t.c.pri} />
              <Text style={styles.emptyTitle}>No saved addresses</Text>
              <Text style={styles.emptySub}>Add one to continue checkout.</Text>

              <TouchableOpacity activeOpacity={0.9} onPress={addNew} style={styles.cta}>
                <Text style={styles.ctaText}>Add New Address</Text>
                <Icon name="arrow-forward" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          }
        />
      )}
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  card: {
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: t.c.line,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardOn: { borderColor: t.c.pri, shadowOpacity: 0.08, elevation: 3 },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 10 },
  radio: {
    width: 26,
    height: 26,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioOn: { backgroundColor: t.c.pri },

  topLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 13, fontWeight: '900', color: t.c.text, flex: 1, paddingRight: 10 },
  pills: { flexDirection: 'row', gap: 8 },
  pill: { backgroundColor: t.c.pri, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  pillText: { color: '#fff', fontWeight: '900', fontSize: 11 },
  pillSoft: { backgroundColor: t.c.priSoft, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  pillSoftText: { color: t.c.pri, fontWeight: '900', fontSize: 11 },

  phone: { marginTop: 6, fontSize: 12, fontWeight: '800', color: t.c.sub },
  addr: { marginTop: 6, fontSize: 12, fontWeight: '800', color: '#444', lineHeight: 18 },

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
  cta: {
    marginTop: 14,
    backgroundColor: t.c.pri,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ctaText: { color: '#fff', fontWeight: '900', fontSize: 14 },
});
