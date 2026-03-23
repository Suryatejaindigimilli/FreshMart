import React, { createContext, useContext, useRef, useState } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';

const Ctx = createContext({ show: () => {} });

export function ToastProvider({ children }) {
  const [m, setM] = useState(null);
  const y = useRef(new Animated.Value(30)).current;
  const o = useRef(new Animated.Value(0)).current;
  const r = useRef(null);

  const show = (text, type = 'ok') => {
    setM({ text, type });
    if (r.current) clearTimeout(r.current);

    Animated.parallel([
      Animated.timing(o, { toValue: 1, duration: 180, useNativeDriver: true }),
      Animated.timing(y, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start();

    r.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(o, { toValue: 0, duration: 180, useNativeDriver: true }),
        Animated.timing(y, { toValue: 30, duration: 180, useNativeDriver: true }),
      ]).start(() => setM(null));
    }, 1600);
  };

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      {m ? (
        <Animated.View style={[s.w, { opacity: o, transform: [{ translateY: y }] }]}>
          <View style={[s.b, m.type === 'err' ? s.err : s.ok]}>
            <Text style={s.t}>{m.text}</Text>
          </View>
        </Animated.View>
      ) : null}
    </Ctx.Provider>
  );
}

export function useToast() {
  return useContext(Ctx);
}

const s = StyleSheet.create({
  w: { position: 'absolute', left: 16, right: 16, bottom: 18, zIndex: 999 },
  b: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 14 },
  ok: { backgroundColor: '#121212' },
  err: { backgroundColor: '#b00020' },
  t: { color: '#fff', fontWeight: '900' },
});
