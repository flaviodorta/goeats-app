import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  autoFocus?: boolean;
};

export default function SearchBar({ value, onChangeText, onPress, autoFocus }: Props) {
  const inner = (
    <View
      className='flex-row items-center bg-surface rounded-2xl px-4 h-12'
      style={{ elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 }}
    >
      <MaterialCommunityIcons name='magnify' size={20} color={Colors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder='Buscar comida ou restaurantes'
        placeholderTextColor={Colors.disabled}
        editable={!onPress}
        autoFocus={autoFocus}
        style={{
          flex: 1,
          marginLeft: 8,
          fontFamily: 'Poppins_400Regular',
          fontSize: 14,
          color: Colors.textPrimary,
        }}
      />
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity className='mx-5 mb-4' onPress={onPress} activeOpacity={0.85}>
        {inner}
      </TouchableOpacity>
    );
  }

  return <View className='mx-5 mb-4'>{inner}</View>;
}
