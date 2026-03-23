// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   PermissionsAndroid,
//   Platform,
//   TouchableOpacity,
//   Alert,
//   Image,
// } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';

// const KPHB_COORDS = {
//   latitude: 17.4931,
//   longitude: 78.3995,
// };

// function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
//   const R = 6371000;
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// async function req() {
//   if (Platform.OS !== 'android') return true;

//   const p = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
//   const has = await PermissionsAndroid.check(p);
//   if (has) return true;

//   const r = await PermissionsAndroid.request(p, {
//     title: 'Location Permission',
//     message: 'We need your location to check delivery availability.',
//     buttonPositive: 'Allow',
//     buttonNegative: 'Deny',
//   });

//   if (r === PermissionsAndroid.RESULTS.GRANTED) return true;

//   if (r === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//     Alert.alert(
//       'Permission Required',
//       'Enable location permission from Settings to continue.'
//     );
//   }

//   return false;
// }

// export default function LocationScreen({ navigation }) {
//   const [location, setLocation] = useState(null);
//   const [zone, setZone] = useState('KPHB');

//   useEffect(() => {
//     (async () => {
//       const ok = await req();
//       if (!ok) return;

//       Geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setLocation({ latitude, longitude });
//         },
//         (e) => {
//           Alert.alert('Location Error', e?.message || 'Unable to get location.');
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 15000,
//           maximumAge: 10000,
//           forceRequestLocation: true,
//           showLocationDialog: true,
//         }
//       );
//     })();
//   }, []);

//   const handleSubmit = () => {
//     if (zone !== 'KPHB') {
//       Alert.alert('Service Unavailable', 'Sorry, we are not available in your selected zone.');
//       return;
//     }

//     const u = location || { latitude: 17.4938, longitude: 78.3989 };

//     const distance = getDistanceFromLatLonInMeters(
//       u.latitude,
//       u.longitude,
//       KPHB_COORDS.latitude,
//       KPHB_COORDS.longitude
//     );

//     if (distance <= 1000) {
//       navigation.replace('MainTabs');
//     } else {
//       Alert.alert('Service Unavailable', 'Sorry, you are outside our delivery area.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../assets/location.png')}
//         style={styles.image}
//         resizeMode="contain"
//       />

//       <Text style={styles.title}>Select Your Location</Text>
//       <Text style={styles.subtitle}>
//         Switch on your location to stay in tune with what’s happening in your area
//       </Text>

//       <Text style={styles.label}>Your Zone</Text>
//       <View style={styles.pickerWrapper}>
//         <Picker selectedValue={zone} onValueChange={setZone} style={styles.picker}>
//           <Picker.Item label="KPHB" value="KPHB" />
//           <Picker.Item label="Other Zone" value="Other" />
//         </Picker>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 25,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: 140,
//     height: 140,
//     alignSelf: 'center',
//     marginTop: 40,
//     marginBottom: 20,
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 6,
//   },
//   subtitle: {
//     textAlign: 'center',
//     color: '#777',
//     fontSize: 13,
//     marginBottom: 30,
//   },
//   label: {
//     fontWeight: '500',
//     marginTop: 10,
//     marginBottom: 5,
//     fontSize: 14,
//     color: '#555',
//   },
//   pickerWrapper: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   picker: {
//     color: '#000',
//     fontSize: 14,
//   },
//   button: {
//     backgroundColor: '#3CB371',
//     paddingVertical: 14,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Picker } from '@react-native-picker/picker';

const KPHB_COORDS = { latitude: 17.4931, longitude: 78.3995 };

function distm(a1, o1, a2, o2) {
  const R = 6371000;
  const dA = ((a2 - a1) * Math.PI) / 180;
  const dO = ((o2 - o1) * Math.PI) / 180;
  const x =
    Math.sin(dA / 2) * Math.sin(dA / 2) +
    Math.cos((a1 * Math.PI) / 180) *
      Math.cos((a2 * Math.PI) / 180) *
      Math.sin(dO / 2) *
      Math.sin(dO / 2);
  return R * (2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)));
}

