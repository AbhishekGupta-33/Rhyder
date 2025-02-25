import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppHeader} from '../../../components';
import {AppString} from '../../../utils/AppString';

const DriverDocuments: React.FC = (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <AppHeader
            headerTitle={AppString.screens.auth.driverDocuments.title}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default DriverDocuments;
