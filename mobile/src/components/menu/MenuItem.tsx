import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { MenuItem as MenuItemType } from '../../data/mock';

type Props = {
  item: MenuItemType;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
};

export default function MenuItem({ item, quantity, onAdd, onRemove }: Props) {
  return (
    <View className="flex-row items-center px-5 py-4 border-b border-border">
      <View className="flex-1 mr-4">
        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: Colors.textPrimary }}>
          {item.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.textSecondary, marginTop: 2, lineHeight: 18 }}
        >
          {item.description}
        </Text>
        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 14, color: Colors.textPrimary, marginTop: 6 }}>
          R$ {item.price.toFixed(2).replace('.', ',')}
        </Text>
      </View>

      <View className="items-center">
        <View
          className="items-center justify-center rounded-2xl overflow-hidden mb-3"
          style={{ width: 80, height: 80, backgroundColor: `${Colors.primary}15` }}
        >
          <MaterialCommunityIcons name={item.iconName as any} size={38} color={Colors.primary} style={{ opacity: 0.8 }} />
        </View>

        {quantity === 0 ? (
          <TouchableOpacity
            onPress={onAdd}
            className="w-8 h-8 rounded-full items-center justify-center"
            style={{ backgroundColor: Colors.primary }}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="plus" size={18} color="#FFF" />
          </TouchableOpacity>
        ) : (
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={onRemove}
              className="w-7 h-7 rounded-full items-center justify-center border"
              style={{ borderColor: Colors.primary }}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="minus" size={14} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 14, color: Colors.textPrimary, minWidth: 16, textAlign: 'center' }}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={onAdd}
              className="w-7 h-7 rounded-full items-center justify-center"
              style={{ backgroundColor: Colors.primary }}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="plus" size={14} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
