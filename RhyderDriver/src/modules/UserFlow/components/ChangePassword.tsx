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
import useTheme from '../../../hooks/useTheme';

const ChangePassword: React.FC = () => {
  const theme = useTheme();
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

  const styles = StyleSheet.create({
    card: {
      padding: theme.spacing.spacing_15,
      marginVertical: theme.margin.margin_15,
      borderRadius: theme.radius.borderRadius_20,
    },
    cardHeader: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray,
      borderStyle: 'solid',
      marginBottom: theme.margin.margin_10,
    },
    uploadDocsTitle: {
      marginVertical: theme.margin.margin_16,
    },
    cardTitle: {
      fontSize: theme.fontSize.font_18,
      fontWeight: 'bold',
      color: theme.colors.black,
      marginVertical: theme.margin.margin_10,
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
        buttonTitleStyle={{color: theme.colors.white}}
        buttonStyle={{marginVertical: theme.margin.margin_5}}
      />
    </ShadowCard>
  );
};

export default ChangePassword;
