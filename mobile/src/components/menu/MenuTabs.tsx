import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';

const tabs = [
  { id: 'popular', label: 'Popular' },
  { id: 'mains', label: 'Pratos' },
  { id: 'drinks', label: 'Bebidas' },
  { id: 'desserts', label: 'Sobremesas' },
];

type Props = {
  selected: string;
  onSelect: (id: string) => void;
};

export default function MenuTabs({ selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
      style={{ borderBottomWidth: 1, borderBottomColor: Colors.border }}
    >
      {tabs.map((tab) => {
        const is_active = tab.id === selected;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onSelect(tab.id)}
            activeOpacity={0.7}
            style={{ paddingVertical: 14, paddingHorizontal: 4, borderBottomWidth: 2, borderBottomColor: is_active ? Colors.primary : 'transparent' }}
          >
            <Text
              style={{
                fontFamily: is_active ? 'Poppins_600SemiBold' : 'Poppins_400Regular',
                fontSize: 14,
                color: is_active ? Colors.primary : Colors.textSecondary,
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
