import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { Colors } from '../constants/colors';

export default function OrdersScreen() {
  return (
    <View className='flex-1 bg-background items-center justify-center px-8'>
      <View className='w-24 h-24 rounded-full items-center justify-center bg-white border' style={{ borderColor: Colors.border }}>
        <MaterialCommunityIcons name='receipt-text-outline' size={42} color={Colors.primary} />
      </View>
      <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 22, color: Colors.textPrimary, marginTop: 18 }}>
        Nenhum pedido ainda
      </Text>
      <Text className='text-center mt-2' style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: Colors.textSecondary }}>
        Seus pedidos ativos e histórico aparecerão aqui.
      </Text>
    </View>
  );
}
