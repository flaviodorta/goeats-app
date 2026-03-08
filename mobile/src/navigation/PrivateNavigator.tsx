import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabBar from '../components/navigation/BottomTabBar';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import OffersScreen from '../screens/OffersScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RestaurantMenuScreen from '../screens/RestaurantMenuScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import { Tab as TabItem } from '../types';
import { PrivateStackParamList, PrivateTabParamList } from './types';

const Stack = createNativeStackNavigator<PrivateStackParamList>();
const Tab = createBottomTabNavigator<PrivateTabParamList>();

const tabs: TabItem[] = [
  {
    id: 'explore',
    label: 'Início',
    icon: 'home-outline',
    activeIcon: 'home',
  },
  {
    id: 'orders',
    label: 'Pedidos',
    icon: 'receipt-outline',
    activeIcon: 'receipt',
  },
  {
    id: 'offers',
    label: 'Ofertas',
    icon: 'tag-outline',
    activeIcon: 'tag',
  },
  {
    id: 'profile',
    label: 'Perfil',
    icon: 'account-outline',
    activeIcon: 'account',
  },
];

function PrivateTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => {
        const routeToTab: Record<string, string> = {
          Explore: 'explore',
          Orders: 'orders',
          Offers: 'offers',
          Profile: 'profile',
        };

        const activeTab =
          routeToTab[props.state.routes[props.state.index].name] ?? 'explore';

        return (
          <BottomTabBar
            tabs={tabs}
            activeTab={activeTab}
            onTabPress={(tabId) => {
              if (tabId === 'explore') props.navigation.navigate('Explore');
              if (tabId === 'orders') props.navigation.navigate('Orders');
              if (tabId === 'offers') props.navigation.navigate('Offers');
              if (tabId === 'profile') props.navigation.navigate('Profile');
            }}
          />
        );
      }}
    >
      <Tab.Screen name='Explore' component={HomeScreen} />
      <Tab.Screen name='Orders' component={OrdersScreen} />
      <Tab.Screen name='Offers' component={OffersScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function PrivateNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='PrivateTabs' component={PrivateTabs} />
      <Stack.Screen name='RestaurantMenu' component={RestaurantMenuScreen} />
      <Stack.Screen name='Cart' component={CartScreen} />
      <Stack.Screen name='SearchResults' component={SearchResultsScreen} />
    </Stack.Navigator>
  );
}
