import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  AppButton,
  AppText,
  AppTextInput,
  ButtonType,
} from '../../../components';
import {AppString} from '../../../utils/AppString';
import {TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {profileResponseData} from '../redux/selector';
import {ProfileDataResponse} from '../../../utils/ConstantTypes/userTypes';
import {
  hasData,
  hasValidateEmail,
  hasValidPassword,
  hasValidPhoneNumber,
} from '../../../utils/Validators';

type UpdateProfileProps = {
  onUpdatePress: (userData: any) => void;
};

const UpdateProfile: React.FC<UpdateProfileProps> = ({onUpdatePress}: UpdateProfileProps) => {
  const profileData: ProfileDataResponse = useSelector(profileResponseData);
  const [updateProfileDetails, setUpdateProfileDetails] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    phone: profileData.phoneNumber,
    email: profileData.email,
    errors: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
  });
  useEffect(() => {
    if (profileData) {
      setUpdateProfileDetails({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phoneNumber,
        email: profileData.email,
        errors: {
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
        },
      });
    }
  }, [profileData]);

  // Handle input change
  const handleChange = (key: string, value: string) => {
    let error = '';
    if (!hasData(value)) {
      error = AppString.screens.user.profile.fieldError;
    } else if (key === 'email' && !hasValidateEmail(value)) {
      error = AppString.screens.user.profile.emailError;
    } else if (key === 'phone' && !hasValidPhoneNumber(value)) {
      error = AppString.screens.user.profile.emailError;
    }
    setUpdateProfileDetails({...updateProfileDetails, [key]: value});
  };

  const validateEmail = useCallback((email: string) => {
    return hasValidateEmail(email)
      ? ''
      : AppString.screens.auth.signupStep2.emailError;
  }, []);

  const validatePhone = useCallback((phone: string) => {
    return hasValidPhoneNumber(phone)
      ? ''
      : AppString.screens.auth.signupStep2.emailError;
  }, []);

  const handleUploadClick = useCallback(() => {
    const {firstName, lastName, email, phone} = updateProfileDetails;
    const errors = {
      firstName: hasData(firstName)
        ? ''
        : AppString.screens.user.profile.firstNameError,
      lastName: hasData(lastName)
        ? ''
        : AppString.screens.user.profile.lastNameError,
      email: hasData(email)
        ? validateEmail(email)
        : AppString.screens.user.profile.emailError,
      phone: hasData(phone)
        ? validatePhone(phone)
        : AppString.screens.user.profile.phoneError,
    };

    if (Object.values(errors).some(error => error !== '')) {
      setUpdateProfileDetails((prev: any) => ({...prev, errors}));
    } else {
      const userSignupData = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone,
        email: email,
      };
      onUpdatePress(userSignupData);
    }
  }, [updateProfileDetails, validateEmail, onUpdatePress]);

  return (
    <View style={styles.card}>
      <AppTextInput
        label={AppString.screens.user.profile.firstNameLabel}
        value={updateProfileDetails.firstName}
        onChangeText={(text: string) => {
          handleChange('firstName', text);
        }}
        placeholder={AppString.screens.user.profile.namePlaceholder}
        error={updateProfileDetails.errors.firstName}
      />
      <AppTextInput
        label={AppString.screens.user.profile.lastNameLabel}
        value={updateProfileDetails.lastName}
        onChangeText={(text: string) => {
          handleChange('lastName', text);
        }}
        placeholder={AppString.screens.user.profile.namePlaceholder}
        error={updateProfileDetails.errors.lastName}
      />

      <AppTextInput
        label={AppString.screens.user.profile.numberLabel}
        value={updateProfileDetails.phone}
        onChangeText={(text: string) => {
          handleChange('phone', text);
        }}
        placeholder={AppString.screens.user.profile.numberPlaceholder}
        leftIcon={<TextInput.Icon icon={'numeric-positive-1'} />}
        error={updateProfileDetails.errors.phone}
      />

      <AppTextInput
        label={AppString.screens.user.profile.emailLabel}
        value={updateProfileDetails.email}
        onChangeText={(text: string) => {
          handleChange('email', text);
        }}
        placeholder={AppString.screens.user.profile.emailPlaceholder}
        error={updateProfileDetails.errors.email}
      />
      <AppButton
        buttonTitle={AppString.screens.user.profile.updateButton}
        onPress={handleUploadClick}
        buttonType={ButtonType.PRIMARY}
        buttonTitleStyle={{color: '#ffffff'}}
        buttonStyle={{marginVertical: 5}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 25,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 10,
  },
  label: {color: '#777', marginTop: 10, fontSize: 14},
  value: {fontSize: 14, fontWeight: 'bold', marginBottom: 10},
  resendLink: {color: 'blue', fontSize: 12},
  resendTouchableStyle: {
    marginBottom: -20,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
  },
});

export default UpdateProfile;
