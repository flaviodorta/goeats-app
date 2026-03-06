import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  useFonts,
  Poppins_300Light,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { View, Text, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function Dot({ active }: { active: boolean }) {
  return (
    <View
      className={[
        'w-2 h-2 rounded-full mx-1',
        active ? 'bg-white' : 'bg-white/40',
      ].join(' ')}
    />
  );
}

export default function SplashScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View className='flex-1 bg-primary items-center justify-center'>
        <ActivityIndicator color='white' />
      </View>
    );
  }

  return (
    <View className='flex-1 bg-primary items-center justify-center'>
      <StatusBar style='light' />

      <View className='items-center'>
        <View className='w-28 h-28 rounded-full bg-white items-center justify-center mb-6'>
          <MaterialCommunityIcons name='moped' size={52} color='#E53935' />
        </View>

        <Text
          className='text-white text-4xl mb-4'
          style={{ fontFamily: 'Poppins_700Bold' }}
        >
          GoEats
        </Text>
      </View>

      <View className='absolute bottom-10 items-center px-8'>
        <Text
          className='text-white text-xs text-center tracking-widest mb-6'
          style={{ fontFamily: 'Poppins_300Light' }}
        >
          SUA COMIDA FAVORITA, ENTREGA RÁPIDA.
        </Text>

        <View className='w-32 h-1 rounded-full bg-white/40' />
      </View>
    </View>
  );
}
