// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Platform,
//   StatusBar,
//   TextInput,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useCart } from '../context/CartContext';

// const t = {
//   c: {
//     bg: '#F6F7FB',
//     card: '#FFFFFF',
//     text: '#121212',
//     sub: '#6A6A6A',
//     line: '#E9ECF3',
//     pri: '#18A957',
//     priSoft: '#EAF8F1',
//     dangerSoft: '#FFF1F3',
//     danger: '#FF3B30',
//     dark: '#0E0E10',
//   },
//   r: { md: 16, lg: 20, pill: 999 },
// };

// const initialProducts = [
//   {
//     id: '1',
//     name: 'fresh! Tomato - Local',
//     weight: '1 kg',
//     price: 38,
//     oldPrice: 65,
//     offer: '42% OFF',
//     label: 'Har Din Sasta!',
//     image: require('../assets/tomato.png'),
//   },
//   {
//     id: '2',
//     name: 'fresh! Onion',
//     weight: '1 kg',
//     price: 29,
//     oldPrice: 56,
//     offer: '48% OFF',
//     label: 'Get for Free',
//     image: require('../assets/onion.png'),
//   },
//   {
//     id: '3',
//     name: 'fresh! Chilli - Green Long',
//     weight: '100 g',
//     price: 5.6,
//     oldPrice: 12,
//     offer: '53% OFF',
//     label: 'Har Din Sasta!',
//     image: require('../assets/chilli.png'),
//   },
//   {
//     id: '4',
//     name: 'fresh! Watermelon - Small',
//     weight: '1 pc - 1.7 - 2.5 kg',
//     price: 67,
//     oldPrice: 134,
//     offer: '49% OFF',
//     label: 'Har Din Sasta!',
//     image: require('../assets/watermelon.png'),
//   },
// ];

// const CategoryScreen = ({ navigation }) => {
//   const [q, setQ] = useState('');
//   const [products, setProducts] = useState(
//     initialProducts.map((item) => ({ ...item, isFavorite: false }))
//   );

//   const { addToCart, incrementItem, decrementItem, getItemCount, getCartCount } = useCart();

//   const toggleFavorite = (id) => {
//     setProducts((p) => p.map((x) => (x.id === id ? { ...x, isFavorite: !x.isFavorite } : x)));
//   };

//   const data = products.filter((x) => {
//     const s = `${x.name} ${x.weight}`.toLowerCase();
//     return s.includes(q.trim().toLowerCase());
//   });

//   const toCartItem = (item) => ({
//     id: item.id,
//     product_name: item.name,
//     quantity: item.weight,
//     price: item.price,
//     image: item.image,
//   });

//   const renderItem = ({ item }) => {
//     const offPct =
//       item.oldPrice && item.oldPrice > 0
//         ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
//         : null;

//     const itemCount = getItemCount(item.id);
//     const cartItem = toCartItem(item);

//     return (
//       <View style={styles.card}>
//         <View style={styles.cardTopRow}>
//           <View style={styles.offerPill}>
//             <Icon name="sparkles-outline" size={12} color={t.c.pri} />
//             <Text style={styles.offerText}>
//               {item.offer || (offPct ? `${offPct}% OFF` : 'Offer')}
//             </Text>
//           </View>

//           <TouchableOpacity
//             activeOpacity={0.9}
//             style={[styles.favBtn, item.isFavorite ? styles.favBtnOn : null]}
//             onPress={() => toggleFavorite(item.id)}
//           >
//             <Icon
//               name={item.isFavorite ? 'heart' : 'heart-outline'}
//               size={16}
//               color={item.isFavorite ? t.c.danger : '#666'}
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.imgWrap}>
//           <Image source={item.image} style={styles.img} />
//         </View>

//         <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
//         <Text style={styles.wt} numberOfLines={1}>{item.weight}</Text>

//         <View style={styles.priceRow}>
//           <Text style={styles.price}>₹{item.price}</Text>
//           <Text style={styles.old}>₹{item.oldPrice}</Text>
//         </View>

//         <View style={styles.bottomRow}>
//           {itemCount === 0 ? (
//             <TouchableOpacity
//               activeOpacity={0.9}
//               style={styles.addBtn}
//               onPress={() => addToCart(cartItem)}
//             >
//               <Icon name="add" size={16} color="#fff" />
//               <Text style={styles.addText}>Add</Text>
//             </TouchableOpacity>
//           ) : (
//             <View style={styles.qty}>
//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 onPress={() => decrementItem(cartItem)}
//                 style={styles.qtyBtn}
//               >
//                 <Icon name="remove" size={16} color={t.c.text} />
//               </TouchableOpacity>

