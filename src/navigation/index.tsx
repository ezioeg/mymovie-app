import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import MediaScreen from '../screens/Media';
import SearchScreen from '../screens/Search';
import {RootStackParamList} from '../types/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerBackImage: () => null,
  headerLeftContainerStyle: {},
  headerShown: false,
  headerTitle: () => null,
  headerStyle: {},
};

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Media" component={MediaScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
