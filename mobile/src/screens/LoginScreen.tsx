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
import { loginApi } from '../services/auth';
import { useAuthStore } from '../stores/authStore';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password) return;
    setLoading(true);
    setError('');
    try {
      const { user, token } = await loginApi(email.trim().toLowerCase(), password);
      await setAuth(user, token);
      // AppNavigator detecta isAuthenticated e troca para PrivateNavigator automaticamente.
      // PrivateNavigator verifica pendingCheckout e redireciona ao Checkout se necessário.
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? 'Erro ao fazer login. Verifique seus dados.';
      setError(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className='flex-1'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: Colors.primaryDark }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingTop: insets.top + 12 }} className='px-5'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='w-10 h-10 rounded-full bg-white/15 items-center justify-center'
            activeOpacity={0.85}
          >
            <MaterialCommunityIcons name='arrow-left' size={20} color='#FFF' />
          </TouchableOpacity>
        </View>

        <View className='flex-1 justify-end px-5' style={{ paddingBottom: insets.bottom + 32 }}>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 40, color: '#FFF', lineHeight: 44, marginBottom: 8 }}>
            Bem-vindo{'\n'}de volta
          </Text>
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>
            Entre na sua conta para continuar
          </Text>

          {/* Email */}
          <View className='mb-4'>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
              E-mail
            </Text>
            <View
              className='flex-row items-center rounded-2xl px-4'
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', height: 52 }}
            >
              <MaterialCommunityIcons name='email-outline' size={18} color='rgba(255,255,255,0.5)' />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder='seu@email.com'
                placeholderTextColor='rgba(255,255,255,0.35)'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                style={{ flex: 1, marginLeft: 10, fontFamily: 'Poppins_400Regular', fontSize: 15, color: '#FFF' }}
              />
            </View>
          </View>

          {/* Senha */}
          <View className='mb-2'>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
              Senha
            </Text>
            <View
              className='flex-row items-center rounded-2xl px-4'
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', height: 52 }}
            >
              <MaterialCommunityIcons name='lock-outline' size={18} color='rgba(255,255,255,0.5)' />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder='••••••••'
                placeholderTextColor='rgba(255,255,255,0.35)'
                secureTextEntry={!showPassword}
                style={{ flex: 1, marginLeft: 10, fontFamily: 'Poppins_400Regular', fontSize: 15, color: '#FFF' }}
              />
              <TouchableOpacity onPress={() => setShowPassword((v) => !v)} activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color='rgba(255,255,255,0.5)'
                />
              </TouchableOpacity>
            </View>
          </View>

          {error ? (
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#FF6B6B', marginBottom: 12, marginTop: 4 }}>
              {error}
            </Text>
          ) : (
            <View style={{ height: 20 }} />
          )}

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading || !email.trim() || !password}
            className='h-14 rounded-full items-center justify-center mt-2'
            style={{
              backgroundColor:
                loading || !email.trim() || !password ? 'rgba(255,255,255,0.2)' : Colors.primary,
            }}
            activeOpacity={0.9}
          >
            {loading ? (
              <ActivityIndicator color='#FFF' />
            ) : (
              <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#FFF' }}>Entrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            className='mt-4 h-12 rounded-full items-center justify-center'
            activeOpacity={0.7}
          >
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
              Não tem conta?{' '}
              <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#FFF' }}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
