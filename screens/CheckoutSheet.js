// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// export default function CheckoutSheet({
//   visible,
//   onClose,
//   onPlaceOrder,
//   total = 0,
//   placing = false,
// }) {
//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <View style={styles.overlay}>
//         <View style={styles.sheet}>
//           <View style={styles.header}>
//             <Text style={styles.title}>Checkout</Text>
//             <TouchableOpacity onPress={onClose} disabled={placing}>
//               <Icon name="close" size={20} color="#333" />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity style={styles.row} activeOpacity={0.8} disabled={placing}>
//             <Text style={styles.label}>Delivery</Text>
//             <Text style={styles.value}>Standard</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.row} activeOpacity={0.8} disabled={placing}>
//             <Text style={styles.label}>Payment</Text>
//             <Text style={styles.value}>COD</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.row} activeOpacity={0.8} disabled={placing}>
//             <Text style={styles.label}>Promo Code</Text>
//             <Text style={styles.value}>None</Text>
//           </TouchableOpacity>

//           <View style={[styles.row, { borderBottomWidth: 0 }]}>
//             <Text style={styles.label}>Total Cost</Text>
//             <Text style={styles.value}>₹{Number(total).toFixed(2)}</Text>
//           </View>

//           <Text style={styles.terms}>
//             By placing an order you agree to our{' '}
//             <Text style={styles.bold}>Terms And Conditions</Text>
//           </Text>

