import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePrefs } from '../context/PrefsContext';

export default function SettingsScreen() {
  const { p, setP } = usePrefs();

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.c}>
        <Text style={s.h}>Settings</Text>

        <View style={s.row}>
          <Text style={s.t}>Dark mode</Text>
          <Switch value={p.dark} onValueChange={(v) => setP(x => ({ ...x, dark: v }))} />
        </View>

        <View style={s.row}>
          <Text style={s.t}>Notifications</Text>
          <Switch value={p.notif} onValueChange={(v) => setP(x => ({ ...x, notif: v }))} />
        </View>

        <View style={s.row2}>
          <Text style={s.t}>Language</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity style={[s.ch, p.lang === 'en' ? s.cha : null]} onPress={() => setP(x => ({ ...x, lang: 'en' }))}>
              <Text style={[s.cht, p.lang === 'en' ? s.chta : null]}>EN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.ch, p.lang === 'te' ? s.cha : null]} onPress={() => setP(x => ({ ...x, lang: 'te' }))}>
              <Text style={[s.cht, p.lang === 'te' ? s.chta : null]}>TE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F6F7FB' },
  c: { padding: 16 },
  h: { fontSize: 18, fontWeight: '900', color: '#121212', marginBottom: 12 },
  row: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row2: { backgroundColor: '#fff', borderRadius: 16, padding: 14 },
  t: { fontWeight: '900', color: '#121212' },
  ch: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14, borderWidth: 1, borderColor: '#E9ECF3' },
  cha: { backgroundColor: '#EAF8F1', borderColor: '#18A957' },
  cht: { fontWeight: '900', color: '#121212' },
  chta: { color: '#18A957' },
});
