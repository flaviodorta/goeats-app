import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '../constants/colors';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <View className='flex-1' style={{ backgroundColor: Colors.primary }}>
      <View style={{ paddingTop: insets.top + 12 }} className='px-5'>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='w-10 h-10 rounded-full bg-white/20 items-center justify-center'
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name='arrow-left' size={20} color='#FFF' />
        </TouchableOpacity>
      </View>

      <View className='flex-1 justify-end px-5 pb-10'>
        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 42, color: '#FFF', lineHeight: 44 }}>
          Bem-vindo{`\n`}de volta
        </Text>
        <Text
          className='mt-3 text-white/85'
          style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 22 }}
        >
          O fluxo de login ainda não foi implementado nesta sprint.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='mt-8 h-14 rounded-full items-center justify-center'
          style={{ backgroundColor: '#FFF2E5' }}
          activeOpacity={0.9}
        >
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: Colors.primaryDark }}>
            Voltar para explorar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          className='mt-3 h-14 rounded-full items-center justify-center border'
          style={{ borderColor: 'rgba(255,255,255,0.55)' }}
          activeOpacity={0.85}
        >
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#FFF' }}>
            Ir para cadastro
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
