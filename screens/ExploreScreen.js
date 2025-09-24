import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const products = [
  {
    id: '1',
    name: 'Egg Chicken Red',
    desc: '4pcs, Price',
    price: '$1.99',
    image: require('../assets/egg-red.png'),
  },
  {
    id: '2',
    name: 'Egg Chicken White',
    desc: '180g, Price',
    price: '$1.50',
    image: require('../assets/egg-white.png'),
  },
  {
    id: '3',
    name: 'Egg Pasta',
    desc: '30gm, Price',
    price: '$15.99',
    image: require('../assets/pasta.png'),
  },
  {
    id: '4',
    name: 'Egg Noodles',
    desc: '2L, Price',
    price: '$15.99',
    image: require('../assets/noodles1.png'),
  },
  {
    id: '5',
    name: 'Mayonnais Eggless',
    desc: '325ml, Price',
    price: '$5.99',
    image: require('../assets/mayo.png'),
  },
  {
    id: '6',
    name: 'Egg Noodles',
    desc: '330ml, Price',
    price: '$6.99',
    image: require('../assets/noodles2.png'),
  },
];

const ExploreScreen = () => {
  const [search, setSearch] = useState('');

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productDesc}>{item.desc}</Text>
      <View style={styles.cardBottom}>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#aaa" />
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <TouchableOpacity>
          <Icon name="options-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 15 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    margin: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '48%',
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
  },
  productDesc: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#3CB371',
    padding: 6,
    borderRadius: 20,
  },
});

export default ExploreScreen;
