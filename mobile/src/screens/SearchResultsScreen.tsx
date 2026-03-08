import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import RestaurantCard from '../components/home/RestaurantCard';
import SearchBar from '../components/home/SearchBar';
import { Colors } from '../constants/colors';
import { restaurants } from '../data/mock';

export default function SearchResultsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState('');

  const trimmed = query.trim().toLowerCase();
  const results =
    trimmed.length < 2
      ? []
      : restaurants.filter((r) => {
          return (
            r.name.toLowerCase().includes(trimmed) ||
            r.categories.some((c) => c.toLowerCase().includes(trimmed)) ||
            r.menu.some((m) => m.name.toLowerCase().includes(trimmed))
          );
        });

  return (
    <View className='flex-1 bg-background'>
      <View className='px-5 pb-4 bg-white border-b' style={{ paddingTop: insets.top + 10, borderBottomColor: Colors.border }}>
        <View className='flex-row items-center'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='w-10 h-10 rounded-full border items-center justify-center mr-3'
            style={{ borderColor: Colors.border }}
            activeOpacity={0.82}
          >
            <MaterialCommunityIcons name='arrow-left' size={20} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View className='flex-1'>
            <SearchBar value={query} onChangeText={setQuery} autoFocus />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 14, paddingBottom: 24 }}>
        {trimmed.length < 2 ? (
          <View className='items-center mt-20'>
            <MaterialCommunityIcons name='magnify' size={60} color={Colors.disabled} />
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: Colors.textSecondary, marginTop: 12 }}>
              Digite pelo menos 2 caracteres
            </Text>
          </View>
        ) : results.length === 0 ? (
          <View className='items-center mt-20 px-8'>
            <MaterialCommunityIcons name='food-off-outline' size={58} color={Colors.disabled} />
            <Text className='text-center' style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: Colors.textSecondary, marginTop: 12 }}>
              Nenhum resultado para "{query}"
            </Text>
          </View>
        ) : (
          <>
            <Text className='px-5 pb-3' style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.textSecondary }}>
              {results.length} resultado{results.length !== 1 ? 's' : ''} para "{query}"
            </Text>
            {results.map((item) => (
              <RestaurantCard key={item.id} item={item} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
