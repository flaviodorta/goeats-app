import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Poppins_300Light,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';

import { Colors } from '../constants/colors';

export default function SplashScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View className='flex-1 items-center justify-center' style={{ backgroundColor: Colors.primaryDark }}>
        <ActivityIndicator color='white' />
      </View>
    );
  }

  return (
    <View className='flex-1 items-center justify-center' style={{ backgroundColor: Colors.primaryDark }}>
      <StatusBar style='light' />

      <View className='w-32 h-32 rounded-full items-center justify-center mb-7' style={{ backgroundColor: '#FFF3E7' }}>
        <MaterialCommunityIcons name='hamburger' size={58} color={Colors.primary} />
      </View>

      <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 44, color: '#FFF' }}>GoEats</Text>
      <Text
        className='mt-3 text-center text-white/70'
        style={{ fontFamily: 'Poppins_300Light', fontSize: 13, letterSpacing: 1.3 }}
      >
        SABOR RÁPIDO, ENTREGA INTELIGENTE
      </Text>

      <View className='absolute bottom-20 w-24 h-1 rounded-full bg-white/45' />
    </View>
  );
}
