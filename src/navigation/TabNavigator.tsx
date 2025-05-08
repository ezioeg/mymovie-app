import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, PlaySquare, User} from 'lucide-react-native';
import HomeScreen from '../screens/Home';
import NewHotScreen from '../screens/NewHot';
import MyNetflixScreen from '../screens/MyNetflix';

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
          tabBarIcon: ({color, size}) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="New & Hot"
        component={NewHotScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <PlaySquare size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="My Netflix"
        component={MyNetflixScreen}
        options={{
          tabBarIcon: ({color, size}) => <User size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
