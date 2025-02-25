// components/UploadBox.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppText} from '../../../components';
import {DocumentType, RoleType} from '../../../utils/ConstantTypes/authTypes';
import {IconButton, ProgressBar} from 'react-native-paper';

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
  const LoaderView = () => {
    if (uploadProgress === 0) return;
    return <ProgressBar animatedValue={uploadProgress} style={styles.loader} />;
  };

  const AfterDocUpdateView = () => {
    if (!uploadStatus) return;
    return (
      <View>
        <IconButton animated icon={'delete'} size={18} onPress={onDeletePress} />
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
            <Ionicons name="cloud-upload-outline" size={30} color="gray" />
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

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  subText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 15,
  },
  InnerContainer: {
    flexDirection: 'row',
    padding: 20,
    // paddingVertical: 30,
    width: '80%',
  },
  innerRowView: {
    marginStart: 10,
  },
  loader: {
    width: '95%',
    borderRadius: 5,
    height: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default UploadBox;