async function req() {
  if (Platform.OS !== 'android') return true;
  const p = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
  const has = await PermissionsAndroid.check(p);
  if (has) return true;

  const r = await PermissionsAndroid.request(p, {
    title: 'Location Permission',
    message: 'We need your location to check delivery availability.',
    buttonPositive: 'Allow',
    buttonNegative: 'Deny',
  });

  if (r === PermissionsAndroid.RESULTS.GRANTED) return true;

  if (r === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    Alert.alert('Permission Required', 'Enable location permission from Settings.');
  }
  return false;
}

export default function LocationScreen({ navigation }) {
  const [loc, setLoc] = useState(null);
  const [zone, setZone] = useState('KPHB');
  const [open, setOpen] = useState(false);

  const getLoc = async () => {
    const ok = await req();
    if (!ok) return;

    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLoc({ latitude, longitude });
      },
      (e) => {
        Alert.alert('Location Error', e?.message || 'Unable to get location.');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
  };

  useEffect(() => {
    getLoc();
  }, []);

  const handleSubmit = () => {
    if (zone !== 'KPHB') {
      Alert.alert('Service Unavailable', 'Sorry, we are not available in your selected zone.');
      return;
    }

    const u = loc || { latitude: 17.4938, longitude: 78.3989 };
    const d = distm(u.latitude, u.longitude, KPHB_COORDS.latitude, KPHB_COORDS.longitude);

    if (d <= 1000) {
      if (navigation.canGoBack()) navigation.goBack();
      else navigation.replace('MainTabs');
    } else {
      Alert.alert('Service Unavailable', 'Sorry, you are outside our delivery area.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/location.png')} style={styles.image} resizeMode="contain" />

      <Text style={styles.title}>Delivery Location</Text>
      <Text style={styles.subtitle}>
        Tap below to change where you want your items delivered.
      </Text>

      {/* ✅ Location text as a BUTTON */}
      <TouchableOpacity style={styles.locBtn} onPress={() => setOpen(true)}>
        <Text style={styles.locBtnText}>{zone} (Tap to change)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={getLoc}>
        <Text style={styles.secondaryBtnText}>Use Current Location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* ✅ Modal for changing location */}
      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={styles.mOverlay}>
          <View style={styles.mBox}>
            <Text style={styles.mTitle}>Select Delivery Zone</Text>

            <View style={styles.pickerWrap}>
              <Picker selectedValue={zone} onValueChange={setZone} style={styles.picker}>
                <Picker.Item label="KPHB" value="KPHB" />
                <Picker.Item label="Other Zone" value="Other" />
              </Picker>
            </View>

            <View style={styles.mRow}>
              <TouchableOpacity style={styles.mBtn2} onPress={() => setOpen(false)}>
                <Text style={styles.mBtn2Text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mBtn1} onPress={() => setOpen(false)}>
                <Text style={styles.mBtn1Text}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff' },
  image: { width: 140, height: 140, alignSelf: 'center', marginTop: 40, marginBottom: 20 },
  title: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  subtitle: { textAlign: 'center', color: '#777', fontSize: 13, marginBottom: 24 },

  locBtn: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: '#fafafa',
  },
  locBtnText: { fontSize: 15, fontWeight: '700', color: '#111', textAlign: 'center' },

  secondaryBtn: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#3CB371',
    borderRadius: 10,
    paddingVertical: 12,
  },
  secondaryBtnText: { color: '#3CB371', fontWeight: '700', fontSize: 14, textAlign: 'center' },

  button: { backgroundColor: '#3CB371', paddingVertical: 14, borderRadius: 10, marginTop: 14 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },

  mOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  mBox: { backgroundColor: '#fff', padding: 16, borderTopLeftRadius: 18, borderTopRightRadius: 18 },
  mTitle: { fontSize: 16, fontWeight: '800', marginBottom: 10 },
  pickerWrap: { borderWidth: 1, borderColor: '#eee', borderRadius: 10, overflow: 'hidden' },
  picker: { color: '#000' },
  mRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  mBtn1: { flex: 1, backgroundColor: '#3CB371', paddingVertical: 12, borderRadius: 10 },
  mBtn1Text: { color: '#fff', fontWeight: '800', textAlign: 'center' },
  mBtn2: { flex: 1, borderWidth: 1, borderColor: '#ddd', paddingVertical: 12, borderRadius: 10 },
  mBtn2Text: { color: '#111', fontWeight: '800', textAlign: 'center' },
});


