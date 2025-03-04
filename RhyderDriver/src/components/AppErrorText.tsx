import React from 'react';
import {StyleSheet} from 'react-native';
import AppText from './AppText';
import useTheme from '../hooks/useTheme';

interface AppErrorTextProps {
  children: React.ReactNode;
}

const AppErrorText: React.FC<AppErrorTextProps> = ({children}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    errorText: {
      color: theme.colors.error,
      fontSize: theme.fontSize.font_12,
      marginTop: theme.margin.margin_5,
    },
  });

  return <AppText style={styles.errorText}>{children}</AppText>;
};

export default AppErrorText;
