import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '../constants/colors';
import { registerApi } from '../services/auth';
import { useAuthStore } from '../stores/authStore';

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handlePhone = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 11);
    let masked = digits;
    if (digits.length > 6) masked = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    else if (digits.length > 2) masked = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    else if (digits.length > 0) masked = `(${digits}`;
    setPhone(masked);
  };
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValid = name.trim().length > 1 && email.includes('@') && password.length >= 6;

  const handleRegister = async () => {
    if (!isValid) return;
    setLoading(true);
    setError('');
    try {
      const { user, token } = await registerApi(name.trim(), email.trim().toLowerCase(), password, phone.replace(/\D/g, ''));
      await setAuth(user, token);
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? 'Erro ao criar conta. Tente novamente.';
      setError(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

  const field = (
    icon: string,
    value: string,
    onChange: (v: string) => void,
    placeholder: string,
    opts?: {
      keyboardType?: any;
      autoCapitalize?: any;
      secureTextEntry?: boolean;
      rightIcon?: React.ReactNode;
    },
  ) => (
    <View
      className='flex-row items-center rounded-2xl px-4'
      style={{ backgroundColor: 'rgba(0,0,0,0.06)', height: 52, borderWidth: 1, borderColor: Colors.border }}
    >
      <MaterialCommunityIcons name={icon as any} size={18} color={Colors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={Colors.disabled}
        keyboardType={opts?.keyboardType}
        autoCapitalize={opts?.autoCapitalize ?? 'sentences'}
        autoCorrect={false}
        secureTextEntry={opts?.secureTextEntry}
        style={{ flex: 1, marginLeft: 10, fontFamily: 'Poppins_400Regular', fontSize: 15, color: Colors.textPrimary }}
      />
      {opts?.rightIcon}
    </View>
  );

  return (
    <KeyboardAvoidingView
      className='flex-1 bg-background'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingTop: insets.top + 12 }} className='px-5'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='w-10 h-10 rounded-full items-center justify-center border'
            style={{ borderColor: Colors.border }}
            activeOpacity={0.85}
          >
            <MaterialCommunityIcons name='arrow-left' size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View className='px-5 mt-6' style={{ paddingBottom: insets.bottom + 32 }}>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 36, color: Colors.textPrimary, lineHeight: 40, marginBottom: 6 }}>
            Criar conta
          </Text>
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: Colors.textSecondary, marginBottom: 28 }}>
            Preencha seus dados para começar
          </Text>

          {/* Nome */}
          <View className='mb-4'>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.textSecondary, marginBottom: 8 }}>
              Nome completo
            </Text>
            {field('account-outline', name, setName, 'João Silva')}
          </View>

          {/* Email */}
          <View className='mb-4'>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.textSecondary, marginBottom: 8 }}>
              E-mail
            </Text>
            {field('email-outline', email, setEmail, 'seu@email.com', {
              keyboardType: 'email-address',
              autoCapitalize: 'none',
            })}
          </View>

          {/* Telefone */}
          <View className='mb-4'>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.textSecondary, marginBottom: 8 }}>
              Telefone
            </Text>
            {field('phone-outline', phone, handlePhone, '(11) 99999-9999', { keyboardType: 'phone-pad', autoCapitalize: 'none' })}
          </View>

          {/* Senha */}
          <View className='mb-2'>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: Colors.textSecondary, marginBottom: 8 }}>
              Senha (mín. 6 caracteres)
            </Text>
            {field('lock-outline', password, setPassword, '••••••••', {
              secureTextEntry: !showPassword,
              rightIcon: (
                <TouchableOpacity onPress={() => setShowPassword((v) => !v)} activeOpacity={0.7}>
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={Colors.textSecondary}
                  />
                </TouchableOpacity>
              ),
            })}
          </View>

          {error ? (
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: Colors.error, marginBottom: 12, marginTop: 4 }}>
              {error}
            </Text>
          ) : (
            <View style={{ height: 20 }} />
          )}

          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading || !isValid}
            className='h-14 rounded-full items-center justify-center mt-2'
            style={{ backgroundColor: loading || !isValid ? Colors.disabled : Colors.primary }}
            activeOpacity={0.9}
          >
            {loading ? (
              <ActivityIndicator color='#FFF' />
            ) : (
              <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#FFF' }}>Criar conta</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className='mt-4 h-12 rounded-full items-center justify-center'
            activeOpacity={0.7}
          >
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: Colors.textSecondary }}>
              Já tem conta?{' '}
              <Text style={{ fontFamily: 'Poppins_600SemiBold', color: Colors.primary }}>Entrar</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