//               <Text style={styles.qtyVal}>{itemCount}</Text>

//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 onPress={() => incrementItem(cartItem)}
//                 style={[styles.qtyBtn, styles.qtyBtnPri]}
//               >
//                 <Icon name="add" size={16} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//     );
//   };

//   const cartCount = getCartCount();

//   return (
//     <SafeAreaView style={styles.safe} edges={['top']}>
//       <View style={styles.header}>
//         <TouchableOpacity activeOpacity={0.85} style={styles.iconBtn} onPress={() => navigation.goBack()}>
//           <Icon name="chevron-back" size={22} color={t.c.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1, marginHorizontal: 10 }}>
//           <Text style={styles.headerTitle} numberOfLines={1}>Fruits & Vegetables</Text>
//           <Text style={styles.headerSub}>Fresh picks near you</Text>
//         </View>

//         <TouchableOpacity
//           activeOpacity={0.9}
//           style={styles.iconBtn}
//           onPress={() => navigation.navigate('CartScreen')}
//         >
//           <View>
//             <Icon name="cart-outline" size={20} color={t.c.text} />
//             {cartCount > 0 && (
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{cartCount}</Text>
//               </View>
//             )}
//           </View>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.searchWrap}>
//         <Icon name="search-outline" size={18} color="#777" style={{ marginRight: 8 }} />
//         <TextInput
//           value={q}
//           onChangeText={setQ}
//           placeholder="Search items..."
//           placeholderTextColor="#8E8E8E"
//           style={styles.search}
//         />
//         {q.length > 0 ? (
//           <TouchableOpacity activeOpacity={0.9} onPress={() => setQ('')} style={styles.clearBtn}>
//             <Icon name="close" size={16} color="#666" />
//           </TouchableOpacity>
//         ) : null}
//       </View>

//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         contentContainerStyle={styles.grid}
//         columnWrapperStyle={{ justifyContent: 'space-between' }}
//         renderItem={renderItem}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: t.c.bg,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },

//   header: {
//     paddingHorizontal: 16,
//     paddingTop: 10,
//     paddingBottom: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   iconBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 14,
//     backgroundColor: t.c.card,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.06,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 10,
//     elevation: 2,
//   },

//   headerTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },
//   headerSub: { marginTop: 2, fontSize: 12, fontWeight: '800', color: t.c.sub },

//   badge: {
//     position: 'absolute',
//     top: -8,
//     right: -10,
//     minWidth: 18,
//     height: 18,
//     borderRadius: 9,
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 4,
//   },
//   badgeText: { color: '#fff', fontSize: 10, fontWeight: '900' },

//   searchWrap: {
//     marginHorizontal: 16,
//     backgroundColor: t.c.card,
//     borderRadius: 18,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 14,
//     elevation: 2,
//   },

//   search: { flex: 1, fontSize: 14, fontWeight: '800', color: t.c.text, paddingVertical: 0 },

//   clearBtn: {
//     width: 30,
//     height: 30,
//     borderRadius: 12,
//     backgroundColor: '#F2F2F2',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   grid: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 30 },

//   card: {
//     width: '48%',
//     backgroundColor: t.c.card,
//     borderRadius: 18,
//     padding: 12,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 8 },
//     shadowRadius: 18,
//     elevation: 2,
//   },

//   cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

//   offerPill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: t.c.priSoft,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: t.r.pill,
//     gap: 6,
//   },
//   offerText: { fontSize: 11, fontWeight: '900', color: t.c.pri },

//   favBtn: {
//     width: 34,
//     height: 34,
//     borderRadius: 14,
//     backgroundColor: '#F2F2F2',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   favBtnOn: { backgroundColor: t.c.dangerSoft },

//   imgWrap: {
//     marginTop: 10,
//     height: 92,
//     borderRadius: 16,
//     backgroundColor: '#EEF1F6',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   img: { width: 78, height: 78, resizeMode: 'contain' },

//   name: { marginTop: 10, fontSize: 13, fontWeight: '900', color: t.c.text },
//   wt: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

//   priceRow: { marginTop: 8, flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
//   price: { fontSize: 15, fontWeight: '900', color: t.c.text },
//   old: {
//     fontSize: 12,
//     fontWeight: '800',
//     color: '#8E8E8E',
//     textDecorationLine: 'line-through',
//   },

//   bottomRow: { marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end' },

//   addBtn: {
//     backgroundColor: t.c.pri,
//     borderRadius: 14,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   addText: { color: '#fff', fontWeight: '900', fontSize: 12 },

