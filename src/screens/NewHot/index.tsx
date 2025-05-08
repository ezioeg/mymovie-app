import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function NewHotScreen() {
  return (
    <View style={styles.container}>
      <Text>NewHot Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewHotScreen;
