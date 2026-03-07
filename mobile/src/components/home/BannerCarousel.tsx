import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { banners } from '../../data/mock';

export default function BannerCarousel() {
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
          style={{ backgroundColor: item.bgColor, width: 280, height: 140, padding: 20 }}
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
