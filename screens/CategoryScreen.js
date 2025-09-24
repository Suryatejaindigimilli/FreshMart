// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Platform,
//   StatusBar,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// // import { SafeAreaView } from 'react-native-safe-area-context';

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

// const CategoryScreen = () => {
//   const [products, setProducts] = useState(
//     initialProducts.map(item => ({ ...item, count: 0 }))
//   );

//   const increaseCount = (id) => {
//     setProducts(prev =>
//       prev.map(item =>
//         item.id === id ? { ...item, count: item.count + 1 } : item
//       )
//     );
//   };

//   const decreaseCount = (id) => {
//     setProducts(prev =>
//       prev.map(item =>
//         item.id === id && item.count > 0
//           ? { ...item, count: item.count - 1 }
//           : item
//       )
//     );
//   };

//   return (
//     <View style={styles.safeArea}>
//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity>
//             <Icon name="arrow-back" size={22} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Fruits & Vegetables</Text>
//           <TouchableOpacity>
//             <Icon name="search" size={22} color="#000" />
//           </TouchableOpacity>
//         </View>

//         {/* Filters */}
//         <ScrollView horizontal style={styles.filters} showsHorizontalScrollIndicator={false}>
//           <Text style={styles.filter}>🍌 Banana, Sapota & Papaya</Text>
//           <Text style={styles.filter}>🥝 Kiwi</Text>
//         </ScrollView>

//         {/* Products Grid */}
//         <FlatList
//           data={products}
//           keyExtractor={item => item.id}
//           numColumns={2}
//           contentContainerStyle={styles.productGrid}
//           renderItem={({ item }) => (
//             <View style={styles.productCard}>
//               <View style={styles.offerTag}>
//                 <Text style={styles.offerText}>{item.offer}</Text>
//               </View>
//               <Image source={item.image} style={styles.productImage} />
//               <Text style={styles.productPrice}>₹{item.price} <Text style={styles.oldPrice}>₹{item.oldPrice}</Text></Text>
//               <Text style={styles.productName}>{item.name}</Text>
//               <Text style={styles.productWeight}>{item.weight}</Text>

//               {item.count === 0 ? (
//                 <TouchableOpacity style={styles.addButton} onPress={() => increaseCount(item.id)}>
//                   <Icon name="add" size={18} color="#fff" />
//                 </TouchableOpacity>
//               ) : (
//                 <View style={styles.counterContainer}>
//                   <TouchableOpacity onPress={() => decreaseCount(item.id)} style={styles.counterButton}>
//                     <Icon name="remove" size={18} color="#fff" />
//                   </TouchableOpacity>
//                   <Text style={styles.counterText}>{item.count}</Text>
//                   <TouchableOpacity onPress={() => increaseCount(item.id)} style={styles.counterButton}>
//                     <Icon name="add" size={18} color="#fff" />
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </View>
//           )}
//         />

//         {/* Cart Button */}
//         <TouchableOpacity style={styles.cartButton}>
//           <Text style={styles.cartText}>View Cart</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 100,
//     backgroundColor: '#fff',
//   },
//   container: { flex: 1 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: { fontSize: 18, fontWeight: 'bold' },
//   filters: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//   },
//   filter: {
//     backgroundColor: '#e8f5e9',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     marginRight: 10,
//     fontSize: 13,
//     color: '#2e7d32',
//     fontWeight: '500',
//   },
//   productGrid: {
//     paddingHorizontal: 12,
//     paddingBottom: 100,
//   },
//   productCard: {
//     width: '47%',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 10,
//     margin: '1.5%',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     position: 'relative',
//   },
//   offerTag: {
//     position: 'absolute',
//     top: 8,
//     left: 8,
//     backgroundColor: '#2e7d32',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     zIndex: 1,
//   },
//   offerText: {
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   productImage: {
//     width: '100%',
//     height: 100,
//     resizeMode: 'contain',
//     marginBottom: 8,
//   },
//   productPrice: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   oldPrice: {
//     fontSize: 12,
//     color: '#888',
//     textDecorationLine: 'line-through',
//   },
//   productName: {
//     fontSize: 13,
//     color: '#333',
//     fontWeight: '500',
//   },
//   productWeight: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 8,
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     backgroundColor: '#00B14F',
//     borderRadius: 6,
//     padding: 6,
//   },
//   counterContainer: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     backgroundColor: '#00B14F',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//   },
//   counterButton: {
//     paddingHorizontal: 6,
//   },
//   counterText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     marginHorizontal: 6,
//   },
//   cartButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#00B14F',
//     borderRadius: 50,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     elevation: 4,
//   },
//   cartText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 13,
//   },
// });

// export default CategoryScreen;

// CategoryScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const initialProducts = [
  {
    id: '1',
    name: 'fresh! Tomato - Local',
    weight: '1 kg',
    price: 38,
    oldPrice: 65,
    offer: '42% OFF',
    label: 'Har Din Sasta!',
    image: require('../assets/tomato.png'),
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
  },
];

const CategoryScreen = ({ navigation }) => {
  const [products, setProducts] = useState(
    initialProducts.map(item => ({ ...item, count: 0, isFavorite: false }))
  );

  const toggleFavorite = (id) => {
    setProducts(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const increaseCount = (id) => {
    setProducts(prev =>
      prev.map(item =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decreaseCount = (id) => {
    setProducts(prev =>
      prev.map(item =>
        item.id === id && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const favoriteItems = products.filter(item => item.isFavorite);

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Fruits & Vegetables</Text>
          <TouchableOpacity onPress={() => navigation.navigate('FavouriteScreen', { favorites: favoriteItems })}>
            <Icon name="heart" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Products */}
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              {/* Favorite Icon */}
              <TouchableOpacity
                style={styles.favoriteIcon}
                onPress={() => toggleFavorite(item.id)}
              >
                <Icon
                  name={item.isFavorite ? 'heart' : 'heart-outline'}
                  size={20}
                  color={item.isFavorite ? 'red' : 'gray'}
                />
              </TouchableOpacity>

              <View style={styles.offerTag}>
                <Text style={styles.offerText}>{item.offer}</Text>
              </View>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productPrice}>₹{item.price} <Text style={styles.oldPrice}>₹{item.oldPrice}</Text></Text>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productWeight}>{item.weight}</Text>

              {item.count === 0 ? (
                <TouchableOpacity style={styles.addButton} onPress={() => increaseCount(item.id)}>
                  <Icon name="add" size={18} color="#fff" />
                </TouchableOpacity>
              ) : (
                <View style={styles.counterContainer}>
                  <TouchableOpacity onPress={() => decreaseCount(item.id)} style={styles.counterButton}>
                    <Icon name="remove" size={18} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{item.count}</Text>
                  <TouchableOpacity onPress={() => increaseCount(item.id)} style={styles.counterButton}>
                    <Icon name="add" size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
  },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  productGrid: {
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  productCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    margin: '1.5%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: 'relative',
  },
  offerTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#2e7d32',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  offerText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  oldPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  productName: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  productWeight: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#00B14F',
    borderRadius: 6,
    padding: 6,
  },
  counterContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#00B14F',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  counterButton: {
    paddingHorizontal: 6,
  },
  counterText: {
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
});

export default CategoryScreen;
