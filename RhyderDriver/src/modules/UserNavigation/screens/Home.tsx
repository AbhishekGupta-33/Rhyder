import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const Home: React.FC = (props: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home</Text>
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

export default Home;
