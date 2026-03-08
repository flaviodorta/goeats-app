import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CartBar from '../components/menu/CartBar';
import MenuTabs from '../components/menu/MenuTabs';
import { Colors } from '../constants/colors';
import { PublicStackParamList } from '../navigation/types';
import { useCartStore } from '../stores/cartStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 52) / 2;

export default function RestaurantMenuScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<PublicStackParamList, 'RestaurantMenu'>>();
  const { restaurant } = route.params;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [selectedTab, setSelectedTab] = useState('popular');
  const { items, addItem, totalItems, totalPrice } = useCartStore();

  const filteredMenu = useMemo(
    () => restaurant.menu.filter((item) => item.tab === selectedTab),
    [restaurant.menu, selectedTab],
  );

  if (!fontsLoaded) {
    return (
      <View className='flex-1 bg-background items-center justify-center'>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  const itemCount = totalItems();
  const orderTotal = totalPrice();

  return (
    <View className='flex-1 bg-background'>
      <StatusBar style='light' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: itemCount > 0 ? 110 : 24 }}
      >
        <View style={{ height: 220, backgroundColor: Colors.primary }}>
          <Image
            source={{ uri: restaurant.coverImage }}
            style={{ width: '100%', height: '100%', position: 'absolute', opacity: 0.3 }}
            resizeMode='cover'
          />

          <View style={{ paddingTop: insets.top + 12 }} className='px-4'>
            <View className='flex-row items-center justify-between'>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className='w-9 h-9 rounded-full bg-white/25 items-center justify-center'
                activeOpacity={0.85}
              >
                <MaterialCommunityIcons name='arrow-left' size={20} color='#FFF' />
              </TouchableOpacity>

              <View className='flex-row gap-2'>
                <TouchableOpacity className='w-9 h-9 rounded-full bg-white/25 items-center justify-center'>
                  <MaterialCommunityIcons name='heart-outline' size={19} color='#FFF' />
                </TouchableOpacity>
                <TouchableOpacity className='w-9 h-9 rounded-full bg-white/25 items-center justify-center'>
                  <MaterialCommunityIcons name='share-variant-outline' size={19} color='#FFF' />
                </TouchableOpacity>
              </View>
            </View>

            <Text
              className='text-white mt-3'
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 44,
                lineHeight: 45,
                letterSpacing: -1.2,
              }}
            >
              Sabor{`\n`}irresistível
            </Text>
          </View>

          <Image
            source={{ uri: restaurant.heroImage }}
            style={{ position: 'absolute', left: 20, bottom: 18, width: 88, height: 66 }}
            resizeMode='cover'
          />
          <Image
            source={{ uri: restaurant.coverImage }}
            style={{ position: 'absolute', right: 20, bottom: 18, width: 88, height: 66 }}
            resizeMode='cover'
          />

          <View
            className='absolute rounded-full items-center justify-center border-4'
            style={{
              width: 76,
              height: 76,
              backgroundColor: '#CB4A22',
              borderColor: '#F5F1EB',
              left: width / 2 - 38,
              bottom: -38,
            }}
          >
            <Text
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 38,
                color: '#FCD68A',
                textTransform: 'lowercase',
              }}
            >
              {restaurant.name[0]}
            </Text>
          </View>
        </View>

        <View className='px-5 pt-12'>
          <Text
            className='text-center'
            style={{ fontFamily: 'Poppins_700Bold', fontSize: 32, color: Colors.textPrimary }}
          >
            {restaurant.name}
          </Text>

          <View className='flex-row justify-center items-center mt-4'>
            <View className='items-center px-4'>
              <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 26, color: Colors.textPrimary }}>
                {restaurant.followers}
              </Text>
              <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.textSecondary }}>
                Seguidores
              </Text>
            </View>

            <View className='h-10 w-[1px]' style={{ backgroundColor: Colors.border }} />

            <View className='items-center px-4'>
              <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 26, color: Colors.textPrimary }}>
                {restaurant.productsCount.toLocaleString('pt-BR')}
              </Text>
              <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.textSecondary }}>
                Produtos
              </Text>
            </View>

            <View className='h-10 w-[1px]' style={{ backgroundColor: Colors.border }} />

            <View className='items-center px-4'>
              <View className='flex-row items-center'>
                <MaterialCommunityIcons name='star' size={16} color={Colors.warning} />
                <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 26, color: Colors.textPrimary, marginLeft: 4 }}>
                  {restaurant.rating}
                </Text>
              </View>
              <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.textSecondary }}>
                Avaliação
              </Text>
            </View>
          </View>

          <View className='flex-row gap-3 mt-5'>
            <TouchableOpacity
              className='flex-1 h-12 rounded-full items-center justify-center'
              style={{ backgroundColor: '#000' }}
              activeOpacity={0.85}
            >
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#FFF' }}>Seguir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className='flex-1 h-12 rounded-full items-center justify-center border'
              style={{ borderColor: Colors.border, backgroundColor: '#FFF' }}
              activeOpacity={0.85}
            >
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: Colors.textPrimary }}>
                Conversar
              </Text>
            </TouchableOpacity>
          </View>

          <View
            className='mt-4 rounded-full px-4 py-3 flex-row items-center'
            style={{ backgroundColor: '#F0ECE7' }}
          >
            <View
              className='w-8 h-8 rounded-full items-center justify-center mr-3'
              style={{ backgroundColor: 'rgba(218, 78, 28, 0.2)' }}
            >
              <MaterialCommunityIcons name='bike-fast' size={16} color={Colors.primary} />
            </View>
            <View>
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: Colors.textPrimary }}>
                Entrega em: {restaurant.deliveryTime}
              </Text>
              <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.textSecondary }}>
                Taxa: {restaurant.deliveryFee} · Distância: {restaurant.distance}
              </Text>
            </View>
          </View>
        </View>

        <View className='mt-4'>
          <MenuTabs selected={selectedTab} onSelect={setSelectedTab} />
        </View>

        <View className='px-5 pt-4 flex-row flex-wrap justify-between'>
          {filteredMenu.map((item) => {
            const qty = items[item.id]?.quantity ?? 0;

            return (
              <View
                key={item.id}
                style={{ width: CARD_WIDTH }}
                className='rounded-2xl overflow-hidden mb-4 border bg-white'
              >
                <Image source={{ uri: item.image }} style={{ width: '100%', height: 106 }} resizeMode='cover' />

                <TouchableOpacity
                  onPress={() => addItem(restaurant, item)}
                  className='absolute top-2 right-2 w-7 h-7 rounded-full items-center justify-center'
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  activeOpacity={0.85}
                >
                  <MaterialCommunityIcons name='plus' size={15} color='#FFF' />
                </TouchableOpacity>

                {qty > 0 && (
                  <View className='absolute top-2 left-2 rounded-full px-2 py-[2px]' style={{ backgroundColor: Colors.primary }}>
                    <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 10, color: '#FFF' }}>{qty}</Text>
                  </View>
                )}

                <View className='px-3 py-3'>
                  <Text numberOfLines={1} style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: Colors.textPrimary }}>
                    {item.name}
                  </Text>

                  <View className='flex-row items-center justify-between mt-2'>
                    <View className='flex-row items-center'>
                      <MaterialCommunityIcons name='star' size={12} color={Colors.warning} />
                      <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 11, color: Colors.textSecondary, marginLeft: 3 }}>
                        {item.rating ?? restaurant.rating}
                      </Text>
                    </View>
                    <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18, color: Colors.textPrimary }}>
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
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
