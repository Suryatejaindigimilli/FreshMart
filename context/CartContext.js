// import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CartContext = createContext(null);

// const KEY = 'cart_v1';

// export const CartProvider = ({ children }) => {
//   const [items, setItems] = useState([]); // [{...product, id: '1', qty: 1}]
//   const [ready, setReady] = useState(false);
//   const saveTimer = useRef(null);

//   useEffect(() => {
//     let alive = true;

//     (async () => {
//       try {
//         const str = await AsyncStorage.getItem(KEY);
//         if (!alive) return;
//         if (str) {
//           const parsed = JSON.parse(str);
//           if (Array.isArray(parsed)) setItems(parsed);
//         }
//       } catch (e) {
//       } finally {
//         if (alive) setReady(true);
//       }
//     })();

//     return () => {
//       alive = false;
//     };
//   }, []);

//   useEffect(() => {
//     if (!ready) return;

//     if (saveTimer.current) clearTimeout(saveTimer.current);
//     saveTimer.current = setTimeout(async () => {
//       try {
//         await AsyncStorage.setItem(KEY, JSON.stringify(items));
//       } catch (e) {}
//     }, 250);

//     return () => {
//       if (saveTimer.current) clearTimeout(saveTimer.current);
//     };
//   }, [items, ready]);

//   const addToCart = (p) => {
//     const id = String(p.id);
//     setItems((prev) => {
//       const i = prev.findIndex((x) => String(x.id) === id);
//       if (i >= 0) {
//         const next = [...prev];
//         next[i] = { ...next[i], qty: (next[i].qty || 0) + 1 };
//         return next;
//       }
//       return [...prev, { ...p, id, qty: 1 }];
//     });
//   };

//   const incrementItem = (p) => {
//     const id = String(p.id);
//     setItems((prev) =>
//       prev.map((x) => (String(x.id) === id ? { ...x, qty: (x.qty || 0) + 1 } : x))
//     );
//   };

//   const decrementItem = (p) => {
//     const id = String(p.id);
//     setItems((prev) => {
//       const cur = prev.find((x) => String(x.id) === id);
//       if (!cur) return prev;
//       const q = cur.qty || 0;
//       if (q <= 1) return prev.filter((x) => String(x.id) !== id);
//       return prev.map((x) => (String(x.id) === id ? { ...x, qty: q - 1 } : x));
//     });
//   };

//   const removeItem = (id) => {
//     const s = String(id);
//     setItems((prev) => prev.filter((x) => String(x.id) !== s));
//   };

//   const clearCart = async () => {
//     setItems([]);
//     try {
//       await AsyncStorage.removeItem(KEY);
//     } catch (e) {}
//   };

//   const getItemCount = (id) => {
//     const s = String(id);
//     const it = items.find((x) => String(x.id) === s);
//     return it ? it.qty || 0 : 0;
//   };

//   const getCartCount = () => items.reduce((a, x) => a + (x.qty || 0), 0);

//   const getCartTotal = () =>
//     items.reduce((sum, x) => sum + (Number(x.price) || 0) * (x.qty || 0), 0);

//   const value = useMemo(
//     () => ({
//       items,
//       addToCart,
//       incrementItem,
//       decrementItem,
//       removeItem,
//       clearCart,
//       getItemCount,
//       getCartCount,
//       getCartTotal,
//       ready,
//     }),
//     [items, ready]
//   );

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

// export const useCart = () => useContext(CartContext);
// export default CartContext;


import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const K = 'cart_v1';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const hydrated = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const s = await AsyncStorage.getItem(K);
        if (s) {
          const d = JSON.parse(s);
          if (Array.isArray(d)) setItems(d);
        }
      } catch (e) {
      } finally {
        hydrated.current = true;
      }
    })();
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    AsyncStorage.setItem(K, JSON.stringify(items)).catch(() => {});
  }, [items]);

  const getItemCount = (id) => {
    const x = items.find((i) => String(i.id) === String(id));
    return x ? Number(x.qty || 0) : 0;
  };

  const getCartCount = () => items.reduce((a, x) => a + Number(x.qty || 0), 0);

  const getTotal = () =>
    items.reduce((a, x) => a + Number(x.price || 0) * Number(x.qty || 0), 0);

  const addToCart = (p) => {
    const id = String(p.id);
    setItems((prev) => {
      const i = prev.findIndex((x) => String(x.id) === id);
      if (i >= 0) {
        const n = [...prev];
        n[i] = { ...n[i], qty: Number(n[i].qty || 0) + 1 };
        return n;
      }
      return [...prev, { ...p, id, qty: 1 }];
    });
  };

  const incrementItem = (p) => addToCart(p);

  const decrementItem = (p) => {
    const id = String(p.id);
    setItems((prev) => {
      const i = prev.findIndex((x) => String(x.id) === id);
      if (i < 0) return prev;
      const n = [...prev];
      const q = Number(n[i].qty || 0) - 1;
      if (q <= 0) return n.filter((x) => String(x.id) !== id);
      n[i] = { ...n[i], qty: q };
      return n;
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((x) => String(x.id) !== String(id)));

  const clearCart = async () => {
    setItems([]);
    try {
      await AsyncStorage.setItem(K, JSON.stringify([]));
    } catch (e) {}
  };

  const v = useMemo(
    () => ({
      items,
      addToCart,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
      getItemCount,
      getCartCount,
      getTotal,
    }),
    [items]
  );

  return <CartContext.Provider value={v}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const v = useContext(CartContext);
  if (!v) throw new Error('useCart must be used inside CartProvider');
  return v;
};
