import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const t = {
  c: {
    bg: '#F6F7FB',
    card: '#FFFFFF',
    text: '#121212',
    sub: '#6A6A6A',
    line: '#E9ECF3',
    pri: '#18A957',
  },
  r: { lg: 20 },
};

export default function EditAccountScreen({ route, navigation }) {
  const init = route?.params?.profile || { name: '', email: '', phone: '' };

  const [name, setName] = useState(init.name || '');
  const [email, setEmail] = useState(init.email || '');
  const [phone, setPhone] = useState(init.phone || '');

  const save = async () => {
    try {
      const x = { name: name.trim(), email: email.trim(), phone: phone.trim() };
      await AsyncStorage.setItem('profile', JSON.stringify(x));
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const dis = name.trim().length === 0 || email.trim().length === 0;

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
          <View style={s.headerRow}>
            <TouchableOpacity style={s.backBtn} activeOpacity={0.85} onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} color={t.c.text} />
            </TouchableOpacity>
            <Text style={s.headerTitle}>Edit Account</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={s.card}>
            <Text style={s.lbl}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter name"
              placeholderTextColor="#9AA0A6"
              style={s.ip}
            />

            <Text style={[s.lbl, { marginTop: 12 }]}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              placeholderTextColor="#9AA0A6"
              autoCapitalize="none"
              keyboardType="email-address"
              style={s.ip}
            />

            <Text style={[s.lbl, { marginTop: 12 }]}>Phone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone"
              placeholderTextColor="#9AA0A6"
              keyboardType="phone-pad"
              style={s.ip}
            />

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={save}
              disabled={dis}
              style={[s.saveBtn, dis ? { opacity: 0.5 } : null]}
            >
              <Text style={s.saveTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: t.c.bg },
  container: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 18 },

  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  headerTitle: { fontSize: 18, fontWeight: '900', color: t.c.text },

  backBtn: {
    width: 40, height: 40, borderRadius: 14, backgroundColor: t.c.card,
    alignItems: 'center', justifyContent: 'center', elevation: 2,
  },

  card: { backgroundColor: t.c.card, borderRadius: t.r.lg, padding: 14, elevation: 2 },

  lbl: { fontSize: 12, fontWeight: '900', color: t.c.sub, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 8 },

  ip: {
    height: 48,
    borderWidth: 1,
    borderColor: t.c.line,
    borderRadius: 14,
    paddingHorizontal: 12,
    backgroundColor: '#FAFAFA',
    color: t.c.text,
    fontWeight: '800',
  },

  saveBtn: { marginTop: 18, height: 50, borderRadius: 14, backgroundColor: t.c.pri, alignItems: 'center', justifyContent: 'center' },
  saveTxt: { color: '#fff', fontWeight: '900', fontSize: 14 },
});

