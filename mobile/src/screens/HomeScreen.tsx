import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AddressSearchModal, { Address } from '../components/address/AddressSearchModal';
import BottomTabBar from '../components/navigation/BottomTabBar';
import { Colors } from '../constants/colors';
import { banners, categories, restaurants } from '../data/mock';

function Header({
  address,
  onAddressPress,
}: {
  address: Address | null;
  onAddressPress: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between px-5 py-3">
      <TouchableOpacity onPress={onAddressPress} className="flex-1 mr-4" activeOpacity={0.7}>
        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 11, color: Colors.textSecondary }}>
          ENTREGAR EM
        </Text>
        <View className="flex-row items-center">
          <Text
            numberOfLines={1}
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 15,
              color: Colors.textPrimary,
              flexShrink: 1,
            }}
          >
            {address ? address.display : 'Selecionar endereço'}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={20} color={Colors.primary} />
        </View>
      </TouchableOpacity>

      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-surface items-center justify-center"
          style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4 }}
        >
          <MaterialCommunityIcons name="bell-outline" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-surface items-center justify-center"
          style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4 }}
        >
          <MaterialCommunityIcons name="cart-outline" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SearchBar() {
  return (
    <View className="mx-5 mb-4">
      <View
        className="flex-row items-center bg-surface rounded-2xl px-4 h-12"
        style={{ elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 }}
      >
        <MaterialCommunityIcons name="magnify" size={20} color={Colors.textSecondary} />
        <TextInput
          placeholder="Buscar comida ou restaurantes"
          placeholderTextColor={Colors.disabled}
          style={{
            flex: 1,
            marginLeft: 8,
            fontFamily: 'Poppins_400Regular',
            fontSize: 14,
            color: Colors.textPrimary,
          }}
        />
      </View>
    </View>
  );
}

function CategoryFilter({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
      renderItem={({ item }) => {
        const is_active = item.id === selected;
        return (
          <TouchableOpacity
            onPress={() => onSelect(item.id)}
            activeOpacity={0.75}
            className="flex-row items-center rounded-2xl px-4 h-10"
            style={{ backgroundColor: is_active ? Colors.primary : Colors.surface, elevation: is_active ? 0 : 2, shadowColor: '#000', shadowOpacity: is_active ? 0 : 0.07, shadowRadius: 4 }}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={16}
              color={is_active ? '#FFF' : Colors.textSecondary}
            />
            <Text
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 13,
                color: is_active ? '#FFF' : Colors.textSecondary,
                marginLeft: 6,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

function BannerCarousel() {
  return (
    <FlatList
      data={banners}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
      style={{ marginTop: 20 }}
      renderItem={({ item }) => (
        <View
          className="rounded-3xl overflow-hidden justify-between"
          style={{
            backgroundColor: item.bgColor,
            width: 280,
            height: 140,
            padding: 20,
          }}
        >
          <View style={{ position: 'absolute', right: 16, bottom: 0, opacity: 0.2 }}>
            <MaterialCommunityIcons name={item.iconName as any} size={100} color="#FFF" />
          </View>

          <View>
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 17, color: '#FFF', lineHeight: 22 }}>
              {item.title}
            </Text>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>
              {item.subtitle}
            </Text>
          </View>

          <TouchableOpacity
            className="self-start rounded-xl px-4 py-2 mt-2"
            style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
            activeOpacity={0.8}
          >
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 11, color: '#FFF', letterSpacing: 0.5 }}>
              {item.cta}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View className="flex-row items-center justify-between px-5 mt-6 mb-3">
      <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 17, color: Colors.textPrimary }}>
        {title}
      </Text>
      <TouchableOpacity>
        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.primary }}>
          Ver todos
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function RestaurantCard({ item }: { item: (typeof restaurants)[0] }) {
  return (
    <TouchableOpacity
      className="mx-5 mb-4 bg-surface rounded-3xl overflow-hidden"
      style={{ elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 }}
      activeOpacity={0.9}
    >
      <View
        className="w-full items-center justify-center"
        style={{ height: 160, backgroundColor: `${item.iconColor}15` }}
      >
        <MaterialCommunityIcons name={item.iconName as any} size={72} color={item.iconColor} style={{ opacity: 0.8 }} />
        {item.promoted && (
          <View
            className="absolute top-3 left-3 rounded-xl px-3 py-1"
            style={{ backgroundColor: Colors.accent }}
          >
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 11, color: '#FFF' }}>
              Destaque
            </Text>
          </View>
        )}
        <View
          className="absolute top-3 right-3 flex-row items-center rounded-xl px-2 py-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
        >
          <MaterialCommunityIcons name="star" size={12} color="#FFA726" />
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#FFF', marginLeft: 3 }}>
            {item.rating}
          </Text>
        </View>
      </View>

      <View className="px-4 py-3">
        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: Colors.textPrimary }}>
          {item.name}
        </Text>
        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.textSecondary, marginTop: 1 }}>
          {item.categories.join(' • ')}
        </Text>

        <View className="flex-row items-center mt-3 pt-3 border-t border-border">
          <MaterialCommunityIcons name="clock-outline" size={13} color={Colors.textSecondary} />
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.textSecondary, marginLeft: 4 }}>
            {item.deliveryTime}
          </Text>
          <View className="w-1 h-1 rounded-full bg-disabled mx-3" />
          <MaterialCommunityIcons name="moped-outline" size={13} color={item.deliveryFee === 'Grátis' ? Colors.success : Colors.textSecondary} />
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 12,
              color: item.deliveryFee === 'Grátis' ? Colors.success : Colors.textSecondary,
              marginLeft: 4,
            }}
          >
            {item.deliveryFee}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

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

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomTabBar activeTab="explore" />
      </View>

      <AddressSearchModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(addr) => setAddress(addr)}
      />
    </View>
  );
}
