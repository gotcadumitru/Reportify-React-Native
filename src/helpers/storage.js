import AsyncStorage from '@react-native-async-storage/async-storage';
export const getAllStorageData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items;
  } catch (error) {}
};

export const setStorageData = async (name, value) => {
  return AsyncStorage.setItem(name, JSON.stringify(value));
};
export const getStorageData = async key => {
  return AsyncStorage.getItem(key);
};
export const removeStorageData = async key => {
  return AsyncStorage.removeItem(key);
};

export const clearStorageData = async () => {
  return AsyncStorage.clear();
};
