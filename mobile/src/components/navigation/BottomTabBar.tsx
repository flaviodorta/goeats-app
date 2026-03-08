import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { Tab } from '../../types';

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
    <View className='px-5 pb-6 pt-1 bg-transparent'>
      <View
        className='flex-row rounded-full border px-2 py-2 bg-white'
        style={{
          borderColor: Colors.border,
          elevation: 6,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabPress?.(tab.id)}
              className='flex-1 items-center py-1'
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons
                name={(isActive ? tab.activeIcon : tab.icon) as any}
                size={22}
                color={isActive ? Colors.primary : Colors.textSecondary}
              />
              <Text
                style={{
                  fontFamily: isActive ? 'Poppins_600SemiBold' : 'Poppins_400Regular',
                  fontSize: 10.5,
                  color: isActive ? Colors.primary : Colors.textSecondary,
                  marginTop: 2,
                  textAlign: 'center',
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
