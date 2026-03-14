import { api } from './api';

interface AuthResponse {
  token: string;
  user: { id: string; name: string; email: string; phone: string };
}

export const loginApi = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
  return data;
};

export const registerApi = async (
  name: string,
  email: string,
  password: string,
  phone: string,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', { name, email, password, phone });
  return data;
};
