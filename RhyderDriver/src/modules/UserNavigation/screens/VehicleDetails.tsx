import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppHeader, AppText, ButtonType} from '../../../components';
import {AppString} from '../../../utils/AppString';
import UploadBox from '../../Authentication/components/UploadBox';
import {pick, types} from '@react-native-documents/picker';
import {DocumentType} from '../../../utils/ConstantTypes/authTypes';
import {
  isFileSizeValid,
  prepareFormData,
} from '../../../utils/ConstantTypes/globalFunctions';
import {callUploadIdentityApi} from '../../Authentication/redux/thunk';
import {useDispatch} from 'react-redux';
import AppStepCount from '../../../components/AppStepCount';
import {navigate} from '../../../utils/NavigationService';

type eachDocumentType = {
  id: number | undefined;
  url: string | number | undefined;
  name: string | number | undefined;
  uploadStatus: boolean;
  uploadProgress: number;
};
interface documentType {
  vehicleImage: eachDocumentType;
}

const initialDocument = {
  vehicleImage: {
    id: 0,
    url: '',
    name: '',
    uploadStatus: false,
    uploadProgress: 0,
  },
};

const VehicleDetails: React.FC = (props: any) => {
  const [documents, setDocuments] = useState<documentType>(initialDocument);
  const dispatch = useDispatch();

  // Handle File Upload
  const handleFileUpload = async (type: string) => {
    try {
      if (type === 'vehicleImage') {
        const [image] = await pick({
          mode: 'open',
          type: [types.images],
          requestLongTermAccess: true,
          transitionStyle: 'flipHorizontal',
        });
        if (image?.size && isFileSizeValid(image.size, 100)) {
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
                vehicleImage: {
                  ...documents.vehicleImage,
                  uploadProgress: progress / 100,
                },
              });
            },
          );
          console.log('response===', response);

          if (response) {
            setDocuments({
              ...documents,
              vehicleImage: {
                ...documents.vehicleImage,
                id: response?.id,
                url: response?.fileUrl,
                name: response?.fileName,
                uploadStatus: true,
              },
            });
          } else {
            setDocuments({
              ...documents,
              vehicleImage: {
                ...documents.vehicleImage,
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
      }
    } catch (error) {
      console.log('File Picker Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewStyle}>
        <View>
          <AppHeader
            headerTitle={AppString.screens.auth.vehicleDetails.title}
          />
          <AppText>{AppString.screens.auth.vehicleDetails.subTitle}</AppText>
          <AppStepCount
            steps={['Vehicle Details', 'Vehicle Documents', 'Driver Documents']}
            currentStep={0}
            style={styles.steperStyle}
          />
          <UploadBox
            title={AppString.screens.auth.vehicleDetails.sections[0].label}
            label={AppString.screens.auth.vehicleDetails.sections[0].uploadText}
            fileType={
              AppString.screens.auth.vehicleDetails.sections[0].fileType
            }
            fileSize={
              AppString.screens.auth.vehicleDetails.sections[0].fileSize
            }
            // uploadProgress={documents.image.uploadProgress}
            // uploadStatus={documents.image.uploadStatus}
            onPress={() =>
              handleFileUpload(
                AppString.screens.auth.vehicleDetails.sections[0].id,
              )
            }
            // onDeletePress={() =>
            //   handleDeletePress(documents.image, DocumentType[0])
            // }
            // onViewPress={() => {
            //   handleViewPress(documents.image.url);
            // }}
          />
          <AppButton
            buttonTitle={AppString.screens.auth.vehicleDetails.button}
            onPress={() => {
              navigate(AppString.NavigationScreens.user.vehicleDocuments);
            }}
            buttonType={ButtonType.PRIMARY}
            buttonTitleStyle={styles.buttonTitleStyle}
            buttonStyle={styles.buttonStyle}
          />
        </View>
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
  text: {
    fontSize: 24,
  },
  scrollViewStyle: {
    paddingHorizontal: 15,
  },
  steperStyle: {
    marginTop: 20,
  },
});

export default VehicleDetails;