//   qty: { flexDirection: 'row', alignItems: 'center' },
//   qtyBtn: {
//     width: 36,
//     height: 36,
//     borderRadius: 14,
//     backgroundColor: '#F3F4F7',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   qtyBtnPri: { backgroundColor: t.c.pri },
//   qtyVal: { marginHorizontal: 10, fontSize: 14, fontWeight: '900', color: t.c.text },
// });

// export default CategoryScreen;


import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  TextInput,
  Modal,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const t = {
  c: {
    bg: '#F6F7FB',
    card: '#FFFFFF',
    text: '#121212',
    sub: '#6A6A6A',
    line: '#E9ECF3',
    pri: '#18A957',
    priSoft: '#EAF8F1',
    dangerSoft: '#FFF1F3',
    danger: '#FF3B30',
  },
  r: { pill: 999 },
};

const allProducts = [
  {
    id: '1',
    name: 'fresh! Tomato - Local',
    weight: '1 kg',
    price: 38,
    oldPrice: 65,
    offer: '42% OFF',
    label: 'Har Din Sasta!',
    image: require('../assets/tomato.png'),
    cat: 'vegetables',
  },
  {
    id: '2',
    name: 'fresh! Onion',
    weight: '1 kg',
    price: 29,
    oldPrice: 56,
    offer: '48% OFF',
    label: 'Get for Free',
    image: require('../assets/onion.png'),
    cat: 'vegetables',
  },
  {
    id: '3',
    name: 'fresh! Chilli - Green Long',
    weight: '100 g',
    price: 5.6,
    oldPrice: 12,
    offer: '53% OFF',
    label: 'Har Din Sasta!',
    image: require('../assets/chilli.png'),
    cat: 'vegetables',
  },
  {
    id: '4',
    name: 'fresh! Watermelon - Small',
    weight: '1 pc - 1.7 - 2.5 kg',
    price: 67,
    oldPrice: 134,
    offer: '49% OFF',
    label: 'Har Din Sasta!',
    image: require('../assets/watermelon.png'),
    cat: 'fruits',
  },
];

