import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { categories } from '../../data/mock';

type Props = {
  selected: string;
  onSelect: (id: string) => void;
};

export default function CategoryFilter({ selected, onSelect }: Props) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 14, paddingVertical: 6 }}
      renderItem={({ item }) => {
        const isActive = item.id === selected;
        return (
          <TouchableOpacity onPress={() => onSelect(item.id)} className='items-center w-[72px]' activeOpacity={0.85}>
            <View
              className='w-14 h-14 rounded-full items-center justify-center border'
              style={{
                borderColor: isActive ? Colors.primary : Colors.border,
                backgroundColor: isActive ? '#FFE8DA' : '#FFF',
              }}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                color={isActive ? Colors.primary : Colors.textSecondary}
              />
            </View>
            <Text
              numberOfLines={1}
              className='mt-2 text-center'
              style={{
                fontFamily: isActive ? 'Poppins_600SemiBold' : 'Poppins_400Regular',
                fontSize: 12,
                color: isActive ? Colors.textPrimary : Colors.textSecondary,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}
