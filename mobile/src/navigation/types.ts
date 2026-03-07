import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Restaurant } from '../data/mock';

export type RootStackParamList = {
  Home: undefined;
  RestaurantMenu: { restaurant: Restaurant };
};

export type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;
