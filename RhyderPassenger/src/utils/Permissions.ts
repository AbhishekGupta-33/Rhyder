import { request, PERMISSIONS, check, RESULTS, Permission } from "react-native-permissions";
import { Platform } from "react-native";

export const requestCameraPermission = async () => {
  const permission = Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  const result = await request(permission);
  return result === RESULTS.GRANTED;
};

export const getCameraPermission = (): Permission =>
    Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    })!;
  
  export const getStoragePermission = (): Permission =>
    Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: Number(Platform.Version) >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    })!;