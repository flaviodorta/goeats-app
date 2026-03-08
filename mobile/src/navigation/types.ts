import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Restaurant } from '../data/mock';

export type PublicTabParamList = {
  Explore: undefined;
  Offers: undefined;
};

export type PublicStackParamList = {
  PublicTabs: undefined;
  RestaurantMenu: { restaurant: Restaurant };
  Cart: undefined;
  SearchResults: undefined;
  Login: undefined;
  Register: undefined;
};

export type PrivateTabParamList = {
  Explore: undefined;
  Orders: undefined;
  Offers: undefined;
  Profile: undefined;
};

export type PrivateStackParamList = {
  PrivateTabs: undefined;
  RestaurantMenu: { restaurant: Restaurant };
  Cart: undefined;
  SearchResults: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderId: string };
  OrderTracking: { orderId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type PublicStackNavigation =
  NativeStackNavigationProp<PublicStackParamList>;
export type PrivateStackNavigation =
  NativeStackNavigationProp<PrivateStackParamList>;
export type PrivateTabNavigation = BottomTabNavigationProp<PrivateTabParamList>;
export type AuthStackNavigation = NativeStackNavigationProp<AuthStackParamList>;
export type PublicTabNavigation = BottomTabNavigationProp<PublicTabParamList>;
