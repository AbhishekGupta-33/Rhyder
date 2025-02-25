import React from 'react';
import {AppButton, AppText, ButtonType, ShadowCard} from '../../../components';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import {AppString} from '../../../utils/AppString';
import {callLogoutApi} from '../../Authentication/redux/thunk';
import {useDispatch} from 'react-redux';

interface BasicDetailsProps {
  onEditClick: () => void;
  data: any;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({onEditClick, data}) => {
  const dispatch = useDispatch();

  return (
    <ShadowCard style={styles.card}>
      <View style={styles.cardHeader}>
        <AppText style={styles.cardTitle}>
          {AppString.screens.user.profile.header}
        </AppText>
        <TouchableOpacity onPress={onEditClick}>
          <IconButton icon="pencil" iconColor="#FF69B4" size={20} />
        </TouchableOpacity>
      </View>
      <AppText style={styles.label}>
        {AppString.screens.user.profile.nameLabel}
      </AppText>
      <AppText style={styles.value}>
        {data.firstName + ' ' + data.lastName}
      </AppText>
      <AppText style={styles.label}>
        {AppString.screens.user.profile.numberLabel}
      </AppText>
      <AppText style={styles.value}>{data.phoneNumber}</AppText>
      <View style={styles.emailContainer}>
        <AppText style={styles.label}>
          {AppString.screens.user.profile.emailLabel}
        </AppText>
        <View style={styles.notVerifiedContainerStyle}>
          <AppText style={styles.notVerified}>
            {AppString.screens.user.profile.notVerified}
          </AppText>
          <AppText style={styles.resendLink}>
            {AppString.screens.user.profile.resendLink}
          </AppText>
        </View>
      </View>
      <AppText style={styles.value}>{data.email}</AppText>
      <AppButton
        buttonTitle={AppString.screens.user.profile.logout}
        onPress={async () => {
          await callLogoutApi(dispatch);
        }}
        buttonType={ButtonType.PRIMARY}
        // buttonTitleStyle={styles.buttonTitleStyle}
        buttonStyle={styles.buttonStyle}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 10,
  },
  label: {color: '#777', marginTop: 10, fontSize: 14},
  value: {fontSize: 14, fontWeight: 'bold', marginBottom: 10},
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notVerifiedContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notVerified: {
    color: '#777',
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 10,
  },
  resendLink: {color: 'blue', fontSize: 12, marginTop: 10},
  buttonStyle: {
    marginVertical: 20,
  },
});
export default BasicDetails;
