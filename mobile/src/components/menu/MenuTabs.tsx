import { ScrollView, Text, TouchableOpacity } from 'react-native';

import { Colors } from '../../constants/colors';

const tabs = [
  { id: 'popular', label: 'Popular' },
  { id: 'mains', label: 'Hambúrguer' },
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
      contentContainerStyle={{ paddingHorizontal: 14, gap: 20 }}
      style={{ borderBottomWidth: 1, borderBottomColor: Colors.border }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === selected;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onSelect(tab.id)}
            activeOpacity={0.75}
            style={{ borderBottomWidth: 2, borderBottomColor: isActive ? Colors.textPrimary : 'transparent' }}
            className='pt-3 pb-3'
          >
            <Text
              style={{
                fontFamily: isActive ? 'Poppins_600SemiBold' : 'Poppins_400Regular',
                fontSize: 14,
                color: isActive ? Colors.textPrimary : Colors.textSecondary,
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
