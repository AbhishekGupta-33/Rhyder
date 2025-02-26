import React, {useCallback, useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  AppButton,
  AppHeader,
  AppText,
  AppTextInput,
  ButtonType,
} from '../../../components';
import {AppString} from '../../../utils/AppString';
import UploadBox from '../../Authentication/components/UploadBox';
import {useDispatch} from 'react-redux';
import AppStepCount from '../../../components/AppStepCount';
import {hasData} from '../../../utils/Validators';
import {useDocuments} from '../../../context/DocumentsContext';
import AppPreviewModal from '../../../components/AppPreviewModal';
import {DocumentType} from '../../../utils/ConstantTypes/authTypes';

const VehicleDetails: React.FC = (props: any) => {
  const [vehicleDetails, setVehicleDetails] = useState({
    make: '',
    model: '',
    year: '',
    vehiclePlateNo: '',
    vehicleType: '',
    seater: '',
    color: '',
    errors: {
      make: '',
      model: '',
      year: '',
      vehiclePlateNo: '',
      vehicleType: '',
      seater: '',
      color: '',
    },
  });
  const dispatch = useDispatch();
  const {documents, handleFileUpload, handleDeletePress} = useDocuments();
  const [showPreview, setShowPreview] = useState(false);
  const [preViewDocuments, setPreViewDocuments] = useState({});

  const handleInputChange = useCallback((field: string, value: string) => {
    let error = '';
    type ErrorKeys =
      | 'makeError'
      | 'modelError'
      | 'yearError'
      | 'vehiclePlateNoError'
      | 'vehicleTypeError'
      | 'seaterError'
      | 'colorError';
    if (!hasData(value)) {
      error =
        AppString.screens.auth.vehicleDetails[`${field}Error` as ErrorKeys];
    }

    setVehicleDetails(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: error,
      },
    }));
  }, []);

  const handleNext = () => {
    let isValid = true;
    let newErrors: any = {...vehicleDetails.errors};
    Object.keys(vehicleDetails).forEach(field => {
      if (field !== 'errors' && !hasData(vehicleDetails[field])) {
        newErrors[field] =
          AppString.screens.auth.vehicleDetails[`${field}Error`] ||
          'This field is required';
        isValid = false;
      } else {
        newErrors[field] = '';
      }
    });

    setVehicleDetails(prev => ({
      ...prev,
      errors: newErrors,
    }));

    if (isValid) {
      console.log('Valid Data:', vehicleDetails);
      props.navigation.navigate('vehicleDocuments', {vehicleDetails});
    } else {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
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

  const InputField = useMemo(
    () =>
      ({
        label,
        placeholder,
        value,
        onChangeText,
        error,
        secureTextEntry,
        disabled,
        isLastField,
      }: any) =>
        (
          <AppTextInput
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            error={error}
            secureTextEntry={secureTextEntry}
            disabled={disabled}
            isLastField={isLastField}
          />
        ),
    [],
  );

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
            uploadProgress={documents.vehicleImage.uploadProgress}
            uploadStatus={documents.vehicleImage.uploadStatus}
            onPress={() =>
              handleFileUpload(
                AppString.screens.auth.vehicleDetails.sections[0].id,
              )
            }
            onDeletePress={() =>
              handleDeletePress(
                documents.vehicleImage,
                DocumentType.VehichleImages,
              )
            }
            onViewPress={() => {
              handleViewPress(documents.vehicleImage.url);
            }}
          />
          <InputField
            label={AppString.screens.auth.vehicleDetails.make}
            placeholder={AppString.screens.auth.vehicleDetails.make}
            value={vehicleDetails.make}
            onChangeText={(text: string) => handleInputChange('make', text)}
            error={vehicleDetails.errors.make}
          />
          <InputField
            label={AppString.screens.auth.vehicleDetails.model}
            placeholder={AppString.screens.auth.vehicleDetails.model}
            value={vehicleDetails.model}
            onChangeText={(text: string) => handleInputChange('model', text)}
            error={vehicleDetails.errors.model}
          />
          <InputField
            label={AppString.screens.auth.vehicleDetails.year}
            placeholder={AppString.screens.auth.vehicleDetails.year}
            value={vehicleDetails.year}
            onChangeText={(text: string) => handleInputChange('year', text)}
            error={vehicleDetails.errors.year}
          />
          <InputField
            label={AppString.screens.auth.vehicleDetails.vehicleNumber}
            placeholder={AppString.screens.auth.vehicleDetails.vehicleNumber}
            value={vehicleDetails.vehiclePlateNo}
            onChangeText={(text: string) =>
              handleInputChange('vehiclePlateNo', text)
            }
            error={vehicleDetails.errors.vehiclePlateNo}
          />
          <InputField
            label={AppString.screens.auth.vehicleDetails.vehicleType}
            placeholder={AppString.screens.auth.vehicleDetails.vehicleType}
            value={vehicleDetails.vehicleType}
            onChangeText={(text: string) =>
              handleInputChange('vehicleType', text)
            }
            error={vehicleDetails.errors.vehicleType}
          />
          <InputField
            label={AppString.screens.auth.vehicleDetails.seater}
            placeholder={AppString.screens.auth.vehicleDetails.seater}
            value={vehicleDetails.seater}
            onChangeText={(text: string) => handleInputChange('seater', text)}
            error={vehicleDetails.errors.seater}
          />
          <InputField
            label={AppString.screens.auth.vehicleDetails.color}
            placeholder={AppString.screens.auth.vehicleDetails.color}
            value={vehicleDetails.color}
            onChangeText={(text: string) => handleInputChange('color', text)}
            error={vehicleDetails.errors.color}
          />
          <AppButton
            buttonTitle={AppString.screens.auth.vehicleDetails.button}
            onPress={() => {
              handleNext();
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
  text: {
    fontSize: 24,
  },
  scrollViewStyle: {
    paddingHorizontal: 15,
  },
  steperStyle: {
    marginTop: 20,
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 30,
  },
});

export default VehicleDetails;
