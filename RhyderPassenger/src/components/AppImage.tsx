import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import { appImage } from '../utils/Constants';

interface AppImageProps {
  source: any;
  style?: object;
  placeholderSource?: any;
}

const AppImage: React.FC<AppImageProps> = ({
  source,
  style,
  placeholderSource = {uri: appImage.staticImage},
}) => {
  const [loading, setLoading] = useState(true);

  const loadedPlaceholderSource = placeholderSource ? placeholderSource : {uri: appImage.staticImage}

  return (
    <View style={[styles.container, style]}>
      {loading && (
        <FastImage
          source={loadedPlaceholderSource}
          style={[styles.image, styles.placeholder]}
        />
      )}
      <FastImage
        source={source}
        style={[styles.image, style]}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
});

export default AppImage;
