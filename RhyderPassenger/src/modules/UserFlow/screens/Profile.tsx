import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {callGetProfileApi} from '../redux/thunk';
import {AppHeader, AppText} from '../../../components';
import {appImage} from '../../../utils/Constants';
import {AppString} from '../../../utils/AppString';
import ChangePassword from '../components/ChangePassword';
import UploadDocuments from '../components/UploadedDocuments';
import BasicDetails from '../components/BasicDetails';
import UpdateProfile from '../components/UpdateProfile';
import {pick, types} from '@react-native-documents/picker';
import {profileResponseData} from '../redux/selector';

const Profile: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
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
  const profileData = useSelector(profileResponseData);

  useEffect(() => {
    callGetProfileApi(dispatch);
  }, []);

  const handleProfileChange = async () => {
    const [image] = await pick({
      mode: 'open',
      type: [types.images],
      requestLongTermAccess: true,
      transitionStyle: 'flipHorizontal',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <AppHeader headerTitle={AppString.screens.user.profile.pageHeader} />
        <View style={styles.headerContainerStyle}>
          <View style={styles.profileContainer}>
            <Image
              source={{uri: appImage.staticImage}}
              style={styles.profileImage}
            />
            <TouchableOpacity
              onPress={() => handleProfileChange()}
              style={styles.editIconStyle}>
              <Icon name="pencil" color="#FF69B4" size={20} />
            </TouchableOpacity>
          </View>
          <AppText style={styles.name}>
            {profileData.firstName + ' ' + profileData.lastName}
          </AppText>
        </View>
        {!isEditable && (
          <View style={styles.tabContainer}>
            <AppText
              style={[selectedTab === 1 && styles.selectedTab]}
              onPress={() => setSelectedTab(1)}>
              {AppString.screens.user.profile.tab1}
            </AppText>
            <AppText
              style={[selectedTab === 2 && styles.selectedTab]}
              onPress={() => setSelectedTab(2)}>
              {AppString.screens.user.profile.tab2}
            </AppText>
            <AppText
              style={[selectedTab === 3 && styles.selectedTab]}
              onPress={() => setSelectedTab(3)}>
              {AppString.screens.user.profile.tab3}
            </AppText>
          </View>
        )}
        {selectedTab === 1 &&
          (isEditable ? (
            <UpdateProfile onUpdatePress={() => setIsEditable(false)} />
          ) : (
            <BasicDetails
              data={profileData}
              onEditClick={() => setIsEditable(true)}
            />
          ))}
        {selectedTab === 2 && <UploadDocuments />}
        {selectedTab === 3 && <ChangePassword />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  scrollView: {flexGrow: 1, paddingHorizontal: 20},
  headerContainerStyle: {
    alignItems: 'center',
  },
  profileContainer: {
    alignSelf: 'center',
  },
  editIconStyle: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    right: -10,
    bottom: 15,
    borderRadius: 15,
    padding: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#000000',
  },
  name: {fontSize: 18, fontWeight: 'bold', marginTop: 10},
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  selectedTab: {
    color: '#FF69B4',
    textDecorationLine: 'underline',
  },
});

export default Profile;
