import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  AppButton,
  AppText,
  AppTextInput,
  ButtonType,
  ShadowCard,
} from '../../../components';
import {AppString} from '../../../utils/AppString';

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
          console.log('text===', text);
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
          console.log('text===', text);
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
          console.log('text===', text);
        }}
        placeholder={
          AppString.screens.user.changePassword.confirmPasswordPlaceholder
        }
        error={changePasswordDetails.errors.confirmNewPassword}
      />
      <AppButton
        buttonTitle={AppString.screens.user.changePassword.updateButton}
        onPress={() => {}}
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
    marginBottom:10,
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
