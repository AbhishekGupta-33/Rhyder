import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {appImage} from '../utils/Constants';
interface AppImageProps {
  source: any;
  style?: object;
}

const AppImage: React.FC<AppImageProps> = ({source, style, ...res}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {!isLoaded && (
        <FastImage
          source={{uri: appImage.staticImage}}
          style={[styles.image, style]}
        />
      )}
      <FastImage
        source={
          source?.uri === '' || !isLoaded ? {uri: appImage.staticImage} : source
        }
        style={[styles.image, style, !isLoaded && styles.hidden]}
        {...res}
        onLoadStart={() => setIsLoaded(false)}
        onLoad={() => {
          setIsLoaded(true);
        }}
        onError={() => {
          setIsError(true);
        }}
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
  hidden: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
});

export default AppImage;
