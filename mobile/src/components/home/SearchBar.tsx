import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../constants/colors';

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  autoFocus?: boolean;
};

export default function SearchBar({
  value,
  onChangeText,
  onPress,
  autoFocus,
}: Props) {
  const inner = (
    <View
      className='h-14 rounded-full flex-row items-center px-5'
      style={{
        backgroundColor: '#FFF',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 12,
      }}
    >
      <MaterialCommunityIcons name='magnify' size={22} color={Colors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder='Buscar'
        placeholderTextColor={Colors.disabled}
        editable={!onPress}
        autoFocus={autoFocus}
        style={{
          flex: 1,
          marginLeft: 8,
          fontFamily: 'Poppins_400Regular',
          fontSize: 15,
          color: Colors.textPrimary,
        }}
      />
      <View
        className='w-8 h-8 rounded-full items-center justify-center'
        style={{ backgroundColor: Colors.chip }}
      >
        <MaterialCommunityIcons name='tune' size={17} color={Colors.primaryDark} />
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        {inner}
      </TouchableOpacity>
    );
  }

  return inner;
}
