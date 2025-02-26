// screens/UploadDocuments.tsx
import React, {useEffect, useState} from 'react';
import {StyleSheet, Alert} from 'react-native';
import UploadBox from '../../Authentication/components/UploadBox';
import {AppString} from '../../../utils/AppString';
import {AppButton, AppHeader, AppText, ButtonType} from '../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {DocumentType} from '../../../utils/ConstantTypes/authTypes';
import {callLogoutApi} from '../../Authentication/redux/thunk';
import {getStorageItem, setStorageItem} from '../../../utils/Storage/storage';
import {STORAGE_KEY} from '../../../utils/Storage/storageKeys';
import {navigate} from '../../../utils/NavigationService';
import AppStepCount from '../../../components/AppStepCount';
import AppPreviewModal from '../../../components/AppPreviewModal';
import {useDocuments} from '../../../context/DocumentsContext';

const VehicleDocuments: React.FC = (props: any) => {
  let section = AppString.screens.auth.vehicleDocuments.sections;
  const dispatch = useDispatch();
  const [showPreview, setShowPreview] = useState(false);
  const [preViewDocuments, setPreViewDocuments] = useState({});
  const {documents, handleFileUpload, handleDeletePress} = useDocuments();

  useEffect(() => {
    // handleUploadedDocuments();
  }, []);

  //Handle uploaded documents
  // const handleUploadedDocuments = async () => {
  //   const getUploadedDocs: any = await callGetUploadedDocumentsApi(dispatch);
  //   updateDocuments(getUploadedDocs);
  // };

  // const updateDocuments = (data: any[]) => {
  //   let updatedDocuments = {...initialDocument};
  //   for (let i = 0; i < data.length; i++) {
  //     if (DocumentType[0] === DocumentType[data[i].type]) {
  //       updatedDocuments.image = {
  //         id: data[i].id,
  //         url: data[i].fileUrl,
  //         name: data[i].fileName,
  //         uploadStatus: true,
  //         uploadProgress: 0,
  //       };
  //     } else if (DocumentType[1] === DocumentType[data[i].type]) {
  //       updatedDocuments.idProof = {
  //         id: data[i].id,
  //         url: data[i].fileUrl,
  //         name: data[i].fileName,
  //         uploadStatus: true,
  //         uploadProgress: 0,
  //       };
  //     } else if (DocumentType[2] === DocumentType[data[i].type]) {
  //       updatedDocuments.genderProof = {
  //         id: data[i].id,
  //         url: data[i].fileUrl,
  //         name: data[i].fileName,
  //         uploadStatus: true,
  //         uploadProgress: 0,
  //       };
  //     }
  //   }
  //   setDocuments(updatedDocuments);
  // };

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

  const handleViewPress = (docUrl: string) => {
    if (docUrl) {
      const finalURL = `${'https://rhyderapi.k-asoftech.com'}${docUrl}`;
      setPreViewDocuments(finalURL);
      setShowPreview(true);
    } else {
      Alert.alert('Error', 'No document available to view.');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader headerTitle={AppString.screens.auth.vehicleDocuments.title} />
      <AppText style={styles.subtitle}>
        {AppString.screens.auth.vehicleDocuments.subtitle}
      </AppText>
      <AppStepCount
        steps={AppString.screens.auth.vehicleDetails.stepCountData}
        currentStep={1}
        style={styles.steperStyle}
      />
      <UploadBox
        title={section[0].label}
        label={section[0].uploadText}
        fileType={section[0].fileType}
        fileSize={section[0].fileSize}
        uploadProgress={documents.registrationCertificate.uploadProgress}
        uploadStatus={documents.registrationCertificate.uploadStatus}
        onPress={() => handleFileUpload(section[0].id)}
        onDeletePress={() =>
          handleDeletePress(
            documents.registrationCertificate,
            DocumentType.RegistrationCertificate,
          )
        }
        onViewPress={() => {
          handleViewPress(documents.registrationCertificate.url);
        }}
      />
      <UploadBox
        title={section[1].label}
        label={section[1].uploadText}
        fileType={section[1].fileType}
        fileSize={section[1].fileSize}
        uploadProgress={documents.insurance.uploadProgress}
        uploadStatus={documents.insurance.uploadStatus}
        onPress={() => handleFileUpload(section[1].id)}
        onDeletePress={() =>
          handleDeletePress(documents.insurance, DocumentType.VehicleInsurance)
        }
        onViewPress={() => {
          handleViewPress(documents.insurance.url);
        }}
      />
      <UploadBox
        title={section[2].label}
        label={section[2].uploadText}
        fileType={section[2].fileType}
        fileSize={section[2].fileSize}
        uploadProgress={documents.inspection.uploadProgress}
        uploadStatus={documents.inspection.uploadStatus}
        onPress={() => handleFileUpload(section[2].id)}
        onDeletePress={() =>
          handleDeletePress(
            documents.inspection,
            DocumentType.VehicleInspection,
          )
        }
        onViewPress={() => {
          handleViewPress(documents.inspection.url);
        }}
      />
      <AppButton
        // disabled={
        //   !(
        //     documents.genderProof.url &&
        //     documents.image.url &&
        //     documents.idProof.url
        //   )
        // }
        buttonTitle={AppString.screens.auth.vehicleDocuments.nextButton}
        onPress={() => {
          // if (
          //   documents.genderProof.url &&
          //   documents.image.url &&
          //   documents.idProof.url
          // ) {
          //   setStorageItem(STORAGE_KEY.USER_DETAIL, {
          //     ...getStorageItem(STORAGE_KEY.USER_DETAIL),
          //     docIssue: true,
          //   });
          //   // props.navigation.navigate('user', {
          //   //   screen: AppString.NavigationScreens.user.Home,
          //   // });
          // }
          navigate(AppString.NavigationScreens.user.driverDocuments);
        }}
        buttonType={ButtonType.PRIMARY}
        buttonStyle={styles.buttonStyle}
      />

      {showPreview && (
        <AppPreviewModal
          visible={showPreview}
          onCancelPress={() => {
            setShowPreview(false);
          }}
          selectedDocument={preViewDocuments}
        />
      )}
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
  steperStyle: {
    // marginTop: 20,
  },
});

export default VehicleDocuments;
