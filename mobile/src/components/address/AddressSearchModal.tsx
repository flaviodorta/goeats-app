import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors } from '../../constants/colors';

type ViaCepResponse = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

export type Address = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  display: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (address: Address) => void;
};

export default function AddressSearchModal({
  visible,
  onClose,
  onSelect,
}: Props) {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Address | null>(null);
  const [error, setError] = useState('');

  const format_cep = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    return digits;
  };

  const handle_search = async (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length < 8) {
      setResult(null);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data: ViaCepResponse = await res.json();

      if (data.erro) {
        setError('CEP não encontrado. Verifique e tente novamente.');
      } else {
        const address: Address = {
          cep: data.cep,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
          display: `${data.bairro}, ${data.localidade} - ${data.uf}`,
        };
        setResult(address);
      }
    } catch {
      setError('Erro ao buscar CEP. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const handle_change = (value: string) => {
    const formatted = format_cep(value);
    setCep(formatted);
    handle_search(formatted);
  };

  const handle_confirm = () => {
    if (!result) return;
    onSelect(result);
    setCep('');
    setResult(null);
    setError('');
    onClose();
  };

  const handle_close = () => {
    setCep('');
    setResult(null);
    setError('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType='slide' transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View className='flex-1 justify-end' style={{ backgroundColor: Colors.overlay }}>
          <View className='rounded-t-[34px] px-6 pt-4 pb-10 bg-white'>
            <View className='w-10 h-1 rounded-full self-center mb-6' style={{ backgroundColor: Colors.border }} />

            <View className='flex-row items-center justify-between mb-5'>
              <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 22, color: Colors.textPrimary }}>
                Endereço de entrega
              </Text>
              <TouchableOpacity onPress={handle_close} className='w-9 h-9 rounded-full items-center justify-center bg-chip'>
                <MaterialCommunityIcons name='close' size={20} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary, marginBottom: 10 }}>
              Digite seu CEP e encontraremos restaurantes próximos.
            </Text>

            <View className='h-14 rounded-2xl px-4 flex-row items-center border' style={{ borderColor: Colors.border, backgroundColor: '#FAF8F4' }}>
              <MaterialCommunityIcons name='map-marker-outline' size={20} color={Colors.primary} />

              <TextInput
                value={cep}
                onChangeText={handle_change}
                placeholder='00000-000'
                placeholderTextColor={Colors.disabled}
                keyboardType='numeric'
                maxLength={9}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 15,
                  color: Colors.textPrimary,
                }}
                autoFocus
              />

              {loading && <ActivityIndicator size='small' color={Colors.primary} />}
            </View>

            {error !== '' && (
              <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.error, marginTop: 10 }}>
                {error}
              </Text>
            )}

            {result && (
              <View className='rounded-2xl p-4 mt-4 mb-6 border bg-cream' style={{ borderColor: '#F4DEC9' }}>
                <View className='flex-row items-start'>
                  <View
                    className='w-8 h-8 rounded-full items-center justify-center mr-3'
                    style={{ backgroundColor: 'rgba(218, 78, 28, 0.15)' }}
                  >
                    <MaterialCommunityIcons name='map-marker' size={17} color={Colors.primary} />
                  </View>

                  <View className='flex-1'>
                    {result.street !== '' && (
                      <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: Colors.textPrimary }}>
                        {result.street}
                      </Text>
                    )}
                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary }}>
                      {result.neighborhood}
                    </Text>
                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary }}>
                      {result.city} - {result.state}
                    </Text>
                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.disabled, marginTop: 1 }}>
                      CEP: {result.cep}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <TouchableOpacity
              onPress={handle_confirm}
              disabled={!result}
              className='rounded-full h-14 items-center justify-center'
              style={{ backgroundColor: result ? Colors.primary : Colors.disabled }}
              activeOpacity={0.88}
            >
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#FFF' }}>
                Confirmar endereço
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
