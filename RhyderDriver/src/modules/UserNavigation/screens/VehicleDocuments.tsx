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
import useTheme from '../../../hooks/useTheme';

const VehicleDocuments: React.FC = (props: any) => {
  const theme = useTheme();
  let section = AppString.screens.auth.vehicleDocuments.sections;
  const dispatch = useDispatch();
  const [showPreview, setShowPreview] = useState(false);
  const [preViewDocuments, setPreViewDocuments] = useState({});
  const {
    documents,
    handleFileUpload,
    handleDeletePress,
    handleUploadedDocuments,
  } = useDocuments();

  useEffect(() => {
    handleUploadedDocuments();
  }, []);

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.spacing_20,
      backgroundColor: theme.colors.white,
    },
    title: {
      fontSize: theme.fontSize.font_22,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: theme.fontSize.font_14,
      textAlign: 'center',
      color: theme.colors.gray,
      marginBottom: theme.margin.margin_20,
    },
    label: {
      fontSize: theme.fontSize.font_16,
      fontWeight: '500',
      marginTop: theme.margin.margin_15,
    },
    buttonTitleStyle: {
      color: theme.colors.white,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: theme.colors.modal_background_color,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      backgroundColor: theme.colors.white,
      padding: theme.spacing.spacing_10,
      borderRadius: theme.radius.borderRadius_20,
    },
    closeText: {
      color: theme.colors.black,
      fontSize: theme.fontSize.font_16,
      fontWeight: 'bold',
    },
    webView: {width: '90%', height: '80%'},
    imagePreview: {width: '90%', height: '80%'},
    buttonStyle: {
      marginTop: theme.margin.margin_20,
    },
    steperStyle: {
      // marginTop: 20,
    },
  });

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
          // props.navigation.navigate('user', {
          //   screen: AppString.NavigationScreens.user.Home,
          // });
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

export default VehicleDocuments;
