import { Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../constants/colors';

type Props = {
  title: string;
};

export default function SectionHeader({ title }: Props) {
  return (
    <View className='flex-row items-center justify-between px-5 mt-3 mb-3'>
      <Text
        style={{
          fontFamily: 'Poppins_700Bold',
          fontSize: 24,
          letterSpacing: -0.4,
          color: Colors.textPrimary,
        }}
      >
        {title}
      </Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Text
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 13,
            color: Colors.textSecondary,
          }}
        >
          Ver tudo
        </Text>
      </TouchableOpacity>
    </View>
  );
}
