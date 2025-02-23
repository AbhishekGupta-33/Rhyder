import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  AppButton,
  AppText,
  AppTextInput,
  ButtonType,
} from '../../../components';
import {AppString} from '../../../utils/AppString';

interface UpdateProfileProps {
  onUpdatePress: () => void;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({onUpdatePress}) => {
  const [updateProfileDetails, setUpdateProfileDetails] = useState({
    name: 'Scarlett Johansson',
    phone: '+1 012 345 6789',
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
        buttonTitleStyle={{color: '#ffffff'}}
        buttonStyle={{marginVertical: 5}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
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
