// import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const OrdersContext = createContext(null);

// const KEY = 'orders_v1';

// const makeId = () => {
//   const a = Date.now().toString(36).toUpperCase();
//   const b = Math.random().toString(36).slice(2, 7).toUpperCase();
//   return `OD-${a}-${b}`;
// };

// export const OrdersProvider = ({ children }) => {
//   const [orders, setOrders] = useState([]); // newest first
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
//           if (Array.isArray(parsed)) setOrders(parsed);
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
//         await AsyncStorage.setItem(KEY, JSON.stringify(orders));
//       } catch (e) {}
//     }, 250);

//     return () => {
//       if (saveTimer.current) clearTimeout(saveTimer.current);
//     };
//   }, [orders, ready]);

//   const addOrder = (order) => {
//     setOrders((prev) => [order, ...prev]);
//     return order;
//   };

//   const createOrderFromCart = ({
//     cartItems,
//     status = 'PLACED', // PLACED | FAILED
//     paymentMode = 'COD',
//     shopName = 'FreshCart',
//     address = '',
//   }) => {
//     const items = (cartItems || []).map((x) => ({
//       id: String(x.id),
//       name: x.product_name || x.name || 'Item',
//       qty: x.qty || 1,
//       price: Number(x.price) || 0,
//       image: x.product_image_url || x.image || null,
//       quantity: x.quantity || x.weight || '',
//     }));

//     const total = items.reduce((s, it) => s + it.price * it.qty, 0);

//     const order = {
//       id: makeId(),
//       status, // 'PLACED' or 'FAILED'
//       createdAt: new Date().toISOString(),
//       shopName,
//       paymentMode,
//       address,
//       items,
//       charges: { store: 0, distance: 0, gst: 0 },
//       total,
//     };

//     addOrder(order);
//     return order;
//   };

//   const getOrderById = (id) => {
//     const s = String(id);
//     return orders.find((o) => String(o.id) === s) || null;
//   };

//   const value = useMemo(
//     () => ({
//       orders,
//       addOrder,
//       createOrderFromCart,
//       getOrderById,
//       ready,
//     }),
//     [orders, ready]
//   );

//   return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
// };

// export const useOrders = () => useContext(OrdersContext);


import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const K = 'orders_v1';

const OrdersContext = createContext(null);

const mkId = () => {
  const a = Date.now().toString(36).toUpperCase();
  const b = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `OD-${a}-${b}`;
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const hydrated = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const s = await AsyncStorage.getItem(K);
        if (s) {
          const d = JSON.parse(s);
          if (Array.isArray(d)) setOrders(d);
        }
      } catch (e) {
      } finally {
        hydrated.current = true;
      }
    })();
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    AsyncStorage.setItem(K, JSON.stringify(orders)).catch(() => {});
  }, [orders]);

  const addOrder = (o) => {
    const id = mkId();
    const createdAt = new Date().toISOString();

    const items = (o.items || []).map((x) => ({
      id: String(x.id),
      name: x.product_name || x.name || 'Item',
      price: Number(x.price || 0),
      qty: Number(x.qty || x.count || 1),
      image: x.product_image_url || null,
    }));

    const ord = {
      id,
      status: o.status || 'PLACED', // 'PLACED' | 'FAILED'
      createdAt,
      items,
      total: Number(o.total || 0),
      paymentMode: o.paymentMode || 'COD',
      address: o.address || '',
      shopName: o.shopName || '',
    };

    setOrders((p) => [ord, ...p]);
    return id;
  };

  const getOrderById = (id) => orders.find((x) => x.id === id);

  const v = useMemo(
    () => ({
      orders,
      addOrder,
      getOrderById,
    }),
    [orders]
  );

  return <OrdersContext.Provider value={v}>{children}</OrdersContext.Provider>;
};

export const useOrders = () => {
  const v = useContext(OrdersContext);
  if (!v) throw new Error('useOrders must be used inside OrdersProvider');
  return v;
};
