// screens/UploadDocuments.tsx
import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import UploadBox from '../components/UploadBox';
import {AppString} from '../../../utils/AppString';
import {AppHeader, AppText} from '../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  isFileSizeValid,
  prepareFormData,
} from '../../../utils/ConstantTypes/globalFunctions';
import {useCameraPermission} from '../../../hooks/useCameraPermission';
import {pick, types} from '@react-native-documents/picker';
import {log} from '../../../utils/Logger';
import {callDeleteDocumentApi, callUploadIdentityApi} from '../redux/thunk';
import {useDispatch} from 'react-redux';
import {DocumentType} from '../../../utils/ConstantTypes/authTypes';

type eachDocumentType = {
  id: number | undefined;
  url: string | number | undefined;
  name: string | number | undefined;
  uploadStatus: boolean;
  uploadProgress: number;
};
interface documentType {
  image: eachDocumentType;
  idProof: eachDocumentType;
  genderProof: eachDocumentType;
}
const initialDocument = {
  image: {
    id: 0,
    url: '',
    name: '',
    uploadStatus: false,
    uploadProgress: 0,
  },
  idProof: {
    id: 0,
    url: '',
    name: '',
    uploadStatus: false,
    uploadProgress: 0,
  },
  genderProof: {
    id: 0,
    url: '',
    name: '',
    uploadStatus: false,
    uploadProgress: 0,
  },
};

const UploadDocuments: React.FC = (props: any) => {
  let section = AppString.screens.auth.uploadDocuments.sections;
  const {openCamera} = useCameraPermission();
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState<documentType>(initialDocument);

  // Handle File Upload
  const handleFileUpload = async (type: string) => {
    try {
      if (type === 'photo') {
        const image = await openCamera();
        if (image && isFileSizeValid(image.size)) {
          console.log('Photo uploaded:', image.path);
          let fileForm = prepareFormData({
            uri: image.path,
            name: image.name,
            type: image.type,
          });
          const response = await callUploadIdentityApi(
            dispatch,
            DocumentType[1],
            fileForm,
            progress => {
              setDocuments({
                ...documents,
                image: {
                  ...documents.image,
                  uploadProgress: progress / 100,
                },
              });
            },
          );
          setDocuments({
            ...documents,
            image: {
              ...documents.image,
              id: response?.id,
              url: response?.fileUrl,
              name: response?.fileName,
              uploadStatus: true,
            },
          });
        } else {
          Alert.alert(
            'Invalid File',
            'Photo must be between 400 KB and 800 KB.',
          );
        }
      } else {
        const [document] = await pick({
          mode: 'open',
          type: [types.pdf, types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        if (document.size && isFileSizeValid(document.size)) {
          // console.log(`${nativeType} uploaded:`, name, uri);
          let fileForm = prepareFormData({
            uri: document.uri,
            name: document.name,
            type: document.type,
          });
          if (type === section[1].id) {
            const response = await callUploadIdentityApi(
              dispatch,
              DocumentType[1],
              fileForm,
              progress => {
                setDocuments({
                  ...documents,
                  idProof: {
                    ...documents.idProof,
                    uploadProgress: progress / 100,
                  },
                });
              },
            );
            setDocuments({
              ...documents,
              idProof: {
                ...documents.idProof,
                id: response?.id,
                url: response?.fileUrl,
                name: response?.fileName,
                uploadStatus: true,
              },
            });
          } else {
            const response = await callUploadIdentityApi(
              dispatch,
              DocumentType[2],
              fileForm,
              progress => {
                setDocuments({
                  ...documents,
                  idProof: {
                    ...documents.genderProof,
                    uploadProgress: progress / 100,
                  },
                });
              },
            );
            setDocuments({
              ...documents,
              genderProof: {
                ...documents.genderProof,
                id: response?.id,
                url: response?.fileUrl,
                name: response?.fileName,
                uploadStatus: true,
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

  const handleDeletePress = async (
    documentDetail: eachDocumentType,
    docType: string,
  ) => {
    console.log('documents------',documents)
    console.log('documentDetail------',documentDetail)
    try {
      const response = await callDeleteDocumentApi(dispatch, documentDetail.id);
      let key =
        docType === DocumentType[0]
          ? 'image'
          : docType === DocumentType[1]
          ? 'idProof'
          : 'genderProof';
      if (response) {
        setDocuments({
          ...documents,
          [key]: initialDocument.image,
        });
      }
    } catch (error) {}
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
        uploadProgress={documents.image.uploadProgress}
        uploadStatus={documents.image.uploadStatus}
        onPress={() => handleFileUpload(section[0].id)}
        onDeletePress={() =>
          handleDeletePress(documents.image, DocumentType[0])
        }
      />
      <UploadBox
        title={section[1].label}
        label={section[1].uploadText}
        fileType={section[1].fileType}
        fileSize={section[1].fileSize}
        uploadProgress={documents.idProof.uploadProgress}
        uploadStatus={documents.idProof.uploadStatus}
        onPress={() => handleFileUpload(section[1].id)}
        onDeletePress={() =>
          handleDeletePress(documents.idProof, DocumentType[1])
        }
      />
      <UploadBox
        title={section[2].label}
        label={section[2].uploadText}
        fileType={section[2].fileType}
        fileSize={section[2].fileSize}
        uploadProgress={documents.genderProof.uploadProgress}
        uploadStatus={documents.genderProof.uploadStatus}
        onPress={() => handleFileUpload(section[2].id)}
        onDeletePress={() =>
          handleDeletePress(documents.genderProof, DocumentType[2])
        }
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
