import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import MovieScreen from '../screens/Movie';
import SearchScreen from '../screens/Search';

export type RootStackParamList = {
  TabNavigator: undefined;
  Movie: {type: 'movie' | 'serie'} | undefined;
  Search: {activeCategory: 'movies' | 'series' | 'categories'};
};

const Stack = createNativeStackNavigator();

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
        <Stack.Screen name="Movie" component={MovieScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
