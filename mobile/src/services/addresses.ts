import { useAuthStore } from '../stores/authStore';
import { api } from './api';

export interface Address {
  id: string;
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  is_default: boolean;
}

export interface CreateAddressPayload {
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
}

const authHeaders = () => {
  const token = useAuthStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchAddresses = async (): Promise<Address[]> => {
  const { data } = await api.get<Address[]>('/addresses', { headers: authHeaders() });
  return data;
};

export const createAddress = async (payload: CreateAddressPayload): Promise<Address> => {
  const { data } = await api.post<Address>('/addresses', payload, { headers: authHeaders() });
  return data;
};

export const setDefaultAddress = async (id: string): Promise<Address> => {
  const { data } = await api.patch<Address>(`/addresses/${id}/default`, {}, { headers: authHeaders() });
  return data;
};

export const deleteAddress = async (id: string): Promise<void> => {
  await api.delete(`/addresses/${id}`, { headers: authHeaders() });
};
