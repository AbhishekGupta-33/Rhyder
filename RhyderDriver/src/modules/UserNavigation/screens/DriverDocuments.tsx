import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppHeader, AppText, ButtonType} from '../../../components';
import {AppString} from '../../../utils/AppString';
import UploadBox from '../../Authentication/components/UploadBox';
import AppStepCount from '../../../components/AppStepCount';
import {useDocuments} from '../../../context/DocumentsContext';
import {DocumentType} from '../../../utils/ConstantTypes/authTypes';
import AppPreviewModal from '../../../components/AppPreviewModal';

const DriverDocuments: React.FC = (props: any) => {
  let section = AppString.screens.auth.driverDocuments.sections;
  const [showPreview, setShowPreview] = useState(false);
  const [preViewDocuments, setPreViewDocuments] = useState({});

  const {documents, handleFileUpload, handleDeletePress} = useDocuments();

  const handleViewPress = (docUrl: string) => {
    if (docUrl) {
      const finalURL = `${'https://rhyderapi.k-asoftech.com'}${docUrl}`;
      setPreViewDocuments(finalURL);
      setShowPreview(true);
    } else {
      Alert.alert('Error', 'No document available to view.');
    }
  };

  const handleDone = () => {
    console.log('Click done----');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewStyle}>
        <View>
          <AppHeader
            headerTitle={AppString.screens.auth.driverDocuments.title}
          />
          <AppText style={styles.subtitle}>
            {AppString.screens.auth.driverDocuments.subtitle}
          </AppText>
          <AppStepCount
            steps={AppString.screens.auth.vehicleDetails.stepCountData}
            currentStep={2}
            style={styles.steperStyle}
          />
          <UploadBox
            title={section[0].label}
            label={section[0].uploadText}
            fileType={section[0].fileType}
            fileSize={section[0].fileSize}
            uploadProgress={documents.driverPhoto.uploadProgress}
            uploadStatus={documents.driverPhoto.uploadStatus}
            onPress={() => {
              handleFileUpload(section[1].id);
            }}
            onDeletePress={() =>
              handleDeletePress(documents.driverPhoto, DocumentType.DriverImage)
            }
            onViewPress={() => {
              handleViewPress(documents.driverPhoto.url);
            }}
          />
          <UploadBox
            title={section[1].label}
            label={section[1].uploadText}
            fileType={section[1].fileType}
            fileSize={section[1].fileSize}
            uploadProgress={documents.usDriverLicense.uploadProgress}
            uploadStatus={documents.usDriverLicense.uploadStatus}
            onPress={() => {
              handleFileUpload(section[1].id);
            }}
            onDeletePress={() =>
              handleDeletePress(
                documents.usDriverLicense,
                DocumentType.DriverLicense,
              )
            }
            onViewPress={() => {
              handleViewPress(documents.usDriverLicense.url);
            }}
          />
          <UploadBox
            title={section[2].label}
            label={section[2].uploadText}
            fileType={section[2].fileType}
            fileSize={section[2].fileSize}
            uploadProgress={documents.genderProof.uploadProgress}
            uploadStatus={documents.genderProof.uploadStatus}
            onPress={() => {
              handleFileUpload(section[1].id);
            }}
            onDeletePress={() =>
              handleDeletePress(
                documents.genderProof,
                DocumentType.GenderIdentityProof,
              )
            }
            onViewPress={() => {
              handleViewPress(documents.genderProof.url);
            }}
          />
          <UploadBox
            title={section[3].label}
            label={section[3].uploadText}
            fileType={section[3].fileType}
            fileSize={section[3].fileSize}
            uploadProgress={documents.permanentAddress.uploadProgress}
            uploadStatus={documents.permanentAddress.uploadStatus}
            onPress={() => {
              handleFileUpload(section[1].id);
            }}
            onDeletePress={() =>
              handleDeletePress(
                documents.permanentAddress,
                DocumentType.DriverPermanentAddress,
              )
            }
            onViewPress={() => {
              handleViewPress(documents.permanentAddress.url);
            }}
          />
          <UploadBox
            title={section[4].label}
            label={section[4].uploadText}
            fileType={section[4].fileType}
            fileSize={section[4].fileSize}
            uploadProgress={documents.currentAddress.uploadProgress}
            uploadStatus={documents.currentAddress.uploadStatus}
            onPress={() => {
              handleFileUpload(section[1].id);
            }}
            onDeletePress={() =>
              handleDeletePress(
                documents.currentAddress,
                DocumentType.DriverCurrentAddress,
              )
            }
            onViewPress={() => {
              handleViewPress(documents.currentAddress.url);
            }}
          />

          <AppButton
            buttonTitle={AppString.screens.auth.driverDocuments.button}
            onPress={() => {
              handleDone();
            }}
            buttonType={ButtonType.PRIMARY}
            buttonTitleStyle={styles.buttonTitleStyle}
            buttonStyle={styles.buttonStyle}
          />
        </View>
        {showPreview && (
          <AppPreviewModal
            visible={showPreview}
            onCancelPress={() => {
              setShowPreview(false);
            }}
            selectedDocument={preViewDocuments}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'left',
    color: 'gray',
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
  },
  scrollViewStyle: {
    paddingHorizontal: 20,
  },
  steperStyle: {
    // marginTop: 20,
  },
  buttonStyle: {
    marginTop: 20,
    marginBottom: 30,
  },
  buttonTitleStyle: {
    color: 'white',
  },
});

export default DriverDocuments;
