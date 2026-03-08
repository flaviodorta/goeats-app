import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SplashScreen from './src/screens/SplashScreen';

type AppState = 'loading' | 'onboarding' | 'home';

export default function App() {
  const [appState, setAppState] = useState<AppState>('loading');

  useEffect(() => {
    AsyncStorage.getItem('hasSeenOnboarding').then((value) => {
      if (value === 'true') {
        setAppState('home');
      } else {
        setAppState('onboarding');
      }
    });
  }, []);

  return (
    <SafeAreaProvider>
      {appState === 'loading' && <SplashScreen />}
      {appState === 'onboarding' && (
        <OnboardingScreen onDone={() => setAppState('home')} />
      )}
      {appState === 'home' && <AppNavigator />}
    </SafeAreaProvider>
  );
}
