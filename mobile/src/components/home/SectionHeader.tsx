import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';

type Props = {
  title: string;
};

export default function SectionHeader({ title }: Props) {
  return (
    <View className="flex-row items-center justify-between px-5 mt-6 mb-3">
      <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 17, color: Colors.textPrimary }}>
        {title}
      </Text>
      <TouchableOpacity>
        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.primary }}>
          Ver todos
        </Text>
      </TouchableOpacity>
    </View>
  );
}
