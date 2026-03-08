import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { Address } from '../address/AddressSearchModal';

type Props = {
  address: Address | null;
  onAddressPress: () => void;
};

export default function Header({ address, onAddressPress }: Props) {
  return (
    <View
      className='px-5 pb-9'
      style={{
        backgroundColor: Colors.hero,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        overflow: 'hidden',
      }}
    >
      <View
        className='absolute rounded-full'
        style={{
          width: 320,
          height: 320,
          right: -130,
          top: -90,
          backgroundColor: 'rgba(255,255,255,0.05)',
        }}
      />

      <View className='flex-row items-center justify-between pt-3'>
        <TouchableOpacity className='w-10 h-10 rounded-full items-center justify-center bg-white/15'>
          <MaterialCommunityIcons name='menu' size={21} color='#FFF' />
        </TouchableOpacity>

        <TouchableOpacity onPress={onAddressPress} className='items-center flex-1 px-4' activeOpacity={0.8}>
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
            Entrega em
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: '#FFF', marginTop: 2 }}
          >
            {address ? address.display : 'Selecione seu endereço'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className='w-10 h-10 rounded-full items-center justify-center bg-white/15'>
          <MaterialCommunityIcons name='bell-outline' size={20} color='#FFF' />
        </TouchableOpacity>
      </View>

      <View className='mt-6 pr-28'>
        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 40, color: Colors.primary, lineHeight: 40 }}>
          27%
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins_700Bold',
            fontSize: 26,
            lineHeight: 28,
            color: '#FFF',
            marginTop: 2,
          }}
        >
          DESCONTO{`\n`}EXTRA
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 13,
            lineHeight: 20,
            color: 'rgba(255,255,255,0.82)',
            marginTop: 8,
          }}
        >
          Aproveite seu primeiro pedido com desconto especial!
        </Text>
      </View>

      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80',
        }}
        style={{
          position: 'absolute',
          right: -18,
          bottom: -6,
          width: 210,
          height: 170,
        }}
        resizeMode='contain'
      />
    </View>
  );
}
