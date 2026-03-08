import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '../constants/colors';

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <View className='flex-1 bg-background'>
      <View style={{ paddingTop: insets.top + 12 }} className='px-5'>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='w-10 h-10 rounded-full border items-center justify-center'
          style={{ borderColor: Colors.border }}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name='arrow-left' size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View className='flex-1 items-center justify-center px-8'>
        <View className='w-24 h-24 rounded-full items-center justify-center bg-white border' style={{ borderColor: Colors.border }}>
          <MaterialCommunityIcons name='account-plus-outline' size={42} color={Colors.primary} />
        </View>

        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 28, color: Colors.textPrimary, marginTop: 18 }}>
          Cadastro em Breve
        </Text>
        <Text className='text-center mt-2' style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: Colors.textSecondary }}>
          Tela de criação de conta será conectada com API na próxima etapa.
        </Text>
      </View>
    </View>
  );
}
