/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const posters = [
  require('../assets/poster1.png'),
  require('../assets/poster2.png'),
  require('../assets/poster3.png'),
  require('../assets/poster4.png'),
];

const HomeScreen = ({ route, navigation }) => {
  const userLocation = route?.params?.location || 'KBPB';
  const scrollRef = useRef();
  const [posterIndex, setPosterIndex] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [recommendedShops, setRecommendedShops] = useState([]);
  const [loadingShops, setLoadingShops] = useState(true);

  // Function to fetch JWT from AsyncStorage
  const getJwtToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('JWT Token:', token);  // Log the token for debugging
      return token;
    } catch (error) {
      console.error('Error retrieving JWT:', error);
      return null;
    }
  };

  // Function to fetch categories
  const fetchCategories = async () => {
    const token = await getJwtToken();
    if (token) {
      axios.get('http://192.168.1.36:5000/categories', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          console.log('Categories Response:', res.data); // Log response
          setCategories(res.data);
        })
        .catch(err => {
          console.error('Category Error:', err.message);  // Log error
        })
        .finally(() => {
          setLoadingCategories(false);
        });
    } else {
      console.log('No token found');
      setLoadingCategories(false);  // Stop loading if no token
    }
  };

  // Function to fetch recommended shops
  const fetchShops = async () => {
    const token = await getJwtToken();
    if (token) {
      console.log('Fetching shops with token...');
      axios.get('http://192.168.1.36:5000/shops', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          console.log('Shops Response:', res.data);  // Log response
          setRecommendedShops(res.data);
        })
        .catch(err => {
          console.error('Shops Error:', err.message);  // Log error
        })
        .finally(() => {
          setLoadingShops(false);
        });
    } else {
      console.log('No token found');
      setLoadingShops(false);  // Stop loading if no token
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (posterIndex + 1) % posters.length;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setPosterIndex(nextIndex);
    }, 2000);
    return () => clearInterval(interval);
  }, [posterIndex]);

  // Fetch data when component mounts
  useEffect(() => {
    fetchCategories();
    fetchShops();
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Location Header */}
        <View style={styles.headerRow}>
          <View style={styles.locationBox}>
            <Icon name="location-outline" size={18} color="#00B14F" />
            <Text style={styles.locationText}>{userLocation}</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <Icon name="search-outline" size={18} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Search for groceries"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
        </View>

        {/* Poster Carousel */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          style={styles.posterScroll}
        >
          {posters.map((item, index) => (
            <Image key={index} source={item} style={styles.poster} />
          ))}
        </ScrollView>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        {loadingCategories ? (
          <ActivityIndicator size="small" color="#00B14F" style={{ marginVertical: 10 }} />
        ) : (
          <>
            <View style={styles.gridContainer}>
              {categories.slice(0, 4).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.gridItem}
                  onPress={() => navigation.navigate('CategoryScreen', { category: item })}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: item.cat_url }} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>{item.cat_name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {categories.length > 4 && (
              <>
                <Text style={[styles.sectionTitle, { marginBottom: 5 }]}>More Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                  {categories.slice(4).map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.scrollItem}
                      // eslint-disable-next-line no-alert
                      onPress={() => alert(`You clicked on ${item.cat_name}`)}
                      activeOpacity={0.8}
                    >
                      <Image source={{ uri: item.cat_url }} style={styles.scrollImage} />
                      <Text style={styles.scrollText}>{item.cat_name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}
          </>
        )}

        {/* Recommended Shops */}
        <Text style={styles.sectionTitle}>Recommended Shops</Text>
        {loadingShops ? (
          <ActivityIndicator size="small" color="#00B14F" style={{ marginVertical: 10 }} />
        ) : (
          recommendedShops.map((shop) => (
            <TouchableOpacity
              key={shop.id}
              style={styles.shopCard}
              onPress={() => navigation.navigate('ShopProfileScreen', { shop })}
              activeOpacity={0.8}
            >
              <Image source={{ uri: shop.shop_image_url }} style={styles.shopImage} />
              <View style={styles.shopInfo}>
                <Text style={styles.shopName}>{shop.shop_name}</Text>
                <Text style={styles.shopOwner}>Owner: {shop.owner_namme}</Text>
                <View style={styles.ratingRow}>
                  <Text style={styles.shopDistance}>Near you</Text>
                  <Text style={styles.shopRating}>4.5 ⭐</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  searchWrapper: {
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    opacity: 80,
  },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, fontSize: 14, paddingVertical: 10 },
  posterScroll: { height: 120 },
  poster: { width: width, height: 120, marginTop: 10, paddingBottom: 100, resizeMode: 'contain' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', margin: 15 },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  gridItem: {
    width: '47%',
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#D9F3E4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    elevation: 2,
  },
  categoryImage: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  categoryText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
    color: '#222',
  },
  horizontalScroll: {
    paddingLeft: 15,
    paddingVertical: 10,
  },
  scrollItem: {
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#D9F3E4',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 2,
  },
  scrollImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  scrollText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
  },
  shopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 12,
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: 'relative',
  },
  shopImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
    marginRight: 12,
  },
  shopInfo: {
    flex: 1,
    marginRight: 10,
  },
  shopName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  shopOwner: {
    fontSize: 13,
    paddingBottom: 20,
    color: '#666',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  shopDistance: {
    fontSize: 12,
    paddingTop: 10,
    color: '#2e7d32',
  },
  shopRating: {
    paddingTop: 10,
    fontSize: 12,
    color: '#ffaa00',
    fontWeight: '600',
  },
  favoriteIcon: {
    padding: 6,
  },
});

export default HomeScreen;

