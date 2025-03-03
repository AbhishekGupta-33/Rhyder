import React from 'react';
import {AppButton, AppText, ButtonType, ShadowCard} from '../../../components';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import {AppString} from '../../../utils/AppString';
import {callLogoutApi} from '../../Authentication/redux/thunk';
import {useDispatch} from 'react-redux';
import useTheme from '../../../hooks/useTheme';

interface BasicDetailsProps {
  onEditClick: () => void;
  data: any;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({onEditClick, data}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
    emailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    notVerifiedContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    notVerified: {
      color: theme.colors.gray_light,
      fontStyle: 'italic',
      fontSize: theme.fontSize.font_12,
      marginTop: theme.margin.margin_10,
    },
    resendLink: {
      color: theme.colors.blue,
      fontSize: theme.fontSize.font_12,
      marginTop: theme.margin.margin_10,
    },
    buttonStyle: {
      marginVertical: theme.margin.margin_20,
    },
  });

  return (
    <ShadowCard style={styles.card}>
      <View style={styles.cardHeader}>
        <AppText style={styles.cardTitle}>
          {AppString.screens.user.profile.header}
        </AppText>
        <TouchableOpacity onPress={onEditClick}>
          <IconButton
            icon="pencil"
            iconColor={theme.colors.pink}
            size={theme.fontSize.font_20}
          />
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
export default BasicDetails;
