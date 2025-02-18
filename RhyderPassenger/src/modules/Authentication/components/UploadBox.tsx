// components/UploadBox.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppText} from '../../../components';

interface UploadBoxProps {
  title: string;
  label: string;
  fileType: string;
  fileSize: string;
  onPress: () => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({
  title,
  label,
  fileType,
  fileSize,
  onPress,
}) => {
  return (
    <>
      <AppText style={styles.label}>{title}</AppText>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.container}
        onPress={onPress}>
        <View style={styles.InnerContainer}>
          <Ionicons name="cloud-upload-outline" size={30} color="gray" />
          <View style={styles.innerRowView}>
            <AppText style={styles.text}>{label}</AppText>
            <AppText
              style={styles.subText}>{`${fileType} (${fileSize})`}</AppText>
          </View>
        </View>
      </TouchableOpacity>
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
  text: {
    fontSize: 16,
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
  InnerContainer:{
    flexDirection: 'row',
    padding:20,
    paddingVertical: 30
  },
  innerRowView:{
    marginStart: 10
  }
});

export default UploadBox;
