import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';

export default function LoginScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute left-4 w-9 h-9 rounded-full bg-surface items-center justify-center"
        style={{ top: insets.top + 12, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 }}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="arrow-left" size={20} color={Colors.textPrimary} />
      </TouchableOpacity>

      <View className="flex-1 items-center justify-center">
        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: Colors.textSecondary }}>
          Login — em breve
        </Text>
      </View>
    </View>
  );
}
