import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { jget, jset } from './storage';

const K = 'prefs';
const Ctx = createContext(null);

export function PrefsProvider({ children }) {
  const [p, setP] = useState({ dark: false, lang: 'en', notif: true });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const x = await jget(K, null);
      if (x) setP(prev => ({ ...prev, ...x }));
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (ready) jset(K, p);
  }, [p, ready]);

  const v = useMemo(() => ({ p, setP, ready }), [p, ready]);

  return <Ctx.Provider value={v}>{children}</Ctx.Provider>;
}

export function usePrefs() {
  return useContext(Ctx);
}
