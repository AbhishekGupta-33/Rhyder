import React from 'react';
import {View, Modal, ActivityIndicator, StyleSheet} from 'react-native';

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
    <Modal visible={loading} transparent animationType="fade">
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
    padding: 20,
    borderRadius: 10,
  },
});
