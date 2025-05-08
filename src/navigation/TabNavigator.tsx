import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import NewHotScreen from '../screens/NewHot';
import MyNetflixScreen from '../screens/MyNetflix';
import HomeTabIcon from '../components/icons/HomeTabIcon';
import PlaySquareTabIcon from '../components/icons/PlaySquareTabIcon';
import UserTabIcon from '../components/icons/UserTabIcon';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarStyle: {backgroundColor: '#000'},
  tabBarActiveTintColor: '#fff',
  tabBarInactiveTintColor: '#9E9E9E',
};

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name="New & Hot"
        component={NewHotScreen}
        options={{
          tabBarIcon: PlaySquareTabIcon,
        }}
      />

      <Tab.Screen
        name="My Netflix"
        component={MyNetflixScreen}
        options={{
          tabBarIcon: UserTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
