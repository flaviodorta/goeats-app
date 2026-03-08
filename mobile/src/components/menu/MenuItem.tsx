import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { MenuItem as MenuItemType } from '../../data/mock';

type Props = {
  item: MenuItemType;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
};

export default function MenuItem({ item, quantity, onAdd, onRemove }: Props) {
  return (
    <View className='mx-5 mb-3 rounded-2xl border bg-white p-3 flex-row' style={{ borderColor: Colors.border }}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 74, height: 74, borderRadius: 14 }}
        resizeMode='cover'
      />

      <View className='flex-1 ml-3 justify-between'>
        <View>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: Colors.textPrimary }}>
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 12,
              color: Colors.textSecondary,
              marginTop: 2,
            }}
          >
            {item.description}
          </Text>
        </View>

        <View className='flex-row items-center justify-between mt-2'>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: Colors.textPrimary }}>
            ${item.price.toFixed(2)}
          </Text>

          {quantity === 0 ? (
            <TouchableOpacity
              onPress={onAdd}
              className='w-8 h-8 rounded-full items-center justify-center'
              style={{ backgroundColor: Colors.primary }}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons name='plus' size={17} color='#FFF' />
            </TouchableOpacity>
          ) : (
            <View className='flex-row items-center'>
              <TouchableOpacity
                onPress={onRemove}
                className='w-8 h-8 rounded-full items-center justify-center border'
                style={{ borderColor: Colors.primary }}
                activeOpacity={0.85}
              >
                <MaterialCommunityIcons name='minus' size={15} color={Colors.primary} />
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: 'Poppins_700Bold',
                  fontSize: 14,
                  color: Colors.textPrimary,
                  minWidth: 24,
                  textAlign: 'center',
                }}
              >
                {quantity}
              </Text>

              <TouchableOpacity
                onPress={onAdd}
                className='w-8 h-8 rounded-full items-center justify-center'
                style={{ backgroundColor: Colors.primary }}
                activeOpacity={0.85}
              >
                <MaterialCommunityIcons name='plus' size={15} color='#FFF' />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
