import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {callGetProfileApi} from '../redux/thunk';
import {useDispatch} from 'react-redux';

const Profile: React.FC = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    callGetProfileApi(dispatch);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Profile</Text>
      <Button
        title="Click"
        onPress={() => {
          console.log('Click');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default Profile;
