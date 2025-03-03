import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AppText from './AppText';
import useTheme from '../hooks/useTheme';

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
  const theme = useTheme();

  const styles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingVertical: theme.spacing.spacing_10,
    },
    leftViewStyle: {
      height: 20,
      width: 20,
    },
    headerTextStyle: {
      color: theme.colors.black,
      fontWeight: 'bold',
      fontSize: theme.fontSize.font_18,
    },
  });

  const LeftView = () => {
    return onBackPress ? (
      <TouchableOpacity onPress={onBackPress}>
        <Icon
          name="arrowleft"
          size={theme.fontSize.font_20}
          color={theme.colors.black}
        />
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
          <Icon
            name="infocirlce"
            size={theme.fontSize.font_20}
            color={theme.colors.gray}
          />
        </TouchableOpacity>
      ) : (
        <View style={{width: 20}} />
      )}
    </View>
  );
};

export default AppHeader;
