import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const t = {
  c: {
    bg: '#F6F7FB',
    card: '#FFFFFF',
    text: '#121212',
    sub: '#6A6A6A',
    line: '#E9ECF3',
    pri: '#18A957',
    priSoft: '#EAF8F1',
    blueSoft: '#EAF2FF',
    blue: '#2F6BFF',
    warnSoft: '#FFF4E5',
  },
};

export default function HelpScreen({ navigation }) {
  const supportPhone = '+91 98765 43210';
  const supportEmail = 'admin@pincodeapp.com';

  const [openId, setOpenId] = useState(null);

  const handleCall = () => Linking.openURL(`tel:${supportPhone}`);
  const handleEmail = () => Linking.openURL(`mailto:${supportEmail}`);

  const topics = useMemo(
    () => [
      {
        id: 't1',
        title: 'Track my order',
        icon: 'navigate-outline',
        ans: 'Go to Account → Orders. Tap an order to open details and tracking.',
      },
      {
        id: 't2',
        title: 'Payment not going through',
        icon: 'card-outline',
        ans: 'Check your internet, try again in 1–2 mins, or switch payment method/COD.',
      },
      {
        id: 't3',
        title: 'Refunds & returns',
        icon: 'refresh-outline',
        ans: 'If an item is missing/damaged, email support with your order id and photo.',
      },
      {
        id: 't4',
        title: 'Delivery timings',
        icon: 'time-outline',
        ans: 'Delivery usually takes 20–45 mins based on distance and store load.',
      },
      {
        id: 't5',
        title: 'Update delivery address',
        icon: 'location-outline',
        ans: 'Go to Account → Delivery Address. Add or set a default address.',
      },
    ],
    []
  );

  const toggle = (id) => setOpenId((p) => (p === id ? null : id));

  const Item = ({ item }) => {
    const isOpen = openId === item.id;

    return (
      <View style={styles.itemWrap}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => toggle(item.id)} style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.itemIcon}>
              <Icon name={item.icon} size={18} color={t.c.pri} />
            </View>
            <Text style={styles.itemText} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
          <Icon name={isOpen ? 'chevron-up' : 'chevron-forward'} size={18} color="#8E8E8E" />
        </TouchableOpacity>

        {isOpen ? (
          <View style={styles.answerWrap}>
            <Text style={styles.answerText}>{item.ans}</Text>
          </View>
        ) : null}
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
          <Text style={styles.hTitle}>Help & Support</Text>
          <Text style={styles.hSub}>We’re here to help you</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
          style={styles.iconBtn}
        >
          <Icon name="home-outline" size={20} color={t.c.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Icon name="help-circle-outline" size={22} color={t.c.pri} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Need assistance?</Text>
            <Text style={styles.heroSub}>Contact support or pick a topic below.</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>SuperAdmin Contact</Text>

          <View style={styles.row}>
            <Text style={styles.k}>Name</Text>
            <Text style={styles.v}>Surya Teja</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.k}>Email</Text>
            <TouchableOpacity activeOpacity={0.9} onPress={handleEmail} style={styles.linkPill}>
              <Icon name="mail-outline" size={14} color={t.c.blue} />
              <Text style={styles.linkText} numberOfLines={1}>
                {supportEmail}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity activeOpacity={0.9} style={styles.actionBtnSoft} onPress={handleCall}>
              <Icon name="call-outline" size={18} color={t.c.pri} />
              <Text style={styles.actionBtnTextSoft}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} style={styles.actionBtn} onPress={handleEmail}>
              <Icon name="mail-outline" size={18} color="#fff" />
              <Text style={styles.actionBtnText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Quick help</Text>
          <Text style={styles.sectionHint}>Most searched</Text>
        </View>

        <View style={styles.listCard}>
          {topics.map((x, idx) => (
            <View
              key={x.id}
              style={{
                borderBottomWidth: idx === topics.length - 1 ? 0 : 1,
                borderBottomColor: t.c.line,
              }}
            >
              <Item item={x} />
            </View>
          ))}
        </View>

        <View style={styles.tip}>
          <View style={styles.tipIcon}>
            <Icon name="information-circle-outline" size={18} color="#B26A00" />
          </View>
          <Text style={styles.tipText}>
            For faster resolution, include your order id and screenshot (if any) in the email.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.9} style={styles.cta} onPress={handleEmail}>
          <Text style={styles.ctaText}>Contact Support</Text>
          <Icon name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
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

  hero: {
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: t.c.line,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 2,
  },
  heroIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  heroTitle: { fontSize: 13, fontWeight: '900', color: t.c.text },
  heroSub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

  card: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: t.c.line,
  },
  cardTitle: { fontSize: 13, fontWeight: '900', color: t.c.text, marginBottom: 10 },

  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  k: { fontSize: 12, fontWeight: '900', color: t.c.sub },
  v: { fontSize: 12, fontWeight: '900', color: t.c.text },

  linkPill: {
    maxWidth: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: t.c.blueSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  linkText: { fontSize: 12, fontWeight: '900', color: t.c.blue },

  actionsRow: { flexDirection: 'row', gap: 10, marginTop: 6 },
  actionBtnSoft: {
    flex: 1,
    backgroundColor: t.c.priSoft,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  actionBtnTextSoft: { fontSize: 13, fontWeight: '900', color: t.c.pri },
  actionBtn: {
    flex: 1,
    backgroundColor: t.c.pri,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  actionBtnText: { fontSize: 13, fontWeight: '900', color: '#fff' },

  sectionHead: {
    marginTop: 14,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  sectionTitle: { fontSize: 13, fontWeight: '900', color: t.c.text },
  sectionHint: { fontSize: 12, fontWeight: '800', color: t.c.sub },

  listCard: {
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: t.c.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: t.c.line,
    overflow: 'hidden',
  },

  itemWrap: {},
  item: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 10 },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  itemText: { fontSize: 13, fontWeight: '900', color: t.c.text },

  answerWrap: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    marginTop: -4,
  },
  answerText: {
    fontSize: 12,
    fontWeight: '800',
    color: t.c.sub,
    lineHeight: 18,
  },

  tip: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: t.c.warnSoft,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderWidth: 1,
    borderColor: '#FFE2B8',
  },
  tipIcon: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: '#FFE8C2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  tipText: { flex: 1, fontSize: 12, fontWeight: '800', color: '#7A4A00', lineHeight: 18 },

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
  cta: {
    backgroundColor: t.c.pri,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  ctaText: { color: '#fff', fontWeight: '900', fontSize: 14 },
});
