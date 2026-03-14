import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '../constants/colors';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';

const PAYMENT_METHODS = [
  { id: 'credit', label: 'Cartão de crédito', icon: 'credit-card-outline' },
  { id: 'debit', label: 'Cartão de débito', icon: 'credit-card-chip-outline' },
  { id: 'pix', label: 'Pix', icon: 'qrcode' },
  { id: 'cash', label: 'Dinheiro', icon: 'cash' },
] as const;

type PaymentId = (typeof PAYMENT_METHODS)[number]['id'];

const VALID_COUPONS: Record<string, number> = {
  PROMO10: 0.1,
  IFOOD20: 0.2,
  GOEATS5: 0.05,
};

const parseFeeAmount = (fee: string): number => {
  if (fee === 'Grátis') return 0;
  const match = fee.match(/[\d,]+/);
  return match ? parseFloat(match[0].replace(',', '.')) : 0;
};

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { restaurant, items, totalPrice, clearCart } = useCartStore();
  const user = useAuthStore((s) => s.user);

  const [payment, setPayment] = useState<PaymentId>('credit');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = totalPrice();
  const feeAmount = parseFeeAmount(restaurant?.deliveryFee ?? 'Grátis');
  const discount = couponApplied ? subtotal * (VALID_COUPONS[couponApplied] ?? 0) : 0;
  const total = subtotal + feeAmount - discount;

  const formatCurrency = (v: number) => `R$ ${v.toFixed(2).replace('.', ',')}`;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setCouponApplied(code);
      setCouponError('');
    } else {
      setCouponApplied(null);
      setCouponError('Cupom inválido');
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    // Simula criação do pedido (POST /orders será implementado na Etapa 2 API)
    await new Promise((r) => setTimeout(r, 1200));
    const fakeOrderId = Math.random().toString(36).slice(2, 10).toUpperCase();
    clearCart();
    navigation.replace('OrderConfirmation', { orderId: fakeOrderId });
  };

  if (!restaurant) {
    navigation.goBack();
    return null;
  }

  return (
    <View className='flex-1 bg-background'>
      {/* Header */}
      <View
        className='px-5 pb-4 bg-white border-b'
        style={{ paddingTop: insets.top + 10, borderBottomColor: Colors.border }}
      >
        <View className='flex-row items-center'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='w-10 h-10 rounded-full items-center justify-center border mr-3'
            style={{ borderColor: Colors.border }}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name='arrow-left' size={21} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 20, color: Colors.textPrimary }}>
            Finalizar pedido
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Endereço */}
        <View className='mx-5 mt-4 rounded-2xl border bg-white p-4' style={{ borderColor: Colors.border }}>
          <View className='flex-row items-center mb-3'>
            <MaterialCommunityIcons name='map-marker-outline' size={18} color={Colors.primary} />
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: Colors.textPrimary, marginLeft: 6 }}>
              Endereço de entrega
            </Text>
          </View>
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary }}>
            Entregando para: {user?.name}
          </Text>
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.disabled, marginTop: 2 }}>
            Seleção de endereço disponível em breve
          </Text>
        </View>

        {/* Itens */}
        <View className='mx-5 mt-3 rounded-2xl border bg-white p-4' style={{ borderColor: Colors.border }}>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: Colors.textPrimary, marginBottom: 10 }}>
            {restaurant.name}
          </Text>
          {Object.values(items).map(({ item, quantity }) => (
            <View key={item.id} className='flex-row justify-between mb-2'>
              <Text
                numberOfLines={1}
                style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary, flex: 1 }}
              >
                {quantity}× {item.name}
              </Text>
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.textPrimary, marginLeft: 8 }}>
                {formatCurrency(item.price * quantity)}
              </Text>
            </View>
          ))}
        </View>

        {/* Cupom */}
        <View className='mx-5 mt-3 rounded-2xl border bg-white p-4' style={{ borderColor: Colors.border }}>
          <View className='flex-row items-center mb-3'>
            <MaterialCommunityIcons name='tag-outline' size={18} color={Colors.primary} />
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: Colors.textPrimary, marginLeft: 6 }}>
              Cupom de desconto
            </Text>
          </View>

          {couponApplied ? (
            <View className='flex-row items-center justify-between rounded-xl px-4 py-3' style={{ backgroundColor: '#F0FFF4' }}>
              <View className='flex-row items-center'>
                <MaterialCommunityIcons name='check-circle' size={16} color={Colors.success} />
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: Colors.success, marginLeft: 6 }}>
                  {couponApplied} — {(VALID_COUPONS[couponApplied] * 100).toFixed(0)}% off
                </Text>
              </View>
              <TouchableOpacity onPress={() => { setCouponApplied(null); setCoupon(''); }}>
                <MaterialCommunityIcons name='close' size={16} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View className='flex-row gap-2'>
                <View
                  className='flex-1 flex-row items-center rounded-xl px-3'
                  style={{ backgroundColor: Colors.background, height: 44, borderWidth: 1, borderColor: Colors.border }}
                >
                  <TextInput
                    value={coupon}
                    onChangeText={(v) => { setCoupon(v); setCouponError(''); }}
                    placeholder='Ex: PROMO10'
                    placeholderTextColor={Colors.disabled}
                    autoCapitalize='characters'
                    style={{ flex: 1, fontFamily: 'Poppins_400Regular', fontSize: 14, color: Colors.textPrimary }}
                  />
                </View>
                <TouchableOpacity
                  onPress={applyCoupon}
                  className='rounded-xl px-4 items-center justify-center'
                  style={{ backgroundColor: Colors.primary, height: 44 }}
                  activeOpacity={0.85}
                >
                  <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: '#FFF' }}>Aplicar</Text>
                </TouchableOpacity>
              </View>
              {couponError ? (
                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.error, marginTop: 6 }}>
                  {couponError}
                </Text>
              ) : null}
            </>
          )}
        </View>

        {/* Forma de pagamento */}
        <View className='mx-5 mt-3 rounded-2xl border bg-white p-4' style={{ borderColor: Colors.border }}>
          <View className='flex-row items-center mb-3'>
            <MaterialCommunityIcons name='wallet-outline' size={18} color={Colors.primary} />
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: Colors.textPrimary, marginLeft: 6 }}>
              Forma de pagamento
            </Text>
          </View>
          {PAYMENT_METHODS.map((m) => (
            <TouchableOpacity
              key={m.id}
              onPress={() => setPayment(m.id)}
              className='flex-row items-center py-3'
              style={{ borderBottomWidth: m.id !== 'cash' ? 1 : 0, borderBottomColor: Colors.border }}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name={m.icon as any} size={20} color={payment === m.id ? Colors.primary : Colors.textSecondary} />
              <Text
                style={{
                  flex: 1,
                  marginLeft: 10,
                  fontFamily: payment === m.id ? 'Poppins_600SemiBold' : 'Poppins_400Regular',
                  fontSize: 14,
                  color: payment === m.id ? Colors.textPrimary : Colors.textSecondary,
                }}
              >
                {m.label}
              </Text>
              {payment === m.id && (
                <MaterialCommunityIcons name='check-circle' size={18} color={Colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Resumo */}
        <View className='mx-5 mt-3 rounded-2xl border bg-white p-4' style={{ borderColor: Colors.border }}>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: Colors.textPrimary, marginBottom: 10 }}>
            Resumo
          </Text>
          <View className='flex-row justify-between mb-2'>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary }}>Subtotal</Text>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.textPrimary }}>{formatCurrency(subtotal)}</Text>
          </View>
          <View className='flex-row justify-between mb-2'>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary }}>Taxa de entrega</Text>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: feeAmount === 0 ? Colors.success : Colors.textPrimary }}>
              {feeAmount === 0 ? 'Grátis' : formatCurrency(feeAmount)}
            </Text>
          </View>
          {discount > 0 && (
            <View className='flex-row justify-between mb-2'>
              <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.success }}>Desconto</Text>
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.success }}>-{formatCurrency(discount)}</Text>
            </View>
          )}
          <View className='h-[1px] my-2' style={{ backgroundColor: Colors.border }} />
          <View className='flex-row justify-between'>
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, color: Colors.textPrimary }}>Total</Text>
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18, color: Colors.primary }}>{formatCurrency(total)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Botão confirmar */}
      <View className='absolute left-0 right-0 bottom-0 px-5 pt-3 bg-background' style={{ paddingBottom: insets.bottom + 12 }}>
        <TouchableOpacity
          onPress={handleConfirm}
          disabled={loading}
          className='h-14 rounded-full items-center justify-center'
          style={{ backgroundColor: loading ? Colors.disabled : Colors.primaryDark }}
          activeOpacity={0.9}
        >
          {loading ? (
            <ActivityIndicator color='#FFF' />
          ) : (
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#FFF' }}>
              Confirmar pedido · {formatCurrency(total)}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
