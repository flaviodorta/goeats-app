import { Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../constants/colors';

type Props = {
  total: number;
  itemCount: number;
  onPress: () => void;
};

export default function CartBar({ total, itemCount, onPress }: Props) {
  return (
    <View className='px-5 pb-7 pt-3' style={{ backgroundColor: 'rgba(245,241,235,0.97)' }}>
      <TouchableOpacity
        onPress={onPress}
        className='h-14 rounded-full px-5 flex-row items-center justify-between'
        style={{ backgroundColor: '#111' }}
        activeOpacity={0.9}
      >
        <View className='w-8 h-8 rounded-full items-center justify-center' style={{ backgroundColor: 'rgba(255,255,255,0.22)' }}>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 13, color: '#FFF' }}>{itemCount}</Text>
        </View>

        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: '#FFF' }}>Ver carrinho</Text>

        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: '#FFF' }}>
          R$ {total.toFixed(2).replace('.', ',')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
