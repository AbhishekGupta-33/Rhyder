import { Platform, Dimensions, PixelRatio, Appearance } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
export const PIXEL_RATIO = PixelRatio.get();
export const isDarkMode = () => Appearance.getColorScheme() === "dark";
export const scaleFont = (size: number) => Math.round(size * (SCREEN_WIDTH / 375));
export const isSmallDevice = SCREEN_WIDTH < 360;

/**
 * Checks internet connectivity.
 */
export const isInternetAvailable = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.isConnected ?? false;
};
