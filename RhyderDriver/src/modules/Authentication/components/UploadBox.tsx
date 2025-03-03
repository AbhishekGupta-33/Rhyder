// components/UploadBox.tsx
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppText} from '../../../components';
import {IconButton, ProgressBar} from 'react-native-paper';
import useTheme from '../../../hooks/useTheme';

interface UploadBoxProps {
  title: string;
  label: string;
  fileType: string;
  fileSize: string;
  uploadProgress: string | number;
  uploadStatus: boolean;
  onPress: () => void;
  onViewPress?: () => void;
  onDeletePress?: () => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({
  title,
  label,
  fileType,
  fileSize,
  uploadProgress,
  uploadStatus,
  onPress,
  onDeletePress,
  onViewPress,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: theme.radius.borderRadius_10,
      // alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.colors.gray,
      marginVertical: theme.margin.margin_10,
    },
    rowContainer: {
      flexDirection: 'row',
    },
    text: {
      fontSize: theme.fontSize.font_14,
      fontWeight: '500',
    },
    subText: {
      fontSize: theme.fontSize.font_12,
      color: theme.colors.gray,
      marginTop: theme.margin.margin_2,
    },
    label: {
      fontSize: theme.fontSize.font_16,
      fontWeight: '500',
      marginTop: theme.margin.margin_15,
    },
    InnerContainer: {
      flexDirection: 'row',
      padding: theme.spacing.spacing_20,
      // paddingVertical: 30,
      width: '80%',
    },
    innerRowView: {
      marginStart: theme.margin.margin_10,
    },
    loader: {
      width: '95%',
      borderRadius: theme.radius.borderRadius_10,
      height: 10,
      alignSelf: 'center',
      marginBottom: theme.margin.margin_10,
    },
  });

  const LoaderView = () => {
    if (uploadProgress === 0) return;
    return <ProgressBar animatedValue={uploadProgress} style={styles.loader} />;
  };

  const AfterDocUpdateView = () => {
    if (!uploadStatus) return;
    return (
      <View>
        <IconButton
          animated
          icon={'delete'}
          size={theme.fontSize.font_18}
          onPress={onDeletePress}
        />
        <IconButton animated icon={'eye'} size={18} onPress={onViewPress} />
      </View>
    );
  };
  return (
    <>
      <AppText style={styles.label}>{title}</AppText>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.InnerContainer}
            onPress={onPress}>
            <Ionicons
              name="cloud-upload-outline"
              size={theme.fontSize.font_30}
              color={theme.colors.gray}
            />
            <View style={styles.innerRowView}>
              <AppText style={styles.text}>{label}</AppText>
              <AppText
                style={styles.subText}>{`${fileType} (${fileSize})`}</AppText>
            </View>
          </TouchableOpacity>
          <AfterDocUpdateView />
        </View>

        <LoaderView />
      </View>
    </>
  );
};

export default UploadBox;
