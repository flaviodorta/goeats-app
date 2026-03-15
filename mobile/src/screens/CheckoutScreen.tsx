import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '../constants/colors';
import { Address, createAddress, fetchAddresses, setDefaultAddress } from '../services/addresses';
import { createOrder } from '../services/orders';
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

  // Endereços
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addrForm, setAddrForm] = useState({
    label: 'Casa', street: '', number: '', complement: '', neighborhood: '', city: '', state: 'SP', zip_code: '',
  });
  const [addrLoading, setAddrLoading] = useState(false);

  useEffect(() => {
    fetchAddresses()
      .then((list) => {
        setAddresses(list);
        setSelectedAddress(list.find((a) => a.is_default) ?? list[0] ?? null);
      })
      .catch(() => {});
  }, []);

  const handleSelectAddress = async (addr: Address) => {
    setSelectedAddress(addr);
    setShowAddressModal(false);
    if (!addr.is_default) {
      await setDefaultAddress(addr.id).catch(() => {});
    }
  };

  const handleAddAddress = async () => {
    if (!addrForm.street || !addrForm.number || !addrForm.neighborhood || !addrForm.city || !addrForm.zip_code) return;
    setAddrLoading(true);
    try {
      const created = await createAddress(addrForm);
      setAddresses((prev) => [...prev, created]);
      setSelectedAddress(created);
      setShowAddForm(false);
      setShowAddressModal(false);
      setAddrForm({ label: 'Casa', street: '', number: '', complement: '', neighborhood: '', city: '', state: 'SP', zip_code: '' });
    } finally {
      setAddrLoading(false);
    }
  };

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
    if (!selectedAddress) {
      setShowAddressModal(true);
      return;
    }
    setLoading(true);
    try {
      const order = await createOrder({
        restaurant_id: restaurant!.id,
        payment_method: payment,
        coupon_code: couponApplied ?? undefined,
        delivery_fee: feeAmount,
        address: {
          street: selectedAddress.street,
          number: selectedAddress.number,
          complement: selectedAddress.complement,
          neighborhood: selectedAddress.neighborhood,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zip_code: selectedAddress.zip_code,
        },
        items: Object.values(items).map((c) => ({
          menu_item_id: +c.item.id,
          quantity: c.quantity,
        })),
      });
      clearCart();
      navigation.replace('OrderConfirmation', { orderId: order.id });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!restaurant) {
      navigation.goBack();
    }
  }, []);

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
          <View className='flex-row items-center justify-between mb-3'>
            <View className='flex-row items-center'>
              <MaterialCommunityIcons name='map-marker-outline' size={18} color={Colors.primary} />
              <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: Colors.textPrimary, marginLeft: 6 }}>
                Endereço de entrega
              </Text>
            </View>
            <TouchableOpacity onPress={() => { setShowAddForm(false); setShowAddressModal(true); }} activeOpacity={0.7}>
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.primary }}>
                {selectedAddress ? 'Trocar' : 'Adicionar'}
              </Text>
            </TouchableOpacity>
          </View>

          {selectedAddress ? (
            <>
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.textPrimary }}>
                {selectedAddress.label}
              </Text>
              <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary, marginTop: 2 }}>
                {selectedAddress.street}, {selectedAddress.number}
                {selectedAddress.complement ? ` — ${selectedAddress.complement}` : ''}
              </Text>
              <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.disabled, marginTop: 1 }}>
                {selectedAddress.neighborhood}, {selectedAddress.city} — {selectedAddress.state} · {selectedAddress.zip_code}
              </Text>
            </>
          ) : (
            <TouchableOpacity onPress={() => { setShowAddForm(true); setShowAddressModal(true); }} activeOpacity={0.7}>
              <View className='flex-row items-center py-2'>
                <MaterialCommunityIcons name='plus-circle-outline' size={16} color={Colors.primary} />
                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.primary, marginLeft: 6 }}>
                  Nenhum endereço salvo. Adicionar agora
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Modal de endereços */}
        <Modal visible={showAddressModal} animationType='slide' transparent onRequestClose={() => setShowAddressModal(false)}>
          <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} activeOpacity={1} onPress={() => setShowAddressModal(false)} />
          <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insets.bottom + 24, marginTop: -20 }}>
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18, color: Colors.textPrimary, marginBottom: 16 }}>
              {showAddForm ? 'Novo endereço' : 'Seus endereços'}
            </Text>

            {showAddForm ? (
              <>
                {[
                  { key: 'label', placeholder: 'Apelido (ex: Casa, Trabalho)' },
                  { key: 'zip_code', placeholder: 'CEP' },
                  { key: 'street', placeholder: 'Rua / Avenida' },
                  { key: 'number', placeholder: 'Número' },
                  { key: 'complement', placeholder: 'Complemento (opcional)' },
                  { key: 'neighborhood', placeholder: 'Bairro' },
                  { key: 'city', placeholder: 'Cidade' },
                  { key: 'state', placeholder: 'Estado (ex: SP)' },
                ].map(({ key, placeholder }) => (
                  <TextInput
                    key={key}
                    value={(addrForm as any)[key]}
                    onChangeText={(v) => setAddrForm((f) => ({ ...f, [key]: v }))}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.disabled}
                    style={{
                      fontFamily: 'Poppins_400Regular', fontSize: 14, color: Colors.textPrimary,
                      borderWidth: 1, borderColor: Colors.border, borderRadius: 12, paddingHorizontal: 14,
                      height: 44, marginBottom: 10,
                    }}
                  />
                ))}
                <View className='flex-row gap-3 mt-2'>
                  <TouchableOpacity onPress={() => setShowAddForm(false)} className='flex-1 h-12 rounded-full items-center justify-center border' style={{ borderColor: Colors.border }} activeOpacity={0.8}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: Colors.textSecondary }}>Voltar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleAddAddress} disabled={addrLoading} className='flex-1 h-12 rounded-full items-center justify-center' style={{ backgroundColor: Colors.primary }} activeOpacity={0.85}>
                    {addrLoading ? <ActivityIndicator color='#FFF' /> : <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#FFF' }}>Salvar</Text>}
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                {addresses.map((addr) => (
                  <TouchableOpacity key={addr.id} onPress={() => handleSelectAddress(addr)} className='flex-row items-center py-3' style={{ borderBottomWidth: 1, borderBottomColor: Colors.border }} activeOpacity={0.7}>
                    <MaterialCommunityIcons name='map-marker-outline' size={20} color={addr.id === selectedAddress?.id ? Colors.primary : Colors.textSecondary} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: Colors.textPrimary }}>{addr.label}</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.textSecondary }}>
                        {addr.street}, {addr.number} — {addr.neighborhood}
                      </Text>
                    </View>
                    {addr.id === selectedAddress?.id && <MaterialCommunityIcons name='check-circle' size={18} color={Colors.primary} />}
                  </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={() => setShowAddForm(true)} className='flex-row items-center py-3 mt-2' activeOpacity={0.7}>
                  <MaterialCommunityIcons name='plus' size={20} color={Colors.primary} />
                  <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: Colors.primary, marginLeft: 10 }}>
                    Adicionar novo endereço
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Modal>

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
