import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { restaurants } from '../../data/mock';
import { PublicStackNavigation } from '../../navigation/types';

type Props = {
  item: (typeof restaurants)[0];
};

export default function RestaurantCard({ item }: Props) {
  const navigation = useNavigation<PublicStackNavigation>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('RestaurantMenu', { restaurant: item })}
      className='mx-5 mb-4 rounded-[26px] overflow-hidden border'
      style={{
        borderColor: '#ECDCCD',
        backgroundColor: '#FFF',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 10,
      }}
      activeOpacity={0.9}
    >
      <View>
        <Image source={{ uri: item.coverImage }} style={{ width: '100%', height: 166 }} resizeMode='cover' />

        {item.promoted && (
          <View
            className='absolute top-3 left-3 rounded-full px-3 py-1'
            style={{ backgroundColor: 'rgba(218, 78, 28, 0.9)' }}
          >
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 11, color: '#FFF' }}>50% Off</Text>
          </View>
        )}

        <View
          className='absolute top-3 right-3 w-9 h-9 rounded-full items-center justify-center'
          style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}
        >
          <MaterialCommunityIcons name='heart-outline' size={18} color={Colors.textPrimary} />
        </View>
      </View>

      <View className='px-4 py-3'>
        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 17, color: Colors.textPrimary }}>
          {item.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.textSecondary, marginTop: 2 }}
        >
          {item.categories.join(', ')}
        </Text>

        <View className='flex-row items-center mt-3'>
          <MaterialCommunityIcons name='star' size={14} color={Colors.warning} />
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.textPrimary, marginLeft: 4 }}>
            {item.rating}
          </Text>

          <View className='w-1 h-1 rounded-full mx-3' style={{ backgroundColor: Colors.disabled }} />

          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.textSecondary }}>
            {item.deliveryTime}
          </Text>

          <View className='w-1 h-1 rounded-full mx-3' style={{ backgroundColor: Colors.disabled }} />

          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 12,
              color: item.deliveryFee === 'Grátis' ? Colors.success : Colors.textSecondary,
            }}
          >
            {item.deliveryFee}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
