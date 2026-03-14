import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '../constants/colors';
import { PrivateStackParamList } from '../navigation/types';

export default function OrderConfirmationScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<PrivateStackParamList, 'OrderConfirmation'>>();
  const { orderId } = route.params;

  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 6 }),
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View className='flex-1 bg-background items-center justify-center px-8' style={{ paddingBottom: insets.bottom }}>
      {/* Ícone animado */}
      <Animated.View style={{ transform: [{ scale }] }}>
        <View
          className='w-28 h-28 rounded-full items-center justify-center'
          style={{ backgroundColor: Colors.success + '20' }}
        >
          <View
            className='w-20 h-20 rounded-full items-center justify-center'
            style={{ backgroundColor: Colors.success + '35' }}
          >
            <MaterialCommunityIcons name='check-circle' size={52} color={Colors.success} />
          </View>
        </View>
      </Animated.View>

      <Animated.View style={{ opacity }} className='items-center'>
        <Text
          className='text-center mt-6'
          style={{ fontFamily: 'Poppins_700Bold', fontSize: 30, color: Colors.textPrimary, lineHeight: 34 }}
        >
          Pedido{'\n'}confirmado!
        </Text>

        <Text
          className='text-center mt-3'
          style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: Colors.textSecondary, lineHeight: 22 }}
        >
          Seu pedido foi recebido e{'\n'}está sendo preparado.
        </Text>

        <View
          className='mt-6 rounded-2xl px-8 py-4 items-center'
          style={{ backgroundColor: '#FFF', borderWidth: 1, borderColor: Colors.border }}
        >
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.textSecondary }}>
            Número do pedido
          </Text>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 22, color: Colors.primary, letterSpacing: 2, marginTop: 2 }}>
            #{orderId}
          </Text>
        </View>

        <View className='flex-row items-center mt-5 gap-2'>
          <MaterialCommunityIcons name='clock-outline' size={16} color={Colors.textSecondary} />
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary }}>
            Tempo estimado: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: Colors.textPrimary }}>30-45 min</Text>
          </Text>
        </View>
      </Animated.View>

      <Animated.View style={{ opacity, width: '100%', position: 'absolute', bottom: insets.bottom + 24, left: 32, right: 32 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PrivateTabs', { screen: 'Explore' })}
          className='h-14 rounded-full items-center justify-center'
          style={{ backgroundColor: Colors.primaryDark }}
          activeOpacity={0.9}
        >
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#FFF' }}>
            Voltar ao início
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
