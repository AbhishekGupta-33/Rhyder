import React from 'react';
import {View, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import useTheme from '../hooks/useTheme';

type LoaderProps = {
  loading: boolean;
  size?: 'small' | 'large';
  color?: string;
};

const Loader: React.FC<LoaderProps> = ({loading, size = 'large', color}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.modal_background_color, // Semi-transparent background
    },
    loaderContainerStyle: {
      backgroundColor: 'white',
      padding: theme.spacing.spacing_20,
      borderRadius: theme.radius.borderRadius_10,
    },
  });

  return (
    <Modal visible={loading} transparent animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator
          size={size}
          color={color || theme.colors.loader_default_color}
          style={styles.loaderContainerStyle}
        />
      </View>
    </Modal>
  );
};

export default Loader;
