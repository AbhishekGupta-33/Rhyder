import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AppText from './AppText';

interface HeaderProps {
  headerTitle: string;
  onInfoPress?: () => void;
  onBackPress?: () => void;
}

const AppHeader: React.FC<HeaderProps> = ({
  headerTitle,
  onInfoPress,
  onBackPress,
}) => {
  const LeftView = () => {
    return onBackPress ? (
      <TouchableOpacity onPress={onBackPress}>
        <Icon name="arrowleft" size={20} color="black" />
      </TouchableOpacity>
    ) : (
      <View style={styles.leftViewStyle}></View>
    );
  };
  return (
    <View style={styles.containerStyle}>
      <LeftView />

      <AppText style={styles.headerTextStyle}>{headerTitle}</AppText>

      {onInfoPress ? (
        <TouchableOpacity onPress={onInfoPress}>
          <Icon name="infocirlce" size={20} color="gray" />
        </TouchableOpacity>
      ) : (
        <View style={{width: 20}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  leftViewStyle: {
    height: 20,
    width: 20,
  },
  headerTextStyle: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AppHeader;
