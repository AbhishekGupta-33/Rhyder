import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import { Modal } from 'react-native-paper';

type LoaderProps = {
  loading: boolean;
  size?: 'small' | 'large';
  color?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading,
  size = 'large',
  color = '#6200EE',
}) => {
  return (
    <Modal visible={loading}
     >
      <View style={styles.container}>
        <ActivityIndicator
          size={size}
          color={color}
          style={styles.loaderContainerStyle}
        />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
  },
  loaderContainerStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
  },
});
