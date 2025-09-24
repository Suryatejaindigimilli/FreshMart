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
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const KPHB_COORDS = {
  latitude: 17.4931,
  longitude: 78.3995,
};

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function LocationScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [zone, setZone] = useState('KPHB');

  // const [area, setArea] = useState('');
  // const [areaList, setAreaList] = useState([]);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestPermission();
      if (!hasPermission) return;

      Geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    fetchLocation();

    // const fetchAreas = async () => {
    //   try {
    //     const res = await axios.get('http://192.168.0.100:3000/areas', {
    //       params: {
    //         lat: KPHB_COORDS.latitude,
    //         lng: KPHB_COORDS.longitude,
    //       },
    //     });
    //     setAreaList(res.data);
    //   } catch (err) {
    //     console.error('Error fetching areas:', err.message);
    //   }
    // };

    // fetchAreas();
  }, []);

  const handleSubmit = () => {
    if (zone !== 'KPHB') {
      Alert.alert('Service Unavailable', 'Sorry, we are not available in your selected zone.');
      return;
    }

    // if (area) {
      const mockUserLocation = {
        latitude: 17.4938,
        longitude: 78.3989,
      };

      const distance = getDistanceFromLatLonInMeters(
        mockUserLocation.latitude,
        mockUserLocation.longitude,
        KPHB_COORDS.latitude,
        KPHB_COORDS.longitude
      );

      if (distance <= 1000) {
        navigation.replace('MainTabs');
      } else {
        Alert.alert('Service Unavailable', 'Sorry, you are outside our delivery area.');
      }
    // } else {
    //   Alert.alert('Incomplete Selection', 'Please select a valid area.');
    // }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/location.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Select Your Location</Text>
      <Text style={styles.subtitle}>
        Switch on your location to stay in tune with what’s happening in your area
      </Text>

      <Text style={styles.label}>Your Zone</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={zone} onValueChange={setZone} style={styles.picker}>
          <Picker.Item label="KPHB" value="KPHB" />
          <Picker.Item label="Other Zone" value="Other" />
        </Picker>
      </View>

      {/* <Text style={styles.label}>Your Area</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={area} onValueChange={setArea} style={styles.picker}>
          <Picker.Item label="Select your area" value="" />
          {areaList.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View> */}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
  },
  image: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    fontSize: 13,
    marginBottom: 30,
  },
  label: {
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
    color: '#555',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
  },
  picker: {
    color: '#000',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3CB371',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
