import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, TextInput,
  TouchableOpacity, Modal, ActivityIndicator, Alert, ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { decode as base64Decode } from 'react-native-base64';

const API_BASE = 'http://192.168.1.44:5000';
const ENDPOINTS = {
  shop: (id) => `/shop?id=${encodeURIComponent(id)}`,
  updateShop: '/shop',
  categories: '/categories',
  productsBySeller: (id) => `/products/${encodeURIComponent(id)}`,
  createProduct: '/products',
  updateProduct: (id) => `/products/${encodeURIComponent(id)}`,
  deleteProduct: (id) => `/products/${encodeURIComponent(id)}`
};

const CATEGORY_OPTIONS = ['Fruits', 'Vegetables', 'Milk products', 'Bread items'];
const FILTERS = ['New Products', 'Offers', 'Best Prices', 'Orders History'];

// ✅ local assets (only ones we’re sure exist)
const LOGO = require('../assets/logo.png');

function decodeJwt(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(base64Decode(payload));
  } catch {
    return null;
  }
}
function safeJson(res) { return res.json().catch(() => ({})); }
function mapCategoryArray(raw) {
  if (Array.isArray(raw) && raw.every(x => typeof x === 'string')) return raw;
  if (Array.isArray(raw)) {
    return raw.map(r => r?.name || r?.title || r?.category || r?.category_name).filter(Boolean);
  }
  return [];
}
function normalizeProduct(p) {
  return {
    id: p.id,
    title: p.title || p.product_name || p.name || 'Untitled',
    price: Number(p.price) || 0,
    type: p.type || p.category || '',
    discount: p.discount ?? p.discount_pct ?? 0,
    image: p.image || p.product_image_url || null,
    quantity: p.quantity || '',
  };
}

