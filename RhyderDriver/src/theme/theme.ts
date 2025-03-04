import {Appearance} from 'react-native';

const commonColors = {
  primary: '#007AFF',
  secondary: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  success: '#4CD964',
};

const commonFontSize = {
  font_10: 10,
  font_12: 12,
  font_14: 14,
  font_16: 16,
  font_18: 18,
  font_20: 20,
  font_22: 22,
  font_24: 24,
  font_25: 25,
  font_26: 26,
  font_30: 30,
  font_32: 32,
};

const commonFontName = {
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
};

const commonSpacingg = {
  spacing_4: 4,
  spacing_8: 8,
  spacing_10: 10,
  spacing_12: 12,
  spacing_16: 16,
  spacing_24: 24,
  spacing_20: 20,
  spacing_32: 32,
};

const commonMargin = {
  margin_12: 12,
  margin_5: 5,
  margin_4: 4,
  margin_8: 8,
  margin_10: 10,
  margin_16: 16,
  margin_24: 24,
  margin_20: 20,
  margin_32: 32,
  margin_40: 40,
};

const lightTheme = {
  colors: {
    ...commonColors,
    background: '#FFFFFF',
    text: '#000000',
    border: '#E5E5E5',
    textInputInActiveBorder: '#E0E0E0',
    primary: '#d566fc',
    purple: '#C471ED',
    pink: '#FF5F9B',
    white: '#fbfbfb',
    black: '#000',
    gray: '#8b8b8b',
    gray_light: '#888',
    blue: '#8ec0fc',
    blue_60: '#007BFF',
    link: '#53a1fd',
    primary_button_gradient: ['#d566fc', '#ec61cd', '#fd5ea9'],
    disabled_button_gradient: ['#d3d3d3', '#a9a9a9'],
    modal_background_color: 'rgba(0, 0, 0, 0.3)',
    loader_default_color: '#6200EE',
    previewModal_background_color: 'rgba(0, 0, 0, 0.6)',
    previewModal_background_color_2: 'rgba(0, 0, 0, 0.2)',
    red: 'red',
    input_label_color: '#333',
  },
  fontSize: {
    ...commonFontSize,
  },
  fontName: {
    ...commonFontName,
  },
  spacing: {
    ...commonSpacingg,
    spacing_15:15,
  },
  margin: {
    ...commonMargin,
    margin_2: 2,
    margin_15: 15,
    margin_30: 30,
  },
  radius: {
    borderRadius_5: 5,
    borderRadius_15: 15,
    borderRadius_10: 10,
    borderRadius_20: 20,
    borderRadius_25: 25,
    borderRadius_30: 30,
  },
};

const darkTheme = {
  ...commonColors,
  background: '#121212',
  text: '#FFFFFF',
  border: '#333333',
};

const typography = {
  heading: {fontSize: 24, fontWeight: 'bold'},
  subheading: {fontSize: 20, fontWeight: '600'},
  body: {fontSize: 16, fontWeight: '400'},
};

export const getTheme = () =>
  Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;

export default {
  lightTheme,
  darkTheme,
  typography,
};
