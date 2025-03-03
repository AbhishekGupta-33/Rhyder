import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  AppButton,
  AppText,
  AppTextInput,
  ButtonType,
} from '../../../components';
import {AppString} from '../../../utils/AppString';
import {TextInput} from 'react-native-paper';
import useTheme from '../../../hooks/useTheme';

interface UpdateProfileProps {
  onUpdatePress: () => void;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({onUpdatePress}) => {
  const theme = useTheme();
  const [updateProfileDetails, setUpdateProfileDetails] = useState({
    name: 'Scarlett Johansson',
    phone: '012 345 6789',
    email: 'scarlett1234@gmail.com',
    errors: {
      name: '',
      phone: '',
      email: '',
    },
  });

  // Handle input change
  const handleChange = (key: string, value: string) => {
    setUpdateProfileDetails({...updateProfileDetails, [key]: value});
  };

  const styles = StyleSheet.create({
    card: {
      padding: theme.spacing.spacing_15,
      marginTop: theme.margin.margin_24,
    },
    cardTitle: {
      fontSize: theme.fontSize.font_18,
      fontWeight: 'bold',
      color: theme.colors.black,
      marginVertical: theme.margin.margin_10,
    },
    label: {
      color: theme.colors.gray_light,
      marginTop: theme.margin.margin_10,
      fontSize: theme.fontSize.font_14,
    },
    value: {
      fontSize: theme.fontSize.font_14,
      fontWeight: 'bold',
      marginBottom: theme.margin.margin_10,
    },
    resendLink: {color: theme.colors.blue, fontSize: theme.fontSize.font_12},
    resendTouchableStyle: {
      marginBottom: -theme.margin.margin_20,
      alignSelf: 'flex-end',
      paddingHorizontal: theme.spacing.spacing_10,
    },
  });

  return (
    <View style={styles.card}>
      <AppText style={styles.cardTitle}>
        {AppString.screens.user.profile.header}
      </AppText>
      <AppTextInput
        label={AppString.screens.user.profile.nameLabel}
        value={updateProfileDetails.name}
        onChangeText={text => {
          handleChange('name', text);
        }}
        placeholder={AppString.screens.user.profile.namePlaceholder}
        error={updateProfileDetails.errors.name}
      />

      <AppTextInput
        label={AppString.screens.user.profile.numberLabel}
        value={updateProfileDetails.phone}
        onChangeText={text => {
          handleChange('phone', text);
        }}
        placeholder={AppString.screens.user.profile.numberPlaceholder}
        leftIcon={<TextInput.Icon icon={'numeric-positive-1'} />}
        error={updateProfileDetails.errors.phone}
      />

      <TouchableOpacity style={styles.resendTouchableStyle} onPress={() => {}}>
        <AppText style={styles.resendLink}>
          {AppString.screens.user.profile.resendVerificationLink}
        </AppText>
      </TouchableOpacity>

      <AppTextInput
        label={AppString.screens.user.profile.emailLabel}
        value={updateProfileDetails.email}
        onChangeText={text => {
          handleChange('email', text);
        }}
        placeholder={AppString.screens.user.profile.emailPlaceholder}
        error={updateProfileDetails.errors.email}
      />
      <AppButton
        buttonTitle={AppString.screens.user.profile.updateButton}
        onPress={onUpdatePress}
        buttonType={ButtonType.PRIMARY}
        buttonTitleStyle={{color: theme.colors.white}}
        buttonStyle={{marginVertical: theme.margin.margin_5}}
      />
    </View>
  );
};

export default UpdateProfile;
