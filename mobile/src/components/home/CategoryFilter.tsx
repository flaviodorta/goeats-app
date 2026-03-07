import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Text, TouchableOpacity } from 'react-native';
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
      contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
      renderItem={({ item }) => {
        const is_active = item.id === selected;
        return (
          <TouchableOpacity
            onPress={() => onSelect(item.id)}
            activeOpacity={0.75}
            className="flex-row items-center rounded-2xl px-4 h-10"
            style={{
              backgroundColor: is_active ? Colors.primary : Colors.surface,
              elevation: is_active ? 0 : 2,
              shadowColor: '#000',
              shadowOpacity: is_active ? 0 : 0.07,
              shadowRadius: 4,
            }}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={16}
              color={is_active ? '#FFF' : Colors.textSecondary}
            />
            <Text
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 13,
                color: is_active ? '#FFF' : Colors.textSecondary,
                marginLeft: 6,
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
