import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Restaurant } from '../data/mock';

// Tabs públicas (bottom tab bar)
export type PublicTabParamList = {
  Explore: undefined;
  Offers: undefined;
};

// Stack público — telas acessíveis sem login
export type PublicStackParamList = {
  PublicTabs: undefined;
  RestaurantMenu: { restaurant: Restaurant };
  Cart: undefined;
  SearchResults: undefined;
  Login: undefined;
  Register: undefined;
};

// Tabs privadas (bottom tab bar autenticado)
export type PrivateTabParamList = {
  Explore: undefined;
  Orders: undefined;
  Offers: undefined;
  Profile: undefined;
};

// Stack privado — telas que exigem login
export type PrivateStackParamList = {
  PrivateTabs: undefined;
  RestaurantMenu: { restaurant: Restaurant };
  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderId: string };
  OrderTracking: { orderId: string };
};

// Stack de autenticação
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// Tipos de navegação por contexto
export type PublicStackNavigation = NativeStackNavigationProp<PublicStackParamList>;
export type PrivateStackNavigation = NativeStackNavigationProp<PrivateStackParamList>;
export type PrivateTabNavigation = BottomTabNavigationProp<PrivateTabParamList>;
export type AuthStackNavigation = NativeStackNavigationProp<AuthStackParamList>;
export type PublicTabNavigation = BottomTabNavigationProp<PublicTabParamList>;
