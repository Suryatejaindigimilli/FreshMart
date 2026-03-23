// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';

// import HomeScreen from '../screens/HomeScreen';
// import FavouriteScreen from '../screens/FavouriteScreen';
// import AccountScreen from '../screens/AccountScreen';
// // import CartScreen from '../screens/CartScreen';

// const Tab = createBottomTabNavigator();

// export default function MainTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarActiveTintColor: '#00B14F',
//         tabBarInactiveTintColor: '#777',
//         tabBarStyle: {
//           backgroundColor: '#fff',
//           borderTopWidth: 1,
//           borderTopColor: '#eee',
//           height: 60,
//         },
//         tabBarIcon: ({ color, size }) => {
//           let n = 'storefront-outline';
//           if (route.name === 'Favourite') n = 'heart-outline';
//           else if (route.name === 'Account') n = 'person-outline';
//           // else if (route.name === 'Cart') n = 'cart-outline';
//           return <Icon name={n} size={size} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen name="Shop" component={HomeScreen} />
//       {/* <Tab.Screen name="Cart" component={CartScreen} /> */}
//       <Tab.Screen name="Favourite" component={FavouriteScreen} />
//       <Tab.Screen name="Account" component={AccountScreen} />
//     </Tab.Navigator>
//   );
// }


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ShopDetailsScreen from '../screens/ShopProfileScreen';

import FavouriteScreen from '../screens/FavouriteScreen';

import AccountScreen from '../screens/AccountScreen';
import EditAccountScreen from '../screens/EditAccountScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const ShopStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();

function ShopStackNav() {
  return (
    <ShopStack.Navigator screenOptions={{ headerShown: false }}>
      <ShopStack.Screen name="HomeScreen" component={HomeScreen} />
      <ShopStack.Screen name="CategoryScreen" component={CategoryScreen} />
      <ShopStack.Screen name="ShopDetailsScreen" component={ShopDetailsScreen} />
    </ShopStack.Navigator>
  );
}

function AccountStackNav() {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name="AccountScreen" component={AccountScreen} />
      <AccountStack.Screen name="EditAccountScreen" component={EditAccountScreen} />
      <AccountStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </AccountStack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00B14F',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          let n = 'storefront-outline';
          if (route.name === 'Favourite') n = 'heart-outline';
          else if (route.name === 'Account') n = 'person-outline';
          return <Icon name={n} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Shop" component={ShopStackNav} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="Account" component={AccountStackNav} />
    </Tab.Navigator>
  );
}
