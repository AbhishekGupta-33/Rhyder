// screens/UploadDocuments.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import UploadBox from '../../Authentication/components/UploadBox';
import {AppString} from '../../../utils/AppString';
import {AppButton, AppHeader, AppText, ButtonType} from '../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  isFileSizeValid,
  prepareFormData,
} from '../../../utils/ConstantTypes/globalFunctions';
import {useCameraPermission} from '../../../hooks/useCameraPermission';
import {pick, types} from '@react-native-documents/picker';
import {useDispatch} from 'react-redux';
import {DocumentType} from '../../../utils/ConstantTypes/authTypes';
import {WebView} from 'react-native-webview';
import {
  callDeleteDocumentApi,
  callGetUploadedDocumentsApi,
  callLogoutApi,
  callUploadIdentityApi,
} from '../../Authentication/redux/thunk';
import {getStorageItem, setStorageItem} from '../../../utils/Storage/storage';
import {STORAGE_KEY} from '../../../utils/Storage/storageKeys';

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

const VehicleDocuments: React.FC = (props: any) => {
  let section = AppString.screens.auth.vehicleDocuments.sections;
  const {openCamera} = useCameraPermission();
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState<documentType>(initialDocument);
  const [viewModal, setViewModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string>('');

  useEffect(() => {
    handleUploadedDocuments();
  }, []);

  //Handle uploaded documents
  const handleUploadedDocuments = async () => {
    const getUploadedDocs = await callGetUploadedDocumentsApi(dispatch);
    updateDocuments(getUploadedDocs);
  };

  const updateDocuments = (data: any[]) => {
    let updatedDocuments = {...initialDocument};
    for (let i = 0; i < data.length; i++) {
      if (DocumentType[0] === DocumentType[data[i].type]) {
        updatedDocuments.image = {
          id: data[i].id,
          url: data[i].fileUrl,
          name: data[i].fileName,
          uploadStatus: true,
          uploadProgress: 0,
        };
      } else if (DocumentType[1] === DocumentType[data[i].type]) {
        updatedDocuments.idProof = {
          id: data[i].id,
          url: data[i].fileUrl,
          name: data[i].fileName,
          uploadStatus: true,
          uploadProgress: 0,
        };
      } else if (DocumentType[2] === DocumentType[data[i].type]) {
        updatedDocuments.genderProof = {
          id: data[i].id,
          url: data[i].fileUrl,
          name: data[i].fileName,
          uploadStatus: true,
          uploadProgress: 0,
        };
      }
    }
    setDocuments(updatedDocuments);
  };

  // Handle File Upload
  const handleFileUpload = async (type: string) => {
    try {
      if (type === 'photo') {
        // const image = await openCamera();
        const [image] = await pick({
          mode: 'open',
          type: [types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        if (image?.size && isFileSizeValid(image.size, 100)) {
          // console.log('Photo uploaded:', image.path);
          // let fileForm = prepareFormData({
          //   uri: image.path,
          //   name: image.name,
          //   type: image.type,
          // });
          let fileForm = prepareFormData({
            uri: image.uri,
            name: image.name,
            type: image.type,
          });
          const response = await callUploadIdentityApi(
            dispatch,
            DocumentType[0],
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
          if (response) {
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
            setDocuments({
              ...documents,
              image: {
                ...documents.image,
                uploadProgress: 0,
              },
            });
          }
        } else {
          Alert.alert(
            'Invalid File',
            'Photo must be between 400 KB and 800 KB.',
          );
        }
      } else {
        const [document] = await pick({
          mode: 'open',
          type: [types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        if (document.size && isFileSizeValid(document.size, 100)) {
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
            if (response) {
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
              setDocuments({
                ...documents,
                idProof: {
                  ...documents.idProof,
                  uploadProgress: 0,
                },
              });
            }
          } else {
            const response = await callUploadIdentityApi(
              dispatch,
              DocumentType[2],
              fileForm,
              progress => {
                setDocuments({
                  ...documents,
                  genderProof: {
                    ...documents.genderProof,
                    uploadProgress: progress / 100,
                  },
                });
              },
            );
            if (response) {
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
            } else {
              setDocuments({
                ...documents,
                genderProof: {
                  ...documents.genderProof,
                  uploadProgress: 0,
                },
              });
            }
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

  const handleLogout = async () => {
    const refreshToken = await getStorageItem(STORAGE_KEY.REFRESH_TOKEN);
    if (refreshToken) {
      Alert.alert('', 'Are you sure want to Logout ?', [
        {
          text: 'YES',
          onPress: () => {
            callLogoutApi(dispatch);
          },
        },
        {
          text: 'NO',
          onPress: () => {},
        },
      ]);
    }
  };

  const handleDeletePress = async (
    documentDetail: eachDocumentType,
    docType: string,
  ) => {
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

  const handleViewPress = (docUrl: string) => {
    if (docUrl) {
      const finalURL = `${'https://rhyderapi.k-asoftech.com'}${docUrl}`;
      setSelectedDocument(finalURL);
      setViewModal(true);
    } else {
      Alert.alert('Error', 'No document available to view.');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader headerTitle={AppString.screens.auth.uploadDocuments.title} />
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
        onViewPress={() => {
          handleViewPress(documents.image.url);
        }}
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
        onViewPress={() => {
          handleViewPress(documents.idProof.url);
        }}
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
        onViewPress={() => {
          handleViewPress(documents.genderProof.url);
        }}
      />
      <AppButton
        disabled={
          !(
            documents.genderProof.url &&
            documents.image.url &&
            documents.idProof.url
          )
        }
        buttonTitle={AppString.screens.auth.uploadDocuments.nextButton}
        onPress={() => {
          if (
            documents.genderProof.url &&
            documents.image.url &&
            documents.idProof.url
          ) {
            setStorageItem(STORAGE_KEY.USER_DETAIL, {
              ...getStorageItem(STORAGE_KEY.USER_DETAIL),
              docIssue: true,
            });
            // props.navigation.navigate('user', {
            //   screen: AppString.NavigationScreens.user.Home,
            // });
          }
        }}
        buttonType={ButtonType.PRIMARY}
      />
      {/* <AppButton
        buttonTitle={AppString.screens.auth.uploadDocuments.logout}
        onPress={() => {
          handleLogout();
        }}
        buttonType={ButtonType.PRIMARY}
        buttonTitleStyle={styles.buttonTitleStyle}
        buttonStyle={styles.buttonStyle}
      /> */}
      {/* View Document Modal */}
      <Modal visible={viewModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setViewModal(false)}>
            <AppText style={styles.closeText}>Close</AppText>
          </TouchableOpacity>

          {selectedDocument?.endsWith('.pdf') ? (
            <WebView source={{uri: selectedDocument}} style={styles.webView} />
          ) : (
            <Image
              source={{uri: selectedDocument}}
              style={styles.imagePreview}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
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
  buttonTitleStyle: {
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  closeText: {color: 'black', fontSize: 16, fontWeight: 'bold'},
  webView: {width: '90%', height: '80%'},
  imagePreview: {width: '90%', height: '80%'},
  buttonStyle: {
    marginTop: 20,
  },
});

export default VehicleDocuments;
