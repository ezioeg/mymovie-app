import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function MyNetflixScreen() {
  return (
    <View style={styles.container}>
      <Text>MyNetflix Screen</Text>
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

export default MyNetflixScreen;
