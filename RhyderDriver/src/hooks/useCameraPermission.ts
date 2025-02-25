import { useEffect, useState } from "react";
import { Alert, Platform, Linking } from "react-native";
import { PERMISSIONS, RESULTS, request, check } from "react-native-permissions";
import ImagePicker from "react-native-image-crop-picker";

export const useCameraPermission = () => {
  const [cameraPermission, setCameraPermission] = useState<string | null>(null);

  const getCameraPermissionType = () =>
    Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

  // Check camera permission status
  const checkPermission = async () => {
    const permissionType = getCameraPermissionType();
    const result = await check(permissionType);
    setCameraPermission(result);
    return result;
  };

  // Request camera permission
  const requestCameraPermission = async () => {
    const permissionType = getCameraPermissionType();
    const result = await request(permissionType);
    setCameraPermission(result);

    switch (result) {
      case RESULTS.GRANTED:
        return true;

      case RESULTS.BLOCKED || RESULTS.DENIED:
        Alert.alert(
          "Permission Blocked or Denied",
          "Camera access is permanently denied. Please enable it from settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
        return false;

      case RESULTS.UNAVAILABLE:
        Alert.alert("Feature Unavailable", "Your device does not support camera access.");
        return false;

      default:
        return false;
    }
  };

  // Open camera using Image Picker
  const openCamera = async () => {
    const permissionStatus = await checkPermission();

    if (permissionStatus === RESULTS.GRANTED) {
      try {
        const image = await ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        });
        return image;
      } catch (error) {
        console.log("Camera Error: ", error);
      }
    } else {
      const granted = await requestCameraPermission();
      if (granted) {
        return openCamera();
      }
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return { cameraPermission, requestCameraPermission, openCamera };
};
