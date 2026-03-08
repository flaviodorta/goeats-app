import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Tab } from '../../types';

const tabs: Tab[] = [
  {
    id: 'explore',
    label: 'Explorar',
    icon: 'compass-outline',
    activeIcon: 'compass',
  },
  {
    id: 'orders',
    label: 'Pedidos',
    icon: 'receipt-outline',
    activeIcon: 'receipt',
  },
  { id: 'offers', label: 'Ofertas', icon: 'tag-outline', activeIcon: 'tag' },
  {
    id: 'profile',
    label: 'Perfil',
    icon: 'account-outline',
    activeIcon: 'account',
  },
];

type Props = {
  tabs: Tab[];
  activeTab?: string;
  onTabPress?: (tabId: string) => void;
};

export default function BottomTabBar({
  tabs,
  activeTab = 'explore',
  onTabPress,
}: Props) {
  return (
    <View
      className='flex-row bg-surface border-t border-border'
      style={{ paddingBottom: 20, paddingTop: 10 }}
    >
      {tabs.map((tab) => {
        const is_active = tab.id === activeTab;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress?.(tab.id)}
            className='flex-1 items-center'
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={(is_active ? tab.activeIcon : tab.icon) as any}
              size={24}
              color={is_active ? Colors.primary : Colors.textSecondary}
            />
            <Text
              numberOfLines={1}
              style={{
                fontFamily: is_active
                  ? 'Poppins_600SemiBold'
                  : 'Poppins_400Regular',
                fontSize: 11,
                color: is_active ? Colors.primary : Colors.textSecondary,
                marginTop: 2,
                textAlign: 'center',
                width: '100%',
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
