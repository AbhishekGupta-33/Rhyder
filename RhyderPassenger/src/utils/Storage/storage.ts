import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();
storage.recrypt('hunter2')

export const setStorageItem = (key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const getStorageItem = (key: string) => {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
};

export const removeStorageItem = (key: string) => {
  storage.delete(key);
};
