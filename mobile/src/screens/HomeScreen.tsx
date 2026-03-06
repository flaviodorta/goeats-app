import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View className='flex-1 bg-background items-center justify-center'>
      <StatusBar style='dark' />
      <Text
        className='text-text-primary text-2xl'
        style={{ fontFamily: 'Poppins_700Bold' }}
      >
        Home
      </Text>
    </View>
  );
}
