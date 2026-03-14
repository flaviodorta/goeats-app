import { useEffect, useState } from 'react';
import { MenuItem } from '../data/mock';
import { fetchRestaurantMenu } from '../services/restaurants';

interface State {
  menu: MenuItem[];
  loading: boolean;
  error: string | null;
}

export const useRestaurantMenu = (restaurantId: string) => {
  const [state, setState] = useState<State>({
    menu: [],
    loading: true,
    error: null,
  });

  const load = () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    fetchRestaurantMenu(restaurantId)
      .then((menu) => setState({ menu, loading: false, error: null }))
      .catch(() =>
        setState({ menu: [], loading: false, error: 'Erro ao carregar o cardápio.' })
      );
  };

  useEffect(() => { load(); }, [restaurantId]);

  return { ...state, retry: load };
}
