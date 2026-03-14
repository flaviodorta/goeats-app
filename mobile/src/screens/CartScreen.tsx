import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MenuItemComponent from '../components/menu/MenuItem';
import { Colors } from '../constants/colors';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';

const parseFeeAmount = (fee: string): number => {
  if (fee === 'Grátis') return 0;
  const match = fee.match(/[\d,]+/);
  return match ? parseFloat(match[0].replace(',', '.')) : 0;
};

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { restaurant, items, addItem, removeItem, totalPrice, setPendingCheckout } = useCartStore();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const cartItems = Object.values(items);
  const subtotal = totalPrice();
  const feeText = restaurant?.deliveryFee ?? 'Grátis';
  const feeAmount = parseFeeAmount(feeText);
  const total = subtotal + feeAmount;

  const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;

  if (!restaurant || cartItems.length === 0) {
    return (
      <View className='flex-1 bg-background items-center justify-center px-8'>
        <View className='w-24 h-24 rounded-full items-center justify-center bg-white border' style={{ borderColor: Colors.border }}>
          <MaterialCommunityIcons name='cart-outline' size={44} color={Colors.textSecondary} />
        </View>
        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 22, color: Colors.textPrimary, marginTop: 18 }}>
          Seu carrinho está vazio
        </Text>
        <Text
          className='text-center mt-2'
          style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: Colors.textSecondary }}
        >
          Adicione itens para finalizar seu pedido.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='mt-8 h-12 rounded-full px-6 items-center justify-center'
          style={{ backgroundColor: Colors.primary }}
          activeOpacity={0.88}
        >
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: '#FFF' }}>
            Voltar para o menu
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-background'>
      <View className='px-5 pb-4 bg-white border-b' style={{ paddingTop: insets.top + 10, borderBottomColor: Colors.border }}>
        <View className='flex-row items-center'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='w-10 h-10 rounded-full items-center justify-center border mr-3'
            style={{ borderColor: Colors.border }}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name='arrow-left' size={21} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View>
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 22, color: Colors.textPrimary }}>
              Seu carrinho
            </Text>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary }}>
              {restaurant.name}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 14, paddingBottom: 140 }}>
        {cartItems.map(({ item, quantity }) => (
          <MenuItemComponent
            key={item.id}
            item={item}
            quantity={quantity}
            onAdd={() => addItem(restaurant, item)}
            onRemove={() => removeItem(item.id)}
          />
        ))}

        <View className='mx-5 mt-2 rounded-2xl border bg-white p-4' style={{ borderColor: Colors.border }}>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, color: Colors.textPrimary, marginBottom: 12 }}>
            Resumo do pedido
          </Text>

          <View className='flex-row justify-between mb-2'>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary }}>
              Subtotal
            </Text>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.textPrimary }}>
              {formatCurrency(subtotal)}
            </Text>
          </View>

          <View className='flex-row justify-between mb-3'>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary }}>
              Taxa de entrega
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 13,
                color: feeAmount === 0 ? Colors.success : Colors.textPrimary,
              }}
            >
              {feeAmount === 0 ? 'Grátis' : formatCurrency(feeAmount)}
            </Text>
          </View>

          <View className='h-[1px] mb-3' style={{ backgroundColor: Colors.border }} />

          <View className='flex-row justify-between'>
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, color: Colors.textPrimary }}>Total</Text>
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18, color: Colors.primary }}>
              {formatCurrency(total)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className='absolute left-0 right-0 bottom-0 px-5 pt-3 bg-background' style={{ paddingBottom: insets.bottom + 12 }}>
        <TouchableOpacity
          onPress={() => {
            if (isAuthenticated) {
              navigation.navigate('Checkout');
            } else {
              setPendingCheckout(true);
              navigation.navigate('Login');
            }
          }}
          className='h-14 rounded-full items-center justify-center'
          style={{ backgroundColor: '#101010' }}
          activeOpacity={0.9}
        >
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#FFF' }}>
            Finalizar pedido · {formatCurrency(total)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
