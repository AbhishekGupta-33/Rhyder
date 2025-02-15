import { Appearance } from "react-native";

const commonColors = {
  primary: "#007AFF",
  secondary: "#34C759",
  error: "#FF3B30",
  warning: "#FF9500",
  success: "#4CD964",
};

const lightTheme = {
  ...commonColors,
  background: "#FFFFFF",
  text: "#000000",
  border: "#E5E5E5",
};

const darkTheme = {
  ...commonColors,
  background: "#121212",
  text: "#FFFFFF",
  border: "#333333",
};

const typography = {
  heading: { fontSize: 24, fontWeight: "bold" },
  subheading: { fontSize: 20, fontWeight: "600" },
  body: { fontSize: 16, fontWeight: "400" },
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const getTheme = () => (Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme);

export default { lightTheme, darkTheme, typography, spacing };
