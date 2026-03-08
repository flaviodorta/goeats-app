import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MenuItemComponent from '../components/menu/MenuItem';
import { Colors } from '../constants/colors';
import { useCartStore } from '../stores/cartStore';

function parseFeeAmount(fee: string): number {
  if (fee === 'Grátis') return 0;
  const match = fee.match(/[\d,]+/);
  return match ? parseFloat(match[0].replace(',', '.')) : 0;
}

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { restaurant, items, addItem, removeItem, totalPrice } = useCartStore();

  const cartItems = Object.values(items);
  const subtotal = totalPrice();
  const feeText = restaurant?.deliveryFee ?? 'Grátis';
  const feeAmount = parseFeeAmount(feeText);
  const total = subtotal + feeAmount;

  if (!restaurant || cartItems.length === 0) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <MaterialCommunityIcons name="cart-outline" size={64} color={Colors.disabled} />
        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: Colors.textSecondary, marginTop: 12 }}>
          Seu carrinho está vazio
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: Colors.primary }}>
            Voltar ao cardápio
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View
        className="bg-surface px-5 pb-4 flex-row items-center"
        style={{ paddingTop: insets.top + 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8 }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-9 h-9 rounded-full bg-background items-center justify-center mr-3"
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="arrow-left" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18, color: Colors.textPrimary }}>
            Carrinho
          </Text>
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary }}>
            {restaurant.name}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Items */}
        {cartItems.map(({ item, quantity }) => (
          <MenuItemComponent
            key={item.id}
            item={item}
            quantity={quantity}
            onAdd={() => addItem(restaurant, item)}
            onRemove={() => removeItem(item.id)}
          />
        ))}

        {/* Resumo */}
        <View
          className="mx-5 mt-4 rounded-2xl bg-surface p-4"
          style={{ elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6 }}
        >
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 14, color: Colors.textPrimary, marginBottom: 12 }}>
            Resumo do pedido
          </Text>

          <View className="flex-row justify-between mb-2">
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary }}>
              Subtotal
            </Text>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.textPrimary }}>
              R$ {subtotal.toFixed(2).replace('.', ',')}
            </Text>
          </View>

          <View className="flex-row justify-between mb-3 pb-3 border-b border-border">
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary }}>
              Taxa de entrega
            </Text>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: feeAmount === 0 ? Colors.success : Colors.textPrimary }}>
              {feeText}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: Colors.textPrimary }}>
              Total
            </Text>
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: Colors.primary }}>
              R$ {total.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Botão de checkout */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-surface px-5 pt-3"
        style={{ paddingBottom: insets.bottom + 12, borderTopWidth: 1, borderTopColor: '#F0E0E0' }}
      >
        <TouchableOpacity
          className="rounded-2xl h-14 items-center justify-center"
          style={{ backgroundColor: Colors.primary }}
          activeOpacity={0.85}
        >
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#FFF' }}>
            Finalizar pedido · R$ {total.toFixed(2).replace('.', ',')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
