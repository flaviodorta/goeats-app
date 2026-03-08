import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AddressSearchModal, { Address } from '../components/address/AddressSearchModal';
import CategoryFilter from '../components/home/CategoryFilter';
import Header from '../components/home/Header';
import RestaurantCard from '../components/home/RestaurantCard';
import SearchBar from '../components/home/SearchBar';
import SectionHeader from '../components/home/SectionHeader';
import { Colors } from '../constants/colors';
import { useRestaurants } from '../hooks/useRestaurants';
import { PublicStackNavigation } from '../navigation/types';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<PublicStackNavigation>();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [address, setAddress] = useState<Address | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { restaurants, loading: loadingRestaurants, error, retry } = useRestaurants();

  if (!fontsLoaded) {
    return (
      <View className='flex-1 bg-background items-center justify-center'>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  const filtered =
    selectedCategory === 'all'
      ? restaurants
      : restaurants.filter((r) => {
          const haystack = [r.name, ...r.categories].join(' ').toLowerCase();
          return haystack.includes(selectedCategory.toLowerCase());
        });

  return (
    <View className='flex-1 bg-background'>
      <StatusBar style='light' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 105 }}
      >
        <View style={{ paddingTop: insets.top }}>
          <Header address={address} onAddressPress={() => setModalVisible(true)} />
        </View>

        <View className='px-5' style={{ marginTop: -24 }}>
          <SearchBar onPress={() => navigation.navigate('SearchResults')} />
        </View>

        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

        <SectionHeader title='Restaurantes populares' />

        {loadingRestaurants ? (
          <ActivityIndicator color={Colors.primary} style={{ marginTop: 40 }} />
        ) : error ? (
          <View className='items-center mt-10 px-8'>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: Colors.textSecondary, textAlign: 'center', marginBottom: 16 }}>
              {error}
            </Text>
            <TouchableOpacity onPress={retry} style={{ backgroundColor: Colors.primary, borderRadius: 100, paddingHorizontal: 24, paddingVertical: 10 }}>
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#FFF' }}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filtered.map((item) => (
            <RestaurantCard key={item.id} item={item} />
          ))
        )}
      </ScrollView>

      <AddressSearchModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(addr) => setAddress(addr)}
      />
    </View>
  );
}
