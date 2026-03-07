import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';
import { Colors } from '../../constants/colors';

export default function SearchBar() {
  return (
    <View className="mx-5 mb-4">
      <View
        className="flex-row items-center bg-surface rounded-2xl px-4 h-12"
        style={{ elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 }}
      >
        <MaterialCommunityIcons name="magnify" size={20} color={Colors.textSecondary} />
        <TextInput
          placeholder="Buscar comida ou restaurantes"
          placeholderTextColor={Colors.disabled}
          style={{
            flex: 1,
            marginLeft: 8,
            fontFamily: 'Poppins_400Regular',
            fontSize: 14,
            color: Colors.textPrimary,
          }}
        />
      </View>
    </View>
  );
}
