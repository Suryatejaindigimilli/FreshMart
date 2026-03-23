// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   Linking,
//   ActivityIndicator,
//   TextInput,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useCart } from '../context/CartContext';
// import { API_URL } from '@env';

// const ShopProfileScreen = ({ route, navigation }) => {
//   const { shop } = route.params;
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState('');
//   const [products, setProducts] = useState([]);
//   const api_url = API_URL;

//   const { addToCart, incrementItem, decrementItem, getItemCount, getCartCount } = useCart();

//   const getJwtToken = async () => {
//     try {
//       return await AsyncStorage.getItem('userToken');
//     } catch (error) {
//       console.error('Token Fetch Error:', error);
//       return null;
//     }
//   };

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const fetchProducts = async () => {
//     const token = await getJwtToken();
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get(`${api_url}/products/${shop.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const items = response.data.map(item => ({
//         ...item,
//         id: item.id.toString(),
//       }));

//       setProducts(items);
//     } catch (error) {
//       console.error('Fetch Error:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const filteredProducts = products.filter(item =>
//     (item.product_name || '').toLowerCase().includes(searchText.toLowerCase())
//   );

//   const renderProductItem = ({ item }) => {
//     const itemCount = getItemCount(item.id);

//     return (
//       <View style={styles.card}>
//         <Image source={{ uri: item.product_image_url }} style={styles.productImage} />
//         <Text style={styles.productTitle}>{item.product_name}</Text>
//         <Text style={styles.productDesc}>{item.quantity}</Text>
//         <View style={styles.cardBottom}>
//           <Text style={styles.productPrice}>₹{item.price}</Text>
//           {itemCount === 0 ? (
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => addToCart(item)}
//             >
//               <Icon name="add" size={20} color="#fff" />
//             </TouchableOpacity>
//           ) : (
//             <View style={styles.counterContainer}>
//               <TouchableOpacity
//                 onPress={() => decrementItem(item)}
//                 style={styles.counterButton}
//               >
//                 <Icon name="remove" size={18} color="#fff" />
//               </TouchableOpacity>
//               <Text style={styles.counterText}>{itemCount}</Text>
//               <TouchableOpacity
//                 onPress={() => incrementItem(item)}
//                 style={styles.counterButton}
//               >
//                 <Icon name="add" size={18} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//     );
//   };

//   const renderHeader = () => (
//     <>
//       <View style={styles.topHeader}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.screenTitle}>Shop Profile</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
//           <View>
//             <Icon name="cart-outline" size={24} color="#000" />
//             {getCartCount() > 0 && (
//               <View style={styles.cartBadge}>
//                 <Text style={styles.badgeText}>{getCartCount()}</Text>
//               </View>
//             )}
//           </View>
//         </TouchableOpacity>
//       </View>

//       <Image source={{ uri: shop.shop_image_url }} style={styles.shopImageBanner} resizeMode="cover" />

//       <View style={styles.infoCard}>
//         <Text style={styles.shopName}>{shop.shop_name}</Text>
//         <Text style={styles.owner}>Owner: {shop.owner_namme}</Text>

//         <View style={styles.buttonRowCentered}>
//           <TouchableOpacity style={styles.callButton} onPress={() => Linking.openURL(`tel:${shop.phone_no}`)}>
//             <Icon name="call" size={18} color="#fff" />
//             <Text style={styles.callButtonText}>Call</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.locationButton} onPress={() => console.log('View Location')}>
//             <Icon name="location" size={18} color="#00B14F" />
//             <Text style={styles.locationButtonText}>View Location</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <Text style={styles.categoryTitle}>Available Products</Text>
//       <View style={styles.searchWrapper}>
//         <Icon name="search-outline" size={18} color="#888" style={styles.searchIcon} />
//         <TextInput
//           placeholder="Search for groceries"
//           value={searchText}
//           onChangeText={setSearchText}
//           style={styles.searchInput}
//         />
//       </View>
//     </>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#00B14F" />
//       ) : (
//         <FlatList
//           data={filteredProducts}
//           renderItem={renderProductItem}
//           keyExtractor={item => item.id}
//           numColumns={2}
//           // eslint-disable-next-line react-native/no-inline-styles
//           columnWrapperStyle={{ justifyContent: 'space-between' }}
//           ListHeaderComponent={renderHeader}
//           // eslint-disable-next-line react-native/no-inline-styles
//           contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 15 }}
//           extraData={getCartCount()} // ✅ Add this to ensure FlatList re-renders
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   topHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 15,
//   },
//   screenTitle: { fontSize: 18, fontWeight: 'bold' },
//   cartBadge: {
//     position: 'absolute',
//     top: -6,
//     right: -10,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     paddingHorizontal: 5,
//     paddingVertical: 2,
//   },
//   badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
//   shopImageBanner: {
//     width: '100%',
//     height: 220,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   infoCard: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     marginHorizontal: 20,
//     marginTop: -30,
//     padding: 20,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   shopName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
//   owner: { fontSize: 14, color: '#555', marginBottom: 12 },
//   buttonRowCentered: { flexDirection: 'row', justifyContent: 'space-evenly' },
//   callButton: {
//     backgroundColor: '#00B14F',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   callButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
//   locationButton: {
//     borderColor: '#00B14F',
//     borderWidth: 1.5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   locationButtonText: { color: '#00B14F', fontWeight: 'bold', marginLeft: 8 },
//   categoryTitle: { fontSize: 18, fontWeight: 'bold', padding: 15 },
//   searchWrapper: {
//     marginTop: 15,
//     marginHorizontal: 15,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//   searchIcon: { marginRight: 6 },
//   searchInput: { flex: 1, fontSize: 14, paddingVertical: 10 },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 10,
//     width: '48%',
//     elevation: 2,
//   },
//   productImage: { width: '100%', height: 100, resizeMode: 'contain' },
//   productTitle: { fontWeight: 'bold', fontSize: 14, marginTop: 5 },
//   productDesc: { fontSize: 12, color: '#666', marginVertical: 2 },
//   cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
//   productPrice: { fontWeight: 'bold', fontSize: 14 },
//   addButton: { backgroundColor: '#3CB371', padding: 6, borderRadius: 20 },
//   counterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#3CB371',
//     borderRadius: 20,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   counterButton: { paddingHorizontal: 6 },
//   counterText: { color: '#fff', marginHorizontal: 6, fontWeight: 'bold' },
// });

// export default ShopProfileScreen;

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import {
//   View, Text, StyleSheet, Image, TouchableOpacity, FlatList,
//   Linking, ActivityIndicator, TextInput,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useCart } from '../context/CartContext';

// const LOGO = require('../assets/logo.png');
// const API_BASE = 'http://192.168.0.137:5000'; // keep ONE base across app

// const ShopProfileScreen = ({ route, navigation }) => {
//   const shop = route?.params?.shop;

//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState('');
//   const [products, setProducts] = useState([]);

//   const { addToCart, incrementItem, decrementItem, getItemCount, getCartCount } = useCart();

//   const fetchProducts = useCallback(async () => {
//     if (!shop?.id) { setLoading(false); return; }

//     setLoading(true);
//     const token = await AsyncStorage.getItem('userToken');

//     if (!token) {
//       setLoading(false);
//       navigation.replace('LoginScreen');
//       return;
//     }

//     try {
//       const res = await axios.get(`${API_BASE}/products/${encodeURIComponent(shop.id)}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         timeout: 8000,
//       });

//       const arr = Array.isArray(res.data) ? res.data : [];
//       setProducts(arr.map(x => ({ ...x, id: String(x.id) })));
//     } catch (e) {
//       console.log('Fetch Error:', e?.response?.data || e.message);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [shop?.id, navigation]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const filteredProducts = useMemo(() => {
//     const s = searchText.toLowerCase();
//     return products.filter(p => String(p.product_name || '').toLowerCase().includes(s));
//   }, [products, searchText]);

//   const renderProductItem = ({ item }) => {
//     const pid = String(item.id);
//     const itemCount = getItemCount(pid);

//     const cartItem = {
//       ...item,
//       id: pid,
//       count: 1,
//     };

//     return (
//       <View style={styles.card}>
//         <Image
//           source={item.product_image_url ? { uri: item.product_image_url } : LOGO}
//           style={styles.productImage}
//         />
//         <Text style={styles.productTitle}>{item.product_name}</Text>
//         <Text style={styles.productDesc}>{item.quantity}</Text>

//         <View style={styles.cardBottom}>
//           <Text style={styles.productPrice}>₹{item.price}</Text>

//           {itemCount === 0 ? (
//             <TouchableOpacity style={styles.addButton} onPress={() => addToCart(cartItem)}>
//               <Icon name="add" size={20} color="#fff" />
//             </TouchableOpacity>
//           ) : (
//             <View style={styles.counterContainer}>
//               <TouchableOpacity onPress={() => decrementItem(cartItem)} style={styles.counterButton}>
//                 <Icon name="remove" size={18} color="#fff" />
//               </TouchableOpacity>
//               <Text style={styles.counterText}>{itemCount}</Text>
//               <TouchableOpacity onPress={() => incrementItem(cartItem)} style={styles.counterButton}>
//                 <Icon name="add" size={18} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//     );
//   };

//   const renderHeader = () => (
//     <>
//       <View style={styles.topHeader}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>

//         <Text style={styles.screenTitle}>Shop Profile</Text>

//         <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
//           <View>
//             <Icon name="cart-outline" size={24} color="#000" />
//             {getCartCount() > 0 && (
//               <View style={styles.cartBadge}>
//                 <Text style={styles.badgeText}>{getCartCount()}</Text>
//               </View>
//             )}
//           </View>
//         </TouchableOpacity>
//       </View>

//       <Image
//         source={shop?.shop_image_url ? { uri: shop.shop_image_url } : LOGO}
//         style={styles.shopImageBanner}
//         resizeMode="cover"
//       />

//       <View style={styles.infoCard}>
//         <Text style={styles.shopName}>{shop?.shop_name || 'Shop'}</Text>
//         <Text style={styles.owner}>Owner: {shop?.owner_namme || '-'}</Text>

//         <View style={styles.buttonRowCentered}>
//           <TouchableOpacity
//             style={styles.callButton}
//             onPress={() => shop?.phone_no ? Linking.openURL(`tel:${shop.phone_no}`) : null}
//           >
//             <Icon name="call" size={18} color="#fff" />
//             <Text style={styles.callButtonText}>Call</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.locationButton} onPress={() => console.log('View Location')}>
//             <Icon name="location" size={18} color="#00B14F" />
//             <Text style={styles.locationButtonText}>View Location</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <Text style={styles.categoryTitle}>Available Products</Text>
//       <View style={styles.searchWrapper}>
//         <Icon name="search-outline" size={18} color="#888" style={styles.searchIcon} />
//         <TextInput
//           placeholder="Search for groceries"
//           value={searchText}
//           onChangeText={setSearchText}
//           style={styles.searchInput}
//         />
//       </View>
//     </>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#00B14F" />
//       ) : (
//         <FlatList
//           data={filteredProducts}
//           renderItem={renderProductItem}
//           keyExtractor={(item) => String(item.id)}
//           numColumns={2}
//           columnWrapperStyle={{ justifyContent: 'space-between' }}
//           ListHeaderComponent={renderHeader}
//           contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 15 }}
//           extraData={getCartCount()}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   topHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 },
//   screenTitle: { fontSize: 18, fontWeight: 'bold' },
//   cartBadge: { position: 'absolute', top: -6, right: -10, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5, paddingVertical: 2 },
//   badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
//   shopImageBanner: { width: '100%', height: 220, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
//   infoCard: { backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20, marginTop: -30, padding: 20, elevation: 4 },
//   shopName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
//   owner: { fontSize: 14, color: '#555', marginBottom: 12 },
//   buttonRowCentered: { flexDirection: 'row', justifyContent: 'space-evenly' },
//   callButton: { backgroundColor: '#00B14F', flexDirection: 'row', alignItems: 'center', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20 },
//   callButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
//   locationButton: { borderColor: '#00B14F', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20 },
//   locationButtonText: { color: '#00B14F', fontWeight: 'bold', marginLeft: 8 },
//   categoryTitle: { fontSize: 18, fontWeight: 'bold', padding: 15 },
//   searchWrapper: { marginTop: 15, marginHorizontal: 15, backgroundColor: '#f1f1f1', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 },
//   searchIcon: { marginRight: 6 },
//   searchInput: { flex: 1, fontSize: 14, paddingVertical: 10 },
//   card: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginVertical: 10, width: '48%', elevation: 2 },
//   productImage: { width: '100%', height: 100, resizeMode: 'contain' },
//   productTitle: { fontWeight: 'bold', fontSize: 14, marginTop: 5 },
//   productDesc: { fontSize: 12, color: '#666', marginVertical: 2 },
//   cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
//   productPrice: { fontWeight: 'bold', fontSize: 14 },
//   addButton: { backgroundColor: '#3CB371', padding: 6, borderRadius: 20 },
//   counterContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3CB371', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 4 },
//   counterButton: { paddingHorizontal: 6 },
//   counterText: { color: '#fff', marginHorizontal: 6, fontWeight: 'bold' },
// });

// export default ShopProfileScreen;



import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  TextInput,
  Modal,
  RefreshControl,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../context/CartContext';

const LOGO = require('../assets/logo.png');
const API_BASE = 'http://192.168.0.137:5000';

const FAV_KEY = 'fav_products';

const t = {
  c: {
    bg: '#F6F7FB',
    card: '#FFFFFF',
    text: '#121212',
    sub: '#6A6A6A',
    line: '#E9ECF3',
    pri: '#18A957',
    priSoft: '#EAF8F1',
    danger: '#FF3B30',
    dangerSoft: '#FFF1F3',
  },
  r: { pill: 999 },
};

const n2 = (v) => {
  const x = Number(v);
  return Number.isFinite(x) ? x : null;
};

const pickOld = (p) =>
  n2(p?.oldPrice) ??
  n2(p?.old_price) ??
  n2(p?.mrp) ??
  n2(p?.original_price) ??
  n2(p?.oldprice) ??
  null;

const pickTag = (p) =>
  p?.label ||
  p?.tag ||
  p?.badge ||
  p?.badge_text ||
  p?.offer_tag ||
  p?.offerLabel ||
  '';

export default function ShopProfileScreen({ route, navigation }) {
  const shop = route?.params?.shop;

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [q, setQ] = useState('');
  const [products, setProducts] = useState([]);

  const [sheet, setSheet] = useState(false);
  const [sort, setSort] = useState('reco'); // reco | plh | phl | name

  const [fav, setFav] = useState({}); // { [id]: true }

  const { addToCart, incrementItem, decrementItem, getItemCount, getCartCount } = useCart();

  const loadFav = useCallback(async () => {
    try {
      const s = await AsyncStorage.getItem(FAV_KEY);
      const a = s ? JSON.parse(s) : [];
      if (!Array.isArray(a)) return;
      const m = {};
      a.forEach((id) => {
        m[String(id)] = true;
      });
      setFav(m);
    } catch (e) {}
  }, []);

  const saveFav = async (m) => {
    try {
      const ids = Object.keys(m).filter((k) => m[k]);
      await AsyncStorage.setItem(FAV_KEY, JSON.stringify(ids));
    } catch (e) {}
  };

  const toggleFav = (id) => {
    const k = String(id);
    setFav((p) => {
      const m = { ...p, [k]: !p[k] };
      saveFav(m);
      return m;
    });
  };

  const fetchProducts = useCallback(async () => {
    if (!shop?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const token = await AsyncStorage.getItem('userToken');

    if (!token) {
      setLoading(false);
      navigation.replace('LoginScreen');
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/products/${encodeURIComponent(shop.id)}`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 8000,
      });

      const arr = Array.isArray(res.data) ? res.data : [];
      setProducts(arr.map((x) => ({ ...x, id: String(x.id) })));
    } catch (e) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [shop?.id, navigation]);

  useEffect(() => {
    loadFav();
    fetchProducts();
  }, [fetchProducts, loadFav]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    let a = products.filter((p) => String(p.product_name || '').toLowerCase().includes(s));

    if (sort === 'plh') a = [...a].sort((m, n) => (n2(m.price) || 0) - (n2(n.price) || 0));
    else if (sort === 'phl') a = [...a].sort((m, n) => (n2(n.price) || 0) - (n2(m.price) || 0));
    else if (sort === 'name') a = [...a].sort((m, n) => String(m.product_name || '').localeCompare(String(n.product_name || '')));

    return a;
  }, [products, q, sort]);

  const cartCount = getCartCount();

  const toCartItem = (item) => ({
    ...item,
    id: String(item.id),
    product_name: item.product_name,
    quantity: item.quantity,
    price: item.price,
    product_image_url: item.product_image_url,
    count: 1,
  });

  const renderProductItem = ({ item }) => {
    const pid = String(item.id);
    const itemCount = getItemCount(pid);
    const cartItem = toCartItem(item);

    const p = n2(item.price) || 0;
    const old = pickOld(item);
    const pct = old && old > 0 && old > p ? Math.round(((old - p) / old) * 100) : null;

    const tag = pickTag(item) || (pct ? 'Har Din Sasta!' : '');

    return (
      <View style={styles.pCard}>
        <View style={styles.pTopRow}>
          <View style={styles.pOfferPill}>
            <Icon name="sparkles-outline" size={12} color={t.c.pri} />
            <Text style={styles.pOfferText}>{pct ? `${pct}% OFF` : 'Offer'}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.favBtn, fav[pid] ? styles.favBtnOn : null]}
            onPress={() => toggleFav(pid)}
          >
            <Icon
              name={fav[pid] ? 'heart' : 'heart-outline'}
              size={16}
              color={fav[pid] ? t.c.danger : '#666'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.pImgWrap}>
          <Image
            source={item.product_image_url ? { uri: item.product_image_url } : LOGO}
            style={styles.pImg}
          />
        </View>

        <Text style={styles.pName} numberOfLines={2}>
          {item.product_name}
        </Text>
        <Text style={styles.pQty} numberOfLines={1}>
          {item.quantity}
        </Text>

        {tag ? (
          <View style={styles.tagChip}>
            <Text style={styles.tagText} numberOfLines={1}>
              {tag}
            </Text>
          </View>
        ) : null}

        <View style={styles.pPriceRow}>
          <Text style={styles.pPrice}>₹{item.price}</Text>
          {old && old > (n2(item.price) || 0) ? <Text style={styles.pOld}>₹{old}</Text> : null}
        </View>

        <View style={styles.pBottomRow}>
          {itemCount === 0 ? (
            <TouchableOpacity activeOpacity={0.9} style={styles.addBtn} onPress={() => addToCart(cartItem)}>
              <Icon name="add" size={16} color="#fff" />
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qtyWrap}>
              <TouchableOpacity activeOpacity={0.9} onPress={() => decrementItem(cartItem)} style={styles.qtyBtn}>
                <Icon name="remove" size={16} color={t.c.text} />
              </TouchableOpacity>

              <Text style={styles.qtyVal}>{itemCount}</Text>

              <TouchableOpacity activeOpacity={0.9} onPress={() => incrementItem(cartItem)} style={[styles.qtyBtn, styles.qtyBtnPri]}>
                <Icon name="add" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const Header = () => (
    <View>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.85} style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={22} color={t.c.text} />
        </TouchableOpacity>

        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {shop?.shop_name || 'Shop'}
          </Text>
          <Text style={styles.headerSub} numberOfLines={1}>
            Owner: {shop?.owner_namme || '-'}
          </Text>
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

      <View style={styles.bannerWrap}>
        <Image
          source={shop?.shop_image_url ? { uri: shop.shop_image_url } : LOGO}
          style={styles.banner}
        />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.shopName}>{shop?.shop_name || 'Shop'}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Icon name="navigate-outline" size={14} color={t.c.pri} />
            <Text style={styles.metaText}>Near you</Text>
          </View>
          <View style={styles.metaPillSoft}>
            <Icon name="time-outline" size={14} color="#333" />
            <Text style={styles.metaTextSoft}>20-30 min</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.callBtn}
            onPress={() => (shop?.phone_no ? Linking.openURL(`tel:${shop.phone_no}`) : null)}
          >
            <Icon name="call-outline" size={18} color="#fff" />
            <Text style={styles.callText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={styles.locBtn} onPress={() => console.log('View Location')}>
            <Icon name="location-outline" size={18} color={t.c.pri} />
            <Text style={styles.locText}>Location</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <Icon name="search-outline" size={18} color="#777" style={{ marginRight: 8 }} />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search products..."
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

      <Text style={styles.sectionTitle}>Available Products</Text>
    </View>
  );

  const chip = (txt, active, onPress) => (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.fchip, active ? styles.fchipOn : null]}>
      <Text style={[styles.fchipText, active ? styles.fchipTextOn : null]}>{txt}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {loading ? (
        <View style={{ flex: 1 }}>
          <Header />
          <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
            <View style={styles.skRow}>
              {Array.from({ length: 6 }).map((_, i) => (
                <View key={i} style={styles.skCard} />
              ))}
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderProductItem}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListHeaderComponent={Header}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Icon name="search-outline" size={28} color={t.c.pri} />
              <Text style={styles.emptyTitle}>No products found</Text>
              <Text style={styles.emptySub}>Try a different keyword.</Text>
            </View>
          }
          initialNumToRender={8}
          windowSize={7}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={40}
          removeClippedSubviews
        />
      )}

      <Modal visible={sheet} transparent animationType="slide" onRequestClose={() => setSheet(false)}>
        <View style={styles.ov}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setSheet(false)} />
          <View style={styles.sheet}>
            <View style={styles.sheetHead}>
              <Text style={styles.sheetTitle}>Sort</Text>
              <TouchableOpacity onPress={() => setSheet(false)} style={styles.sheetX} activeOpacity={0.9}>
                <Text style={styles.sheetXText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sheetRow}>
              {chip('Recommended', sort === 'reco', () => setSort('reco'))}
              {chip('Price Low→High', sort === 'plh', () => setSort('plh'))}
              {chip('Price High→Low', sort === 'phl', () => setSort('phl'))}
              {chip('Name', sort === 'name', () => setSort('name'))}
            </View>

            <TouchableOpacity activeOpacity={0.9} style={styles.applyBtn} onPress={() => setSheet(false)}>
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
    backgroundColor: t.c.bg,
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

  bannerWrap: { paddingHorizontal: 16, marginTop: 2 },
  banner: { width: '100%', height: 170, borderRadius: 18, backgroundColor: '#EEE', resizeMode: 'cover' },

  infoCard: {
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },

  shopName: { fontSize: 18, fontWeight: '900', color: t.c.text },

  metaRow: { flexDirection: 'row', marginTop: 10 },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
    marginRight: 8,
  },
  metaText: { fontSize: 12, fontWeight: '800', color: t.c.pri, marginLeft: 6 },
  metaPillSoft: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
  },
  metaTextSoft: { fontSize: 12, fontWeight: '800', color: '#333', marginLeft: 6 },

  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, gap: 10 },
  callBtn: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    backgroundColor: t.c.pri,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  callText: { color: '#fff', fontWeight: '900' },
  locBtn: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    backgroundColor: t.c.priSoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  locText: { color: t.c.pri, fontWeight: '900' },

  searchWrap: {
    marginHorizontal: 16,
    marginTop: 12,
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

  sectionTitle: {
    paddingHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '800',
    color: t.c.text,
  },

  pCard: {
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

  pTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pOfferPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
    gap: 6,
  },
  pOfferText: { fontSize: 11, fontWeight: '900', color: t.c.pri },

  favBtn: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtnOn: { backgroundColor: t.c.dangerSoft },

  pImgWrap: {
    marginTop: 10,
    height: 92,
    borderRadius: 16,
    backgroundColor: '#EEF1F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pImg: { width: 78, height: 78, resizeMode: 'contain' },

  pName: { marginTop: 10, fontSize: 13, fontWeight: '900', color: t.c.text },
  pQty: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

  tagChip: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
  },
  tagText: { fontSize: 11, fontWeight: '900', color: t.c.pri },

  pPriceRow: { marginTop: 8, flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  pPrice: { fontSize: 15, fontWeight: '900', color: t.c.text },
  pOld: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8E8E8E',
    textDecorationLine: 'line-through',
  },

  pBottomRow: { marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end' },
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

  qtyWrap: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: '#F3F4F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnPri: { backgroundColor: t.c.pri },
  qtyVal: { marginHorizontal: 10, fontSize: 14, fontWeight: '900', color: t.c.text },

  emptyWrap: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
  },
  emptyTitle: { marginTop: 8, fontSize: 16, fontWeight: '900', color: t.c.text },
  emptySub: { marginTop: 4, fontSize: 12, fontWeight: '700', color: t.c.sub },

  ov: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' },
  sheet: { backgroundColor: '#fff', padding: 16, borderTopLeftRadius: 22, borderTopRightRadius: 22 },
  sheetHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sheetTitle: { fontSize: 16, fontWeight: '900', color: '#121212' },
  sheetX: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#F6F7FB', alignItems: 'center', justifyContent: 'center' },
  sheetXText: { fontWeight: '900', color: '#121212' },
  sheetRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },

  fchip: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14, borderWidth: 1, borderColor: '#E9ECF3' },
  fchipOn: { backgroundColor: '#EAF8F1', borderColor: '#18A957' },
  fchipText: { fontWeight: '900', color: '#121212' },
  fchipTextOn: { color: '#18A957' },

  applyBtn: { marginTop: 16, height: 48, borderRadius: 14, backgroundColor: '#18A957', alignItems: 'center', justifyContent: 'center' },
  applyText: { color: '#fff', fontWeight: '900' },

  skRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  skCard: { width: '48%', height: 200, borderRadius: 18, backgroundColor: t.c.line, marginBottom: 12 },
});




