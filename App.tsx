import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Navigation from './src/navigation';
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews',
]);

function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
