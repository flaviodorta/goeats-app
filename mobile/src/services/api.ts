import axios from 'axios';
import { Platform } from 'react-native';

// Android Emulator usa 10.0.2.2 para acessar o host. Em dispositivo físico, use o IP local (ex: http://192.168.x.x:3333)
const DEV_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? `http://${DEV_HOST}:3333`;

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});
