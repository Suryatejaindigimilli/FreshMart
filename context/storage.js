import AsyncStorage from '@react-native-async-storage/async-storage';

export async function jget(k, fb = null) {
  try {
    const s = await AsyncStorage.getItem(k);
    return s ? JSON.parse(s) : fb;
  } catch {
    return fb;
  }
}

export async function jset(k, v) {
  try {
    await AsyncStorage.setItem(k, JSON.stringify(v));
    return true;
  } catch {
    return false;
  }
}

export async function jdel(k) {
  try {
    await AsyncStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export async function jmultiDel(keys) {
  try {
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch {
    return false;
  }
}
