// screens/UploadDocuments.tsx
import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import UploadBox from '../components/UploadBox';
import {AppString} from '../../../utils/AppString';
import {AppHeader, AppText} from '../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {isFileSizeValid} from '../../../utils/ConstantTypes/globalFunctions';
import {useCameraPermission} from '../../../hooks/useCameraPermission';
import {pick, types} from '@react-native-documents/picker';

const UploadDocuments: React.FC = (props: any) => {
  let section = AppString.screens.auth.uploadDocuments.sections;
  const {openCamera} = useCameraPermission();
  const [documents, setDocuments] = useState({
    image: {
      url: '',
      name: '',
      uploadStatus: false,
    },
    idProof: {
      url: '',
      name: '',
      uploadStatus: false,
    },
    genderProof: {
      url: '',
      name: '',
      uploadStatus: false,
    },
  });

  // Handle File Upload
  const handleFileUpload = async (type: string) => {
    try {
      if (type === 'photo') {
        const image = await openCamera();
        if (image && isFileSizeValid(image.size)) {
          console.log('Photo uploaded:', image.path);
        } else {
          Alert.alert(
            'Invalid File',
            'Photo must be between 400 KB and 800 KB.',
          );
        }
      } else {
        const [{uri, size, name, error, nativeType}] = await pick({
          mode: 'open',
          type: [types.pdf, types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        if (size && isFileSizeValid(size, 100)) {
          // console.log(`${nativeType} uploaded:`, name, uri);
          if (type === section[1].id) {
            setDocuments({
              ...documents,
              idProof: {
                url: uri,
                name: name,
                uploadStatus: false,
              },
            });
          } else {
            setDocuments({
              ...documents,
              genderProof: {
                url: uri,
                name: name,
                uploadStatus: false,
              },
            });
          }
        } else {
          Alert.alert(
            'Invalid File',
            'Document must be between 400 KB and 800 KB.',
          );
        }
      }
    } catch (error) {
      console.log('File Picker Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        headerTitle={AppString.screens.auth.uploadDocuments.title}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <AppText style={styles.subtitle}>
        {AppString.screens.auth.uploadDocuments.subtitle}
      </AppText>
      <UploadBox
        title={section[0].label}
        label={section[0].uploadText}
        fileType={section[0].fileType}
        fileSize={section[0].fileSize}
        onPress={() => handleFileUpload(section[0].id)}
      />
      <UploadBox
        title={section[1].label}
        label={section[1].uploadText}
        fileType={section[1].fileType}
        fileSize={section[1].fileSize}
        onPress={() => handleFileUpload(section[1].id)}
      />
      <UploadBox
        title={section[2].label}
        label={section[2].uploadText}
        fileType={section[2].fileType}
        fileSize={section[2].fileSize}
        onPress={() => handleFileUpload(section[2].id)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 15,
  },
});

export default UploadDocuments;
