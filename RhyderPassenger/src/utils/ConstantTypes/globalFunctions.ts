import {Platform} from 'react-native';
import {removeStorageItem} from '../Storage/storage';
import {STORAGE_KEY} from '../Storage/storageKeys';

// Validate file size
export const isFileSizeValid = (
  size: number,
  minSizeKB: number = 400,
  maxSizeKB: number = 800,
) => {
  const sizeKB = size / 1024; // Convert bytes to KB
  return sizeKB >= minSizeKB && sizeKB <= maxSizeKB;
};

export const prepareFormData = (file: any, fieldName = 'file') => {
  const formData = new FormData();
  formData.append(fieldName, {
    uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
    name: file.name || 'upload.jpg',
    type: file.type || 'image/jpeg',
  });

  return formData;
};

export const clearUserAllData = () => {
  removeStorageItem(STORAGE_KEY.AUTH_TOKEN);
  removeStorageItem(STORAGE_KEY.REFRESH_TOKEN);
  removeStorageItem(STORAGE_KEY.USER_DETAIL);
};
