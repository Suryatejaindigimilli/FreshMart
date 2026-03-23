import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { jget, jset } from './storage';

const K = 'favs';
const Ctx = createContext(null);

export function FavsProvider({ children }) {
  const [ids, setIds] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const x = await jget(K, []);
      setIds(Array.isArray(x) ? x : []);
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (ready) jset(K, ids);
  }, [ids, ready]);

  const has = (id) => ids.includes(id);
  const tog = (id) => setIds(a => a.includes(id) ? a.filter(x => x !== id) : [...a, id]);
  const clr = () => setIds([]);

  const v = useMemo(() => ({ ids, ready, has, tog, clr }), [ids, ready]);

  return <Ctx.Provider value={v}>{children}</Ctx.Provider>;
}

export function useFavs() {
  return useContext(Ctx);
}