//           <TouchableOpacity
//             style={[styles.button, placing && { opacity: 0.7 }]}
//             onPress={onPlaceOrder}
//             disabled={placing}
//             activeOpacity={0.85}
//           >
//             <Text style={styles.buttonText}>{placing ? 'Placing...' : 'Place Order'}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.25)' },
//   sheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
//   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
//   title: { fontSize: 18, fontWeight: 'bold' },
//   row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderColor: '#eee' },
//   label: { fontSize: 15, color: '#444' },
//   value: { fontWeight: '700', fontSize: 15 },
//   terms: { fontSize: 12, color: '#888', marginTop: 10 },
//   bold: { fontWeight: '700', color: '#000' },
//   button: { backgroundColor: '#2e7d32', padding: 14, borderRadius: 10, marginTop: 16, alignItems: 'center' },
//   buttonText: { color: '#fff', fontWeight: 'bold' },
// });
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const t = {
  c: {
    bg: '#F6F7FB',
    card: '#FFFFFF',
    text: '#121212',
    sub: '#6A6A6A',
    line: '#E9ECF3',
    pri: '#18A957',
    priSoft: '#EAF8F1',
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

export default function CheckoutSheet({
  visible,
  onClose,
  placing = false,

  items = [],
  deliveryFee = 0,
  taxPercent = 0,

  selectedAddress = null,
  onOpenAddressSelect,

  onPlaceOrder,
}) {
  const [promo, setPromo] = useState('');
  const [pay, setPay] = useState('COD');

  const subtotal = useMemo(() => {
    return items.reduce((s, it) => s + getPrice(it) * getQty(it), 0);
  }, [items]);

  const tax = useMemo(() => {
    const p = Number(taxPercent) || 0;
    return (subtotal + Number(deliveryFee || 0)) * (p / 100);
  }, [subtotal, deliveryFee, taxPercent]);

  const total = useMemo(() => {
    return subtotal + Number(deliveryFee || 0) + tax;
  }, [subtotal, deliveryFee, tax]);

  const addrLine = useMemo(() => {
    if (!selectedAddress) return 'Select address';
    const a = selectedAddress;
    const l1 = `${a.house_number || ''}${a.house_number ? ', ' : ''}${a.street_address || ''}`.trim();
    const l2 = `${a.city || ''}${a.city ? ', ' : ''}${a.state || ''}`.trim();
    const tag = a.address_type ? ` (${a.address_type})` : '';
    return `${(l1 || 'Address')}${l2 ? `, ${l2}` : ''}${tag}`;
  }, [selectedAddress]);

  const place = () => {
    if (!selectedAddress) return;

    const payload = {
      items,
      selectedAddress,
      promoCode: promo.trim(),
      paymentMethod: pay,
      subtotal,
      deliveryFee: Number(deliveryFee || 0),
      tax,
      total,
      taxPercent: Number(taxPercent || 0),
    };

    onPlaceOrder?.(payload);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Checkout</Text>
            <TouchableOpacity onPress={onClose} disabled={placing} style={styles.iconBtn}>
              <Icon name="close" size={18} color={t.c.text} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            disabled={placing}
            onPress={onOpenAddressSelect}
            style={styles.row}
          >
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.k}>Delivery Address</Text>
              <Text style={[styles.v, !selectedAddress && { color: t.c.sub }]} numberOfLines={2}>
                {addrLine}
              </Text>
            </View>
            <Icon name="chevron-forward" size={18} color="#8E8E8E" />
          </TouchableOpacity>

          <View style={styles.row2}>
            <Text style={styles.k}>Promo Code</Text>
            <View style={styles.promoWrap}>
              <TextInput
                value={promo}
                onChangeText={setPromo}
                placeholder="Enter code"
                placeholderTextColor="#8E8E8E"
                style={styles.promoInput}
                editable={!placing}
              />
              <View style={styles.pillSoft}>
                <Icon name="pricetag-outline" size={14} color={t.c.pri} />
                <Text style={styles.pillSoftText}>Apply</Text>
              </View>
            </View>
          </View>

          <View style={styles.row2}>
            <Text style={styles.k}>Payment Method</Text>

            <View style={styles.payRow}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setPay('COD')}
                disabled={placing}
                style={[styles.payPill, pay === 'COD' ? styles.payOn : styles.payOff]}
              >
                <Text style={[styles.payText, pay === 'COD' ? styles.payTextOn : styles.payTextOff]}>COD</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setPay('UPI')}
                disabled={placing}
                style={[styles.payPill, pay === 'UPI' ? styles.payOn : styles.payOff]}
              >
                <Text style={[styles.payText, pay === 'UPI' ? styles.payTextOn : styles.payTextOff]}>UPI</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sep} />

          <Text style={styles.secTitle}>Items</Text>
          <ScrollView style={{ maxHeight: 170 }} showsVerticalScrollIndicator={false}>
            {items.map((it, idx) => {
              const q = getQty(it);
              const p = getPrice(it);
              return (
                <View key={String(it.id ?? idx)} style={styles.itemRow}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {getName(it)} x{q}
                  </Text>
                  <Text style={styles.itemPrice}>₹{(p * q).toFixed(2)}</Text>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.sep} />

          <View style={styles.sumRow}>
            <Text style={styles.sumK}>Subtotal</Text>
            <Text style={styles.sumV}>₹{subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.sumRow}>
            <Text style={styles.sumK}>Delivery Fee</Text>
            <Text style={styles.sumV}>₹{Number(deliveryFee || 0).toFixed(2)}</Text>
          </View>

          <View style={styles.sumRow}>
            <Text style={styles.sumK}>Tax ({Number(taxPercent || 0)}%)</Text>
            <Text style={styles.sumV}>₹{tax.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalK}>Total</Text>
            <Text style={styles.totalV}>₹{total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            disabled={placing || !selectedAddress || items.length === 0}
            onPress={place}
            style={[
              styles.cta,
              (placing || !selectedAddress || items.length === 0) && { opacity: 0.6 },
            ]}
          >
            <Text style={styles.ctaText}>{placing ? 'Placing...' : 'Place Order'}</Text>
            <Icon name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>

          {!selectedAddress ? (
            <Text style={styles.hint}>Select a delivery address to place order.</Text>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.25)' },

  sheet: {
    backgroundColor: t.c.bg,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 16,
  },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 16, fontWeight: '900', color: t.c.text },

  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: t.c.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: t.c.line,
  },

  row: {
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: t.c.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  row2: {
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: t.c.line,
    marginTop: 10,
  },

  k: { fontSize: 12, fontWeight: '900', color: t.c.sub },
  v: { marginTop: 6, fontSize: 12, fontWeight: '900', color: t.c.text, lineHeight: 18 },

  promoWrap: { marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 10 },
  promoInput: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    fontWeight: '800',
    color: t.c.text,
  },

  pillSoft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: t.c.priSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  pillSoftText: { fontSize: 12, fontWeight: '900', color: t.c.pri },

  payRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  payPill: { flex: 1, borderRadius: 16, paddingVertical: 12, alignItems: 'center', borderWidth: 1 },
  payOn: { backgroundColor: t.c.pri, borderColor: t.c.pri },
  payOff: { backgroundColor: t.c.priSoft, borderColor: t.c.line },
  payText: { fontSize: 13, fontWeight: '900' },
  payTextOn: { color: '#fff' },
  payTextOff: { color: t.c.pri },

  sep: { height: 1, backgroundColor: t.c.line, marginVertical: 12 },

  secTitle: { fontSize: 13, fontWeight: '900', color: t.c.text, marginBottom: 8 },

  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  itemName: { flex: 1, paddingRight: 10, fontSize: 12, fontWeight: '800', color: t.c.text },
  itemPrice: { fontSize: 12, fontWeight: '900', color: t.c.text },

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
