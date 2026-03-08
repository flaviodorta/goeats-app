import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../stores/authStore';
import PrivateNavigator from './PrivateNavigator';
import PublicNavigator from './PublicNavigator';

export default function AppNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      {isAuthenticated ? <PrivateNavigator /> : <PublicNavigator />}
    </NavigationContainer>
  );
}
