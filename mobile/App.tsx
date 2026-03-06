import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';

type AppState = 'loading' | 'onboarding' | 'home';

export default function App() {
  const [appState, setAppState] = useState<AppState>('loading');

  AsyncStorage.clear();

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
      {appState === 'onboarding' && <OnboardingScreen onDone={() => setAppState('home')} />}
      {appState === 'home' && <HomeScreen />}
    </SafeAreaProvider>
  );
}