export default function CategoryScreen({ navigation, route }) {
  const { addToCart, incrementItem, decrementItem, getItemCount, getCartCount } = useCart();
  const { show } = useToast();

  const categoryId = route?.params?.categoryId || route?.params?.category?.id || 'vegetables';
  const title = route?.params?.title || route?.params?.category?.cat_name || 'Category';

  const K_RS = `cat_recent_searches_${categoryId}`;

  const [q, setQ] = useState('');
  const [rs, setRs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [sheet, setSheet] = useState(false);
  const [sort, setSort] = useState('reco'); // reco | plh | phl | disc
  const [onlyFav, setOnlyFav] = useState(false);
  const [onlyOffer, setOnlyOffer] = useState(false);

  const [items, setItems] = useState(allProducts.map((x) => ({ ...x, isFavorite: false })));

  useEffect(() => {
    (async () => {
      try {
        const s = await AsyncStorage.getItem(K_RS);
        setRs(s ? JSON.parse(s) : []);
      } catch (e) {}
    })();
  }, [K_RS]);

  const saveSearch = async () => {
    const s = q.trim();
    if (!s) return;
    try {
      const nx = [s, ...rs.filter((x) => x.toLowerCase() !== s.toLowerCase())].slice(0, 10);
      setRs(nx);
      await AsyncStorage.setItem(K_RS, JSON.stringify(nx));
    } catch (e) {}
  };

  const toggleFavorite = (id) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, isFavorite: !x.isFavorite } : x)));
  };

  const base = useMemo(() => {
    const a = items.filter((x) => x.cat === categoryId);
    return a.length ? a : items;
  }, [items, categoryId]);

  const data = useMemo(() => {
    let a = base;

    const s = q.trim().toLowerCase();
    if (s) a = a.filter((x) => `${x.name} ${x.weight}`.toLowerCase().includes(s));

    if (onlyFav) a = a.filter((x) => x.isFavorite);
    if (onlyOffer) a = a.filter((x) => !!x.offer);

    if (sort === 'plh') a = [...a].sort((m, n) => (m.price || 0) - (n.price || 0));
    else if (sort === 'phl') a = [...a].sort((m, n) => (n.price || 0) - (m.price || 0));
    else if (sort === 'disc') {
      a = [...a].sort((m, n) => {
        const md = m.oldPrice ? (m.oldPrice - m.price) / m.oldPrice : 0;
        const nd = n.oldPrice ? (n.oldPrice - n.price) / n.oldPrice : 0;
        return nd - md;
      });
    }

    return a;
  }, [base, q, onlyFav, onlyOffer, sort]);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 350);
  };

  const toCartItem = (item) => ({
    id: item.id,
    product_name: item.name,
    quantity: item.weight,
    price: item.price,
    image: item.image,
  });

  const renderItem = ({ item }) => {
    const offPct =
      item.oldPrice && item.oldPrice > 0
        ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
        : null;

    const itemCount = getItemCount(item.id);
    const cartItem = toCartItem(item);

    return (
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={styles.offerPill}>
            <Icon name="sparkles-outline" size={12} color={t.c.pri} />
            <Text style={styles.offerText}>
              {item.offer || (offPct ? `${offPct}% OFF` : 'Offer')}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.favBtn, item.isFavorite ? styles.favBtnOn : null]}
            onPress={() => {
              toggleFavorite(item.id);
              show(item.isFavorite ? 'Removed from favourites' : 'Added to favourites');
            }}
          >
            <Icon
              name={item.isFavorite ? 'heart' : 'heart-outline'}
              size={16}
              color={item.isFavorite ? t.c.danger : '#666'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.imgWrap}>
          <Image source={item.image} style={styles.img} />
        </View>

        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.wt} numberOfLines={1}>{item.weight}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.old}>₹{item.oldPrice}</Text>
        </View>

        <View style={styles.bottomRow}>
          {itemCount === 0 ? (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.addBtn}
              onPress={() => {
                addToCart(cartItem);
                show('Added to cart');
              }}
            >
              <Icon name="add" size={16} color="#fff" />
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qty}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => decrementItem(cartItem)}
                style={styles.qtyBtn}
              >
                <Icon name="remove" size={16} color={t.c.text} />
              </TouchableOpacity>

              <Text style={styles.qtyVal}>{itemCount}</Text>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => incrementItem(cartItem)}
                style={[styles.qtyBtn, styles.qtyBtnPri]}
              >
                <Icon name="add" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const cartCount = getCartCount();

  const chip = (txt, active, onPress) => (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.fchip, active ? styles.fchipOn : null]}>
      <Text style={[styles.fchipText, active ? styles.fchipTextOn : null]}>{txt}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.85} style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={22} color={t.c.text} />
        </TouchableOpacity>

        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
          <Text style={styles.headerSub}>Fresh picks near you</Text>
        </View>

        <TouchableOpacity activeOpacity={0.85} style={styles.iconBtn} onPress={() => setSheet(true)}>
          <Icon name="options-outline" size={20} color={t.c.text} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.iconBtn, { marginLeft: 10 }]}
          onPress={() => navigation.navigate('CartScreen')}
        >
          <View>
            <Icon name="cart-outline" size={20} color={t.c.text} />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrap}>
        <Icon name="search-outline" size={18} color="#777" style={{ marginRight: 8 }} />
        <TextInput
          value={q}
          onChangeText={setQ}
          onSubmitEditing={saveSearch}
          placeholder="Search items..."
          placeholderTextColor="#8E8E8E"
          style={styles.search}
          returnKeyType="search"
        />
        {q.length > 0 ? (
          <TouchableOpacity activeOpacity={0.9} onPress={() => setQ('')} style={styles.clearBtn}>
            <Icon name="close" size={16} color="#666" />
          </TouchableOpacity>
        ) : null}
      </View>

      {rs.length > 0 && q.length === 0 ? (
        <View style={styles.rsWrap}>
          <Text style={styles.rsTitle}>Recent searches</Text>
          <FlatList
            data={rs}
            keyExtractor={(x, i) => `${x}_${i}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 10, paddingVertical: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.9} onPress={() => setQ(item)} style={styles.rsChip}>
                <Text style={styles.rsChipText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Icon name="search-outline" size={28} color="#18A957" />
            <Text style={styles.emptyTitle}>No items found</Text>
            <Text style={styles.emptySub}>Try search or clear filters.</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.emptyBtn}
              onPress={() => {
                setQ('');
                setSort('reco');
                setOnlyFav(false);
                setOnlyOffer(false);
              }}
            >
              <Text style={styles.emptyBtnText}>Clear</Text>
            </TouchableOpacity>
          </View>
        }
        initialNumToRender={8}
        windowSize={7}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={40}
        removeClippedSubviews
      />

      <Modal visible={sheet} transparent animationType="slide" onRequestClose={() => setSheet(false)}>
        <View style={styles.ov}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setSheet(false)} />
          <View style={styles.sheet}>
            <View style={styles.sheetHead}>
              <Text style={styles.sheetTitle}>Sort & Filter</Text>
              <TouchableOpacity onPress={() => setSheet(false)} style={styles.sheetX} activeOpacity={0.9}>
                <Text style={styles.sheetXText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sheetLabel}>Sort</Text>
            <View style={styles.sheetRow}>
              {chip('Recommended', sort === 'reco', () => setSort('reco'))}
              {chip('Price Low→High', sort === 'plh', () => setSort('plh'))}
              {chip('Price High→Low', sort === 'phl', () => setSort('phl'))}
              {chip('Best Discount', sort === 'disc', () => setSort('disc'))}
            </View>

            <Text style={styles.sheetLabel}>Filter</Text>
            <View style={styles.sheetRow}>
              {chip('Favourites', onlyFav, () => setOnlyFav((x) => !x))}
              {chip('Offers', onlyOffer, () => setOnlyOffer((x) => !x))}
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.applyBtn}
              onPress={() => setSheet(false)}
            >
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

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

  headerTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },
  headerSub: { marginTop: 2, fontSize: 12, fontWeight: '800', color: t.c.sub },

  badge: {
    position: 'absolute',
    top: -8,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '900' },

  searchWrap: {
    marginHorizontal: 16,
    backgroundColor: t.c.card,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
  },

  search: { flex: 1, fontSize: 14, fontWeight: '800', color: t.c.text, paddingVertical: 0 },

  clearBtn: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rsWrap: { marginTop: 6 },
  rsTitle: { paddingHorizontal: 16, marginTop: 10, fontSize: 12, fontWeight: '900', color: t.c.sub, textTransform: 'uppercase', letterSpacing: 0.4 },
  rsChip: { backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: t.c.line },
  rsChipText: { fontWeight: '900', color: t.c.text },

  grid: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 30 },

  card: {
    width: '48%',
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },

  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  offerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
    gap: 6,
  },
  offerText: { fontSize: 11, fontWeight: '900', color: t.c.pri },

  favBtn: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtnOn: { backgroundColor: t.c.dangerSoft },

  imgWrap: {
    marginTop: 10,
    height: 92,
    borderRadius: 16,
    backgroundColor: '#EEF1F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: { width: 78, height: 78, resizeMode: 'contain' },

  name: { marginTop: 10, fontSize: 13, fontWeight: '900', color: t.c.text },
  wt: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

  priceRow: { marginTop: 8, flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  price: { fontSize: 15, fontWeight: '900', color: t.c.text },
  old: { fontSize: 12, fontWeight: '800', color: '#8E8E8E', textDecorationLine: 'line-through' },

  bottomRow: { marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end' },

  addBtn: {
    backgroundColor: t.c.pri,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addText: { color: '#fff', fontWeight: '900', fontSize: 12 },

  qty: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 36, height: 36, borderRadius: 14, backgroundColor: '#F3F4F7', alignItems: 'center', justifyContent: 'center' },
  qtyBtnPri: { backgroundColor: t.c.pri },
  qtyVal: { marginHorizontal: 10, fontSize: 14, fontWeight: '900', color: t.c.text },

  emptyWrap: {
    marginTop: 14,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
  },
  emptyTitle: { marginTop: 8, fontSize: 16, fontWeight: '900', color: '#121212' },
  emptySub: { marginTop: 4, fontSize: 12, fontWeight: '700', color: '#7A7A7A' },
  emptyBtn: { marginTop: 12, backgroundColor: t.c.pri, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 14 },
  emptyBtnText: { color: '#fff', fontWeight: '900' },

  ov: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' },
  sheet: { backgroundColor: '#fff', padding: 16, borderTopLeftRadius: 22, borderTopRightRadius: 22 },
  sheetHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sheetTitle: { fontSize: 16, fontWeight: '900', color: '#121212' },
  sheetX: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#F6F7FB', alignItems: 'center', justifyContent: 'center' },
  sheetXText: { fontWeight: '900', color: '#121212' },
  sheetLabel: { marginTop: 14, marginBottom: 8, fontSize: 12, fontWeight: '900', color: '#6A6A6A', textTransform: 'uppercase' },
  sheetRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  fchip: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14, borderWidth: 1, borderColor: '#E9ECF3' },
  fchipOn: { backgroundColor: '#EAF8F1', borderColor: '#18A957' },
  fchipText: { fontWeight: '900', color: '#121212' },
  fchipTextOn: { color: '#18A957' },

  applyBtn: { marginTop: 16, height: 48, borderRadius: 14, backgroundColor: '#18A957', alignItems: 'center', justifyContent: 'center' },
  applyText: { color: '#fff', fontWeight: '900' },
});


