import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserNavigator from './UserNavigator';
import ProfileNavigator from './ProfileNavigator';
import Icon from 'react-native-vector-icons/Entypo';
import {AppText} from '../../components';
import {AppString} from '../../utils/AppString';
import { useDispatch, useSelector } from 'react-redux';
import { userError, userLoaded, userLoading } from '../../modules/UserFlow/redux/selector';
import { userError as userErrorClean } from '../../modules/UserFlow/redux/userSlice';
import { Alert } from 'react-native';
import Loader from '../../components/AppLoader';
import { log } from '../../utils/Logger';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {

  const isUserError = useSelector(userError);
  const isUserLoading = useSelector(userLoading)
  const dispatch = useDispatch();
  useEffect(() => {
    if (isUserError) {
      Alert.alert('', `${isUserError}`, [
        {
          text: 'OK',
          onPress: () => dispatch(userErrorClean('')),
        },
      ]);
    }
  }, [isUserError]);


  const changeIconOnfocus = (focus: boolean, name: string, title: string) => {
    return (
      <>
        <Icon
          size={18}
          style={{
            opacity: focus ? 1 : 0.5,
          }}
          name={name}
          color={'rgb(0, 0, 50)'}
        />
        <AppText
          style={{
            opacity: focus ? 1 : 0.5,
            color: 'rgb(0, 0, 50)',
            fontSize:10
          }}>
          {title}
        </AppText>
      </>
    );
  };
log('isUserLoading---------',isUserLoading)
  return (
    <>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AppString.NavigationScreens.stackNavigator.User}>
      <Tab.Screen
        name={AppString.NavigationScreens.stackNavigator.User}
        component={UserNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return changeIconOnfocus(true, 'home', 'Home');
            } else {
              return changeIconOnfocus(false, 'home', 'Home');
            }
          },
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name={AppString.NavigationScreens.stackNavigator.Profile}
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return changeIconOnfocus(true, 'user', 'profile');
            } else {
              return changeIconOnfocus(false, 'user', 'profile');
            }
          },
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
    <Loader loading={isUserLoading}/>
    </>
  );
};
export default TabNavigator;
