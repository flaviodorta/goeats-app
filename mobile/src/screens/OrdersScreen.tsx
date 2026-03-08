import { Text, View } from 'react-native';
import { Colors } from '../constants/colors';

export default function OrdersScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: Colors.textSecondary }}>
        Pedidos — em breve
      </Text>
    </View>
  );
}
