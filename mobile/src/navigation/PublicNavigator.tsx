import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabBar from '../components/navigation/BottomTabBar';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import OffersScreen from '../screens/OffersScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RestaurantMenuScreen from '../screens/RestaurantMenuScreen';
import { Tab as TabItem } from '../types';
import { PublicStackParamList, PublicTabParamList } from './types';

const Stack = createNativeStackNavigator<PublicStackParamList>();
const Tab = createBottomTabNavigator<PublicTabParamList>();

const tabs: TabItem[] = [
  { id: 'explore', label: 'Explorar', icon: 'compass-outline', activeIcon: 'compass' },
  { id: 'orders',  label: 'Pedidos',  icon: 'receipt-outline', activeIcon: 'receipt' },
  { id: 'offers',  label: 'Ofertas',  icon: 'tag-outline',     activeIcon: 'tag' },
  { id: 'profile', label: 'Perfil',   icon: 'account-outline', activeIcon: 'account' },
];

function PublicTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => {
        const routeToTab: Record<string, string> = {
          Explore: 'explore',
          Offers: 'offers',
        };
        const activeTab = routeToTab[props.state.routes[props.state.index].name] ?? 'explore';
        return (
          <BottomTabBar
            tabs={tabs}
            activeTab={activeTab}
            onTabPress={(tabId) => {
              if (tabId === 'explore') props.navigation.navigate('Explore');
              if (tabId === 'offers')  props.navigation.navigate('Offers');
              if (tabId === 'orders' || tabId === 'profile') {
                props.navigation.getParent()?.navigate('Login');
              }
            }}
          />
        );
      }}
    >
      <Tab.Screen name="Explore" component={HomeScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
    </Tab.Navigator>
  );
}

export default function PublicNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PublicTabs" component={PublicTabs} />
      <Stack.Screen name="RestaurantMenu" component={RestaurantMenuScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
