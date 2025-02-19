import React from 'react';
import {StyleSheet} from 'react-native';
import AppText from './AppText';

interface AppErrorTextProps {
   children: React.ReactNode;
}

const AppErrorText: React.FC<AppErrorTextProps> = ({children}) => (
  <AppText style={styles.errorText}>{children}</AppText>
);

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default AppErrorText;
