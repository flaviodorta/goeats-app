import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { Address } from '../address/AddressSearchModal';
import { Colors } from '../../constants/colors';

type Props = {
  address: Address | null;
  onAddressPress: () => void;
};

export default function Header({ address, onAddressPress }: Props) {
  return (
    <View className="flex-row items-center justify-between px-5 py-3">
      <TouchableOpacity onPress={onAddressPress} className="flex-1 mr-4" activeOpacity={0.7}>
        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 11, color: Colors.textSecondary }}>
          ENTREGAR EM
        </Text>
        <View className="flex-row items-center">
          <Text
            numberOfLines={1}
            style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: Colors.textPrimary, flexShrink: 1 }}
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
