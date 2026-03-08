import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
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
      onPress={() =>
        navigation.navigate('RestaurantMenu', { restaurant: item })
      }
      className='mx-5 mb-4 bg-surface rounded-3xl overflow-hidden'
      style={{
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
      }}
      activeOpacity={0.9}
    >
      <View
        className='w-full items-center justify-center'
        style={{ height: 160, backgroundColor: `${item.iconColor}15` }}
      >
        <MaterialCommunityIcons
          name={item.iconName as any}
          size={72}
          color={item.iconColor}
          style={{ opacity: 0.8 }}
        />
        {item.promoted && (
          <View
            className='absolute top-3 left-3 rounded-xl px-3 py-1'
            style={{ backgroundColor: Colors.accent }}
          >
            <Text
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 11,
                color: '#FFF',
              }}
            >
              Destaque
            </Text>
          </View>
        )}
        <View
          className='absolute top-3 right-3 flex-row items-center rounded-xl px-2 py-1'
          style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
        >
          <MaterialCommunityIcons name='star' size={12} color='#FFA726' />
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 12,
              color: '#FFF',
              marginLeft: 3,
            }}
          >
            {item.rating}
          </Text>
        </View>
      </View>

      <View className='px-4 py-3'>
        <Text
          style={{
            fontFamily: 'Poppins_700Bold',
            fontSize: 15,
            color: Colors.textPrimary,
          }}
        >
          {item.name}
        </Text>

        <Text
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 12,
            color: Colors.textSecondary,
            marginTop: 1,
          }}
        >
          {item.categories.join(' • ')}
        </Text>

        <View className='flex-row items-center mt-3 pt-3 border-t border-border'>
          <MaterialCommunityIcons
            name='clock-outline'
            size={13}
            color={Colors.textSecondary}
          />

          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 12,
              color: Colors.textSecondary,
              marginLeft: 4,
            }}
          >
            {item.deliveryTime}
          </Text>

          <View className='w-1 h-1 rounded-full bg-disabled mx-3' />

          <MaterialCommunityIcons
            name='moped-outline'
            size={13}
            color={
              item.deliveryFee === 'Grátis'
                ? Colors.success
                : Colors.textSecondary
            }
          />

          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 12,
              color:
                item.deliveryFee === 'Grátis'
                  ? Colors.success
                  : Colors.textSecondary,
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
