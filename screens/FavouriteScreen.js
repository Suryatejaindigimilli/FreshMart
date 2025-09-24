// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const favorites = [
//   {
//     id: '1',
//     name: 'Sprite Can',
//     desc: '325ml, Price',
//     price: '$1.50',
//     image: require('../assets/sprite.png'),
//   },
//   {
//     id: '2',
//     name: 'Diet Coke',
//     desc: '355ml, Price',
//     price: '$1.99',
//     image: require('../assets/diet-coke.png'),
//   },
//   {
//     id: '3',
//     name: 'Apple & Grape Juice',
//     desc: '2L, Price',
//     price: '$15.50',
//     image: require('../assets/juice.png'),
//   },
//   {
//     id: '4',
//     name: 'Coca Cola Can',
//     desc: '325ml, Price',
//     price: '$4.99',
//     image: require('../assets/coke.png'),
//   },
//   {
//     id: '5',
//     name: 'Pepsi Can',
//     desc: '330ml, Price',
//     price: '$4.99',
//     image: require('../assets/pepsi.png'),
//   },
// ];

// const FavouriteScreen = () => {
//   const renderItem = ({ item }) => (
//     <View style={styles.itemRow}>
//       <Image source={item.image} style={styles.itemImage} />
//       <View style={styles.itemTextContainer}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <Text style={styles.itemDesc}>{item.desc}</Text>
//       </View>
//       <View style={styles.itemRight}>
//         <Text style={styles.itemPrice}>{item.price}</Text>
//         <Icon name="chevron-forward" size={18} color="#000" />
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Favourite</Text>
//       <FlatList
//         data={favorites}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 120 }}
//       />

//       <TouchableOpacity style={styles.addButton}>
//         <Text style={styles.addButtonText}>Add All To Cart</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 50,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   itemRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//   },
//   itemImage: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//   },
//   itemTextContainer: {
//     flex: 1,
//     marginHorizontal: 10,
//   },
//   itemName: {
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
//   itemDesc: {
//     color: '#666',
//     fontSize: 12,
//   },
//   itemRight: {
//     alignItems: 'flex-end',
//   },
//   itemPrice: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: '#3CB371',
//     padding: 16,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default FavouriteScreen;

// FavouriteScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FavouriteScreen = ({ route }) => {
  const favorites = route.params?.favorites || [];

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDesc}>{item.weight}</Text>
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        <Icon name="chevron-forward" size={18} color="#000" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favourite</Text>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add All To Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    // paddingTop: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  itemTextContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  itemDesc: {
    color: '#666',
    fontSize: 12,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#3CB371',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavouriteScreen;
