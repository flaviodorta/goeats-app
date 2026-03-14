import { useEffect, useState } from 'react';
import { Restaurant } from '../data/mock';
import { fetchRestaurants } from '../services/restaurants';

interface State {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

export const useRestaurants = () => {
  const [state, setState] = useState<State>({
    restaurants: [],
    loading: true,
    error: null,
  });

  const load = () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    fetchRestaurants()
      .then((restaurants) => setState({ restaurants, loading: false, error: null }))
      .catch(() =>
        setState({ restaurants: [], loading: false, error: 'Erro ao carregar restaurantes. Verifique sua conexão.' })
      );
  };

  useEffect(() => { load(); }, []);

  return { ...state, retry: load };
}
