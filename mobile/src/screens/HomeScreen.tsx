import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AddressSearchModal, { Address } from '../components/address/AddressSearchModal';
import BannerCarousel from '../components/home/BannerCarousel';
import CategoryFilter from '../components/home/CategoryFilter';
import Header from '../components/home/Header';
import RestaurantCard from '../components/home/RestaurantCard';
import SearchBar from '../components/home/SearchBar';
import SectionHeader from '../components/home/SectionHeader';
import { Colors } from '../constants/colors';
import { restaurants } from '../data/mock';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [address, setAddress] = useState<Address | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  const filtered =
    selectedCategory === 'all'
      ? restaurants
      : restaurants.filter((r) =>
          r.categories.some((c) => c.toLowerCase().includes(selectedCategory))
        );

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top }}>
        <Header address={address} onAddressPress={() => setModalVisible(true)} />
        <SearchBar />
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
        <BannerCarousel />
        <SectionHeader title="Perto de você" />
        {filtered.map((item) => (
          <RestaurantCard key={item.id} item={item} />
        ))}
      </ScrollView>

      <AddressSearchModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(addr) => setAddress(addr)}
      />
    </View>
  );
}
