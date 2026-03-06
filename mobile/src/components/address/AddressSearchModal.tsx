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

export default function AddressSearchModal({ visible, onClose, onSelect }: Props) {
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
      setError('Erro ao buscar o CEP. Verifique sua conexão.');
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
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-surface rounded-t-3xl px-6 pt-4 pb-10">

            <View className="w-10 h-1 rounded-full bg-border self-center mb-6" />

            <View className="flex-row items-center justify-between mb-6">
              <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18, color: Colors.textPrimary }}>
                Onde você está?
              </Text>
              <TouchableOpacity onPress={handle_close}>
                <MaterialCommunityIcons name="close" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.textSecondary, marginBottom: 8 }}>
              Digite seu CEP para encontrar restaurantes perto de você
            </Text>

            <View className="flex-row items-center bg-background border border-border rounded-2xl px-4 h-14 mb-4">
              <MaterialCommunityIcons name="map-marker-outline" size={20} color={Colors.primary} />
              <TextInput
                value={cep}
                onChangeText={handle_change}
                placeholder="00000-000"
                placeholderTextColor={Colors.disabled}
                keyboardType="numeric"
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
              {loading && <ActivityIndicator size="small" color={Colors.primary} />}
            </View>

            {error !== '' && (
              <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.error, marginBottom: 12 }}>
                {error}
              </Text>
            )}

            {result && (
              <View className="bg-background rounded-2xl p-4 mb-6">
                <View className="flex-row items-start">
                  <MaterialCommunityIcons name="map-marker" size={20} color={Colors.primary} style={{ marginTop: 2 }} />
                  <View className="ml-3 flex-1">
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
                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, color: Colors.disabled, marginTop: 2 }}>
                      CEP: {result.cep}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <TouchableOpacity
              onPress={handle_confirm}
              disabled={!result}
              className="rounded-2xl h-14 items-center justify-center"
              style={{ backgroundColor: result ? Colors.primary : Colors.disabled }}
              activeOpacity={0.85}
            >
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: '#FFF' }}>
                Confirmar endereço
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
