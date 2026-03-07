import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';

type Props = {
  total: number;
  itemCount: number;
  onPress: () => void;
};

export default function CartBar({ total, itemCount, onPress }: Props) {
  return (
    <View className="px-5 pb-8 pt-3 bg-surface border-t border-border">
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-between rounded-2xl px-5 h-14"
        style={{ backgroundColor: Colors.primary }}
        activeOpacity={0.85}
      >
        <View
          className="w-7 h-7 rounded-xl items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
        >
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 13, color: '#FFF' }}>
            {itemCount}
          </Text>
        </View>

        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: '#FFF' }}>
          Ver carrinho
        </Text>

        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: '#FFF' }}>
          R$ {total.toFixed(2).replace('.', ',')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
