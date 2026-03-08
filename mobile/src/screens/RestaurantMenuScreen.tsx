import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CartBar from '../components/menu/CartBar';
import MenuItemComponent from '../components/menu/MenuItem';
import MenuTabs from '../components/menu/MenuTabs';
import { Colors } from '../constants/colors';
import { PublicStackNavigation, PublicStackParamList } from '../navigation/types';
import { useCartStore } from '../stores/cartStore';

export default function RestaurantMenuScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<PublicStackNavigation>();
  const route = useRoute<RouteProp<PublicStackParamList, 'RestaurantMenu'>>();
  const { restaurant } = route.params;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [selectedTab, setSelectedTab] = useState('popular');

  const { items, addItem, removeItem, totalItems, totalPrice } = useCartStore();

  const addToCart = (item: (typeof restaurant.menu)[0]) =>
    addItem(restaurant, item);
  const removeFromCart = (item: (typeof restaurant.menu)[0]) =>
    removeItem(item.id);

  if (!fontsLoaded) {
    return (
      <View className='flex-1 bg-background items-center justify-center'>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  const itemCount = totalItems();
  const orderTotal = totalPrice();

  const filteredMenu = restaurant.menu.filter(
    (item) => item.tab === selectedTab,
  );

  return (
    <View className='flex-1 bg-background'>
      <StatusBar style='light' />

      {/* Hero */}
      <View
        className='w-full items-center justify-center'
        style={{
          height: 220,
          backgroundColor: `${restaurant.iconColor}20`,
          paddingTop: insets.top,
        }}
      >
        <MaterialCommunityIcons
          name={restaurant.iconName as any}
          size={90}
          color={restaurant.iconColor}
          style={{ opacity: 0.7 }}
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='absolute top-0 left-4 w-9 h-9 rounded-full bg-surface items-center justify-center'
          style={{
            top: insets.top + 12,
            elevation: 3,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name='arrow-left'
            size={20}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>

        <View
          className='absolute flex-row gap-2'
          style={{ top: insets.top + 12, right: 16 }}
        >
          <TouchableOpacity
            className='w-9 h-9 rounded-full bg-surface items-center justify-center'
            style={{
              elevation: 3,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name='share-variant-outline'
              size={18}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className='w-9 h-9 rounded-full bg-surface items-center justify-center'
            style={{
              elevation: 3,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name='heart-outline'
              size={18}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info card */}
      <View
        className='bg-surface px-5 py-4'
        style={{
          elevation: 2,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
        }}
      >
        <View className='flex-row items-start justify-between'>
          <View className='flex-1 mr-3'>
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 20,
                color: Colors.textPrimary,
              }}
            >
              {restaurant.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 13,
                color: Colors.textSecondary,
                marginTop: 2,
              }}
            >
              {restaurant.categories.join(' • ')}
            </Text>
          </View>
          <View
            className='flex-row items-center rounded-xl px-3 py-1'
            style={{ backgroundColor: `${Colors.primary}15` }}
          >
            <MaterialCommunityIcons
              name='star'
              size={14}
              color={Colors.primary}
            />
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 14,
                color: Colors.primary,
                marginLeft: 4,
              }}
            >
              {restaurant.rating}
            </Text>
          </View>
        </View>

        <View className='flex-row items-center mt-3 pt-3 border-t border-border gap-4'>
          <View className='flex-row items-center gap-1'>
            <MaterialCommunityIcons
              name='clock-outline'
              size={14}
              color={Colors.textSecondary}
            />
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 12,
                color: Colors.textSecondary,
              }}
            >
              {restaurant.deliveryTime}
            </Text>
          </View>
          <View className='flex-row items-center gap-1'>
            <MaterialCommunityIcons
              name='moped-outline'
              size={14}
              color={Colors.textSecondary}
            />
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 12,
                color: Colors.textSecondary,
              }}
            >
              {restaurant.deliveryFee}
            </Text>
          </View>
          <View className='flex-row items-center gap-1'>
            <MaterialCommunityIcons
              name='map-marker-outline'
              size={14}
              color={Colors.textSecondary}
            />
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 12,
                color: Colors.textSecondary,
              }}
            >
              {restaurant.distance}
            </Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <MenuTabs selected={selectedTab} onSelect={setSelectedTab} />

      {/* Menu list */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: itemCount > 0 ? 100 : 20 }}
      >
        <Text
          className='px-5 pt-5 pb-2'
          style={{
            fontFamily: 'Poppins_700Bold',
            fontSize: 16,
            color: Colors.textPrimary,
          }}
        >
          {selectedTab === 'popular'
            ? 'Mais pedidos'
            : selectedTab === 'mains'
              ? 'Pratos'
              : selectedTab === 'drinks'
                ? 'Bebidas'
                : 'Sobremesas'}
        </Text>
        {filteredMenu.map((item) => (
          <MenuItemComponent
            key={item.id}
            item={item}
            quantity={items[item.id]?.quantity ?? 0}
            onAdd={() => addToCart(item)}
            onRemove={() => removeFromCart(item)}
          />
        ))}
      </ScrollView>

      {itemCount > 0 && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <CartBar
            total={orderTotal}
            itemCount={itemCount}
            onPress={() => navigation.navigate('Cart')}
          />
        </View>
      )}
    </View>
  );
}
