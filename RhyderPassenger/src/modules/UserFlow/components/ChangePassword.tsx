import React, {useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  AppButton,
  AppText,
  AppTextInput,
  ButtonType,
  ShadowCard,
} from '../../../components';
import {AppString} from '../../../utils/AppString';
import {hasData, hasValidPassword} from '../../../utils/Validators';
import {useDispatch} from 'react-redux';
import {callChangePasswordApi} from '../redux/thunk';

const ChangePassword: React.FC = () => {
  const [changePasswordDetails, setChangePasswordDetails] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    errors: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const dispatch = useDispatch();

  const validateField = (field: string, value: string) => {
    if (!hasData(value))
      return AppString.screens.user.changePassword.fieldError;
    if (
      (field === 'currentPassword' || field === 'newPassword') &&
      !hasValidPassword(value)
    )
      return AppString.screens.user.changePassword.confirmPasswordError;
    if (
      field === 'confirmNewPassword' &&
      value !== changePasswordDetails.newPassword
    )
      return AppString.screens.user.changePassword.newConfirmPasswordError;
    return '';
  };

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      setChangePasswordDetails(prev => ({
        ...prev,
        [field]: value,
        errors: {...prev.errors, [field]: validateField(field, value)},
      }));
    },
    [validateField, hasValidPassword],
  );

  const validatePassword = useCallback((password: string, errorKey: string) => {
    return hasValidPassword(password) ? '' : errorKey;
  }, []);

  const handleChangePassword = useCallback(() => {
    const {currentPassword, newPassword, confirmNewPassword} =
      changePasswordDetails;
    const errors = {
      currentPassword: hasData(currentPassword)
        ? validatePassword(
            newPassword,
            AppString.screens.user.changePassword.oldPasswordError,
          )
        : AppString.screens.user.changePassword.fieldError,
      newPassword: hasData(newPassword)
        ? validatePassword(
            newPassword,
            AppString.screens.user.changePassword.newConfirmPasswordError,
          )
        : AppString.screens.user.changePassword.fieldError,
      confirmNewPassword: hasData(confirmNewPassword)
        ? validatePassword(
            newPassword,
            AppString.screens.user.changePassword.confirmPasswordError,
          )
        : AppString.screens.user.changePassword.fieldError,
    };

    if (Object.values(errors).some(error => error !== '')) {
      setChangePasswordDetails(prev => ({...prev, errors}));
    } else {
      const userSignupData = {
        oldPassword: changePasswordDetails.currentPassword,
        newPassword: changePasswordDetails.confirmNewPassword,
      };
      callChangePasswordApi(dispatch, userSignupData);
    }
  }, [
    changePasswordDetails,
    dispatch,
    callChangePasswordApi,
    validatePassword,
    setChangePasswordDetails,
  ]);

  return (
    <ShadowCard style={styles.card}>
      <View style={styles.cardHeader}>
        <AppText style={styles.cardTitle}>
          {AppString.screens.user.changePassword.header}
        </AppText>
      </View>
      <AppTextInput
        label={AppString.screens.user.changePassword.currentLabel}
        value={changePasswordDetails.currentPassword}
        onChangeText={text => {
          handleInputChange('currentPassword', text);
        }}
        placeholder={
          AppString.screens.user.changePassword.currentPasswordPlaceholder
        }
        error={changePasswordDetails.errors.currentPassword}
      />
      <AppTextInput
        label={AppString.screens.user.changePassword.newPasswordLabel}
        value={changePasswordDetails.newPassword}
        onChangeText={text => {
          handleInputChange('newPassword', text);
        }}
        placeholder={
          AppString.screens.user.changePassword.newPasswordPlaceholder
        }
        error={changePasswordDetails.errors.newPassword}
      />
      <AppTextInput
        label={AppString.screens.user.changePassword.confirmPasswordLabel}
        value={changePasswordDetails.confirmNewPassword}
        onChangeText={text => {
          handleInputChange('confirmNewPassword', text);
        }}
        placeholder={
          AppString.screens.user.changePassword.confirmPasswordPlaceholder
        }
        error={changePasswordDetails.errors.confirmNewPassword}
      />
      <AppButton
        buttonTitle={AppString.screens.user.changePassword.updateButton}
        onPress={handleChangePassword}
        buttonType={ButtonType.PRIMARY}
        buttonTitleStyle={{color: '#ffffff'}}
        buttonStyle={{marginVertical: 5}}
      />
    </ShadowCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 15,
    borderRadius: 20,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderStyle: 'solid',
    marginBottom: 10,
  },
  uploadDocsTitle: {
    marginVertical: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 10,
  },
});

export default ChangePassword;