export default function AdminScreen() {
  const navigation = useNavigation();

  const [token, setToken] = useState(null);
  const claims = useMemo(() => decodeJwt(token), [token]);
  const sellerId = claims?.id ?? null;
  const sellerIdNum = useMemo(() => (sellerId != null ? Number(sellerId) : null), [sellerId]);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [shopCategory, setShopCategory] = useState('Vegetable');
  const [shopName, setShopName] = useState('SHOP NAME');
  const [ownerName, setOwnerName] = useState('Owner name');
  const [phoneNumber, setPhoneNumber] = useState('Phone number');
  const [shopImage, setShopImage] = useState(null); // URL string or null

  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({ title: '', price: '', type: '', discount: '', image: '', quantity: '' });
  const [editProduct, setEditProduct] = useState({ id: null, title: '', price: '', type: '', image: '', quantity: '' });

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [savingShop, setSavingShop] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  // Load token on focus
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const t = (await AsyncStorage.getItem('token')) || (await AsyncStorage.getItem('userToken'));
        setToken(t);
      })();
    }, [])
  );

  // Admin gate
  useEffect(() => {
    if (!claims) return;
    if (claims.role !== 'admin') {
      Alert.alert('Access denied', 'Admin only. Redirecting to Login.', [
        { text: 'OK', onPress: () => navigation.navigate('LoginScreen') },
      ]);
    }
  }, [claims, navigation]);

  // Fetch data
  useEffect(() => {
    if (!sellerIdNum || !token) return;
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

    async function load() {
      setLoading(true);
      setMsg({ text: '', type: '' });
      try {
        const [shopRes, catsRes, prodsRes] = await Promise.all([
          fetch(`${API_BASE}${ENDPOINTS.shop(sellerIdNum)}`, { headers }),
          fetch(`${API_BASE}${ENDPOINTS.categories}`, { headers }),
          fetch(`${API_BASE}${ENDPOINTS.productsBySeller(sellerIdNum)}`, { headers }),
        ]);

        if ([shopRes, catsRes, prodsRes].some(r => r.status === 401 || r.status === 403)) {
          setMsg({ text: 'Please login again.', type: 'error' });
          navigation.navigate('LoginScreen'); return;
        }
        if (!shopRes.ok) throw new Error((await safeJson(shopRes))?.message || `Failed to load shop (${shopRes.status})`);
        if (!catsRes.ok) throw new Error((await safeJson(catsRes))?.message || `Failed to load categories (${catsRes.status})`);
        if (!prodsRes.ok) throw new Error((await safeJson(prodsRes))?.message || `Failed to load products (${prodsRes.status})`);

        const shopData = await shopRes.json();
        const catsData = await catsRes.json();
        const prodsData = await prodsRes.json();

        setShopCategory(shopData.category || 'Vegetable');
        setShopName(shopData.shop_name || shopData.shopName || 'SHOP NAME');
        setOwnerName(shopData.owner_namme || shopData.ownerName || 'Owner name');
        setPhoneNumber(
          shopData.phone_no != null
            ? String(shopData.phone_no)
            : (shopData.phoneNumber != null ? String(shopData.phoneNumber) : 'Phone number')
        );
        setShopImage(shopData.shop_image_url || shopData.image || null);

        setCategories(mapCategoryArray(catsData));
        setProducts(Array.isArray(prodsData) ? prodsData.map(normalizeProduct) : []);
      } catch (e) {
        setMsg({ text: e.message || 'Failed to load data', type: 'error' });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [sellerIdNum, token, navigation]);

  // Actions
  const handleSaveShop = async () => {
    if (!token) return;
    setSavingShop(true);
    try {
      const res = await fetch(`${API_BASE}${ENDPOINTS.updateShop}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          category: shopCategory, shopName, ownerName, phoneNumber, image: shopImage,
          shop_name: shopName, owner_namme: ownerName, shop_image_url: shopImage, phone_no: phoneNumber
        }),
      });
      const data = await safeJson(res);
      if (!res.ok) { setMsg({ text: data.message || `Failed to save shop (HTTP ${res.status})`, type: 'error' }); return; }
      setIsShopModalOpen(false);
      setMsg({ text: 'Shop saved.', type: 'success' });
      setTimeout(() => setMsg({ text: '', type: '' }), 2000);
    } catch { setMsg({ text: 'Cannot reach server.', type: 'error' }); }
    finally { setSavingShop(false); }
  };

  const handleAddProduct = async () => {
    const title = String(newProduct.title || '').trim();
    const type = String(newProduct.type || '').trim();
    const priceNum = Number(newProduct.price);
    if (!title || !type || isNaN(priceNum)) { setMsg({ text: 'Please fill Product Name, Category, and a valid Price.', type: 'error' }); return; }
    if (!sellerIdNum) { setMsg({ text: 'No seller id found. Login again.', type: 'error' }); return; }
    if (!token) { setMsg({ text: 'You must be logged in.', type: 'error' }); return; }

    setAdding(true);
    try {
      const res = await fetch(`${API_BASE}${ENDPOINTS.createProduct}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          shop_seller_id: sellerIdNum,
          category: type,
          product_name: title,
          quantity: newProduct.quantity || null,
          product_image_url: newProduct.image || null,
          price: priceNum,
        }),
      });
      const created = await safeJson(res);
      if (!res.ok) {
        setMsg({ text: `Failed to add product (HTTP ${res.status})${created?.message ? ': ' + created.message : ''}`, type: 'error' });
        return;
      }
      const normalized = created?.id ? normalizeProduct(created) : normalizeProduct({
        id: Date.now(), product_name: title, category: type, price: priceNum,
        product_image_url: newProduct.image || null, quantity: newProduct.quantity || null
      });
      setProducts(prev => [...prev, normalized]);
      setIsNewProductModalOpen(false);
      setNewProduct({ title: '', price: '', type: '', discount: '', image: '', quantity: '' });
      setMsg({ text: 'Product added.', type: 'success' });
      setTimeout(() => setMsg({ text: '', type: '' }), 2000);
    } catch { setMsg({ text: 'Cannot reach server. Check IP/port.', type: 'error' }); }
    finally { setAdding(false); }
  };

  const startEditProduct = (p) => {
    setEditProduct({
      id: p.id, title: p.title, price: String(p.price), type: p.type,
      image: p.image || '', quantity: p.quantity || ''
    });
    setIsEditProductModalOpen(true);
  };

  const handleSaveEditedProduct = async () => {
    if (!editProduct.id) { setMsg({ text: 'No product selected.', type: 'error' }); return; }
    const title = String(editProduct.title || '').trim();
    const type = String(editProduct.type || '').trim();
    const priceNum = Number(editProduct.price);
    if (!title || !type || isNaN(priceNum)) { setMsg({ text: 'Please fill Product Name, Category, and a valid Price.', type: 'error' }); return; }

    setUpdatingProduct(true);
    try {
      const res = await fetch(`${API_BASE}${ENDPOINTS.updateProduct(editProduct.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          category: type, product_name: title, quantity: editProduct.quantity || null,
          product_image_url: editProduct.image || null, price: priceNum,
        }),
      });
      const data = await safeJson(res);
      if (!res.ok) { setMsg({ text: data.message || `Failed to update product (HTTP ${res.status})`, type: 'error' }); return; }

      setProducts(prev => prev.map(p => p.id === editProduct.id ? {
        ...p, title, price: priceNum, type, image: editProduct.image || null, quantity: editProduct.quantity || ''
      } : p));
      setIsEditProductModalOpen(false);
      setMsg({ text: 'Product updated.', type: 'success' });
      setTimeout(() => setMsg({ text: '', type: '' }), 2000);
    } catch { setMsg({ text: 'Cannot reach server.', type: 'error' }); }
    finally { setUpdatingProduct(false); }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_BASE}${ENDPOINTS.deleteProduct(id)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }
      });
      const data = await safeJson(res);
      if (!res.ok) { setMsg({ text: data.message || `Failed to delete product (HTTP ${res.status})`, type: 'error' }); return; }
      setProducts(prev => prev.filter(p => p.id !== id));
      setMsg({ text: 'Product deleted.', type: 'success' });
      setTimeout(() => setMsg({ text: '', type: '' }), 2000);
    } catch { setMsg({ text: 'Cannot reach server.', type: 'error' }); }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image ? { uri: item.image } : LOGO} style={styles.cardImage} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.cardMeta}>₹{item.price} • {item.type || '—'}</Text>
        {item.quantity ? <Text style={styles.cardMeta}>Qty: {item.quantity}</Text> : null}
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => startEditProduct(item)}>
            <Ionicons name="create-outline" size={18} />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#ffe9e9' }]} onPress={() => handleDeleteProduct(item.id)}>
            <Ionicons name="trash-outline" size={18} color="#c00" />
            <Text style={[styles.actionText, { color: '#c00' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={LOGO} style={styles.logo} />
          <Text style={styles.headerTitle}>FreshMart • Admin</Text>
        </View>
        <TouchableOpacity onPress={() => setIsShopModalOpen(true)} style={styles.editChip}>
          <Ionicons name="create-outline" size={16} />
          <Text style={styles.editChipText}>Edit Shop</Text>
        </TouchableOpacity>
      </View>

      {/* Inline message */}
      {!!msg.text && (
        <Text style={[styles.inlineMsg, msg.type === 'error' ? styles.error : styles.success]}>{msg.text}</Text>
      )}

      {/* Banner */}
      <View style={styles.banner}>
        <Image source={shopImage ? { uri: shopImage } : LOGO} style={styles.bannerImg} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.bannerCategory}>{shopCategory}</Text>
          <Text style={styles.bannerTitle} numberOfLines={1}>{shopName}</Text>
          <Text style={styles.bannerLine}>{ownerName}</Text>
          <Text style={styles.bannerLine}>{phoneNumber}</Text>
        </View>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
        {FILTERS.map((btn) => (
          <TouchableOpacity
            key={btn}
            style={styles.filterBtn}
            onPress={() => btn === 'New Products' ? setIsNewProductModalOpen(true) : null}
          >
            <Text style={styles.filterText}>{btn}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 4 }}>
        {loading && categories.length === 0 ? (
          <Text style={{ paddingHorizontal: 12, color: '#666' }}>Loading categories…</Text>
        ) : (
          (categories.length ? categories : CATEGORY_OPTIONS).map((cat) => (
            <View key={cat} style={styles.catPill}>
              <Text style={styles.catPillText}>{cat}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Products */}
      {loading && products.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#00B14F" />
          <Text style={{ marginTop: 8, color: '#666' }}>Loading products…</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id ?? item.title + item.price)}
          renderItem={renderProduct}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}

      {/* Edit Shop Modal */}
      <Modal visible={isShopModalOpen} transparent animationType="slide" onRequestClose={() => setIsShopModalOpen(false)}>
        <View style={styles.modalWrap}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Shop Details</Text>

            <Text style={styles.lbl}>Category</Text>
            <View style={styles.inputLike}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {(categories.length ? categories : CATEGORY_OPTIONS).map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.pill, shopCategory === cat && styles.pillActive]}
                    onPress={() => setShopCategory(cat)}
                  >
                    <Text style={[styles.pillText, shopCategory === cat && styles.pillTextActive]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <Text style={styles.lbl}>Shop Name</Text>
            <TextInput style={styles.input} value={shopName} onChangeText={setShopName} placeholder="Shop name" />

            <Text style={styles.lbl}>Owner Name</Text>
            <TextInput style={styles.input} value={ownerName} onChangeText={setOwnerName} placeholder="Owner name" />

            <Text style={styles.lbl}>Phone Number</Text>
            <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone number" keyboardType="phone-pad" />

            <Text style={styles.lbl}>Image URL (optional)</Text>
            <TextInput style={styles.input} value={shopImage || ''} onChangeText={setShopImage} placeholder="https://.../image.jpg" />

            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.primaryBtn} onPress={handleSaveShop} disabled={savingShop}>
                <Text style={styles.primaryBtnText}>{savingShop ? 'Saving…' : 'Save'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn} onPress={() => setIsShopModalOpen(false)} disabled={savingShop}>
                <Text style={styles.secondaryBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* New Product Modal */}
      <Modal visible={isNewProductModalOpen} transparent animationType="slide" onRequestClose={() => setIsNewProductModalOpen(false)}>
        <View style={styles.modalWrap}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add New Product</Text>

            <Text style={styles.lbl}>Product Name *</Text>
            <TextInput style={styles.input} value={newProduct.title} onChangeText={(v) => setNewProduct({ ...newProduct, title: v })} placeholder="Eg: Tomato" />

            <Text style={styles.lbl}>Price *</Text>
            <TextInput style={styles.input} value={newProduct.price} onChangeText={(v) => setNewProduct({ ...newProduct, price: v })} placeholder="Eg: 50" keyboardType="numeric" />

            <Text style={styles.lbl}>Category *</Text>
            <View style={styles.inputLike}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {CATEGORY_OPTIONS.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.pill, newProduct.type === cat && styles.pillActive]}
                    onPress={() => setNewProduct({ ...newProduct, type: cat })}
                  >
                    <Text style={[styles.pillText, newProduct.type === cat && styles.pillTextActive]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <Text style={styles.lbl}>Quantity</Text>
            <TextInput style={styles.input} value={newProduct.quantity} onChangeText={(v) => setNewProduct({ ...newProduct, quantity: v })} placeholder="Eg: 1kg / 1L / 6pcs" />

            <Text style={styles.lbl}>Image URL (optional)</Text>
            <TextInput style={styles.input} value={newProduct.image} onChangeText={(v) => setNewProduct({ ...newProduct, image: v })} placeholder="https://.../image.jpg" />

            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.primaryBtn} onPress={handleAddProduct} disabled={adding}>
                <Text style={styles.primaryBtnText}>{adding ? 'Adding…' : 'Add Product'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn} onPress={() => setIsNewProductModalOpen(false)} disabled={adding}>
                <Text style={styles.secondaryBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Product Modal */}
      <Modal visible={isEditProductModalOpen} transparent animationType="slide" onRequestClose={() => setIsEditProductModalOpen(false)}>
        <View style={styles.modalWrap}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Product</Text>

            <Text style={styles.lbl}>Product Name *</Text>
            <TextInput style={styles.input} value={editProduct.title} onChangeText={(v) => setEditProduct({ ...editProduct, title: v })} placeholder="Product name" />

            <Text style={styles.lbl}>Price *</Text>
            <TextInput style={styles.input} value={editProduct.price} onChangeText={(v) => setEditProduct({ ...editProduct, price: v })} keyboardType="numeric" placeholder="Price" />

            <Text style={styles.lbl}>Category *</Text>
            <View style={styles.inputLike}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {CATEGORY_OPTIONS.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.pill, editProduct.type === cat && styles.pillActive]}
                    onPress={() => setEditProduct({ ...editProduct, type: cat })}
                  >
                    <Text style={[styles.pillText, editProduct.type === cat && styles.pillTextActive]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <Text style={styles.lbl}>Quantity</Text>
            <TextInput style={styles.input} value={editProduct.quantity} onChangeText={(v) => setEditProduct({ ...editProduct, quantity: v })} placeholder="Qty" />

            <Text style={styles.lbl}>Image URL (optional)</Text>
            <TextInput style={styles.input} value={editProduct.image} onChangeText={(v) => setEditProduct({ ...editProduct, image: v })} placeholder="https://.../image.jpg" />

            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.primaryBtn} onPress={handleSaveEditedProduct} disabled={updatingProduct}>
                <Text style={styles.primaryBtnText}>{updatingProduct ? 'Saving…' : 'Save'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn} onPress={() => setIsEditProductModalOpen(false)} disabled={updatingProduct}>
                <Text style={styles.secondaryBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: {
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 10, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center'
  },
  headerTitle: { fontSize: 18, fontWeight: '700', marginLeft: 8 },
  logo: { width: 28, height: 28, resizeMode: 'contain' },
  editChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#eef6ff', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16 },
  editChipText: { marginLeft: 6, fontWeight: '600', color: '#104e8b' },

  inlineMsg: { textAlign: 'center', padding: 8, marginTop: 8 },
  error: { color: '#c00' },
  success: { color: '#0a962e' },

  banner: { flexDirection: 'row', backgroundColor: '#fff', margin: 12, padding: 12, borderRadius: 12, alignItems: 'center', elevation: 1 },
  bannerImg: { width: 84, height: 84, borderRadius: 8, backgroundColor: '#f1f1f1' },
  bannerCategory: { color: '#00B14F', fontWeight: '700' },
  bannerTitle: { fontSize: 20, fontWeight: '800', marginVertical: 2 },
  bannerLine: { color: '#444' },

  filterBtn: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, marginHorizontal: 6, borderWidth: 1, borderColor: '#eee' },
  filterText: { fontWeight: '600', color: '#333' },

  catPill: { backgroundColor: '#eaf9f0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, marginHorizontal: 6 },
  catPillText: { color: '#0a7d3c', fontWeight: '700' },

  card: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 12, marginVertical: 6, padding: 12, borderRadius: 12, elevation: 1 },
  cardImage: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#f1f1f1' },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardMeta: { color: '#666', marginTop: 2 },
  cardActions: { flexDirection: 'row', gap: 10, marginTop: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#f5f5f5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  actionText: { fontWeight: '600', color: '#222' },

  modalWrap: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, padding: 16, maxHeight: '92%' },
  modalTitle: { fontSize: 18, fontWeight: '800', marginBottom: 10 },
  lbl: { fontWeight: '700', marginTop: 10, marginBottom: 6 },
  input: { backgroundColor: '#f7f7f7', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  inputLike: { backgroundColor: '#f7f7f7', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 8 },
  pill: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#ddd', marginRight: 8 },
  pillActive: { backgroundColor: '#dbf7e6', borderColor: '#00B14F' },
  pillText: { fontWeight: '600', color: '#333' },
  pillTextActive: { color: '#0a7d3c' },

  modalBtns: { flexDirection: 'row', gap: 10, marginTop: 16 },
  primaryBtn: { backgroundColor: '#00B14F', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10 },
  primaryBtnText: { color: '#fff', fontWeight: '800' },
  secondaryBtn: { backgroundColor: '#eee', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10 },
  secondaryBtnText: { color: '#222', fontWeight: '800' },
});
