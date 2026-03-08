import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '../constants/colors';

const { width } = Dimensions.get('window');

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: '1',
    title: 'Entre no\nmundo do sabor',
    subtitle: 'Descubra restaurantes incríveis perto de você.',
    image:
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '2',
    title: 'Escolha seu\npedido ideal',
    subtitle: 'Monte seu pedido e acompanhe cada detalhe.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '3',
    title: 'Receba rápido\nonde estiver',
    subtitle: 'Entrega ágil com os melhores preços da região.',
    image:
      'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80',
  },
];

type Props = {
  onDone: () => void;
};

export default function OnboardingScreen({ onDone }: Props) {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const listRef = useRef<FlatList<Slide>>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const visible = viewableItems[0]?.index;
      if (visible != null) {
        setActiveIndex(visible);
      }
    },
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 60 });

  const finish = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    onDone();
  };

  const handlePrimaryAction = async () => {
    if (activeIndex === slides.length - 1) {
      await finish();
      return;
    }

    listRef.current?.scrollToIndex({
      index: activeIndex + 1,
      animated: true,
    });
  };

  if (!fontsLoaded) {
    return (
      <View className='flex-1 bg-primary items-center justify-center'>
        <ActivityIndicator color='white' />
      </View>
    );
  }

  const isLastSlide = activeIndex === slides.length - 1;

  return (
    <View className='flex-1' style={{ backgroundColor: Colors.primary }}>
      <StatusBar style='light' />

      <View
        className='absolute rounded-full'
        style={{
          top: -180,
          right: -120,
          width: 360,
          height: 360,
          backgroundColor: 'rgba(0,0,0,0.12)',
        }}
      />
      <View
        className='absolute rounded-full'
        style={{
          bottom: -220,
          left: -160,
          width: 420,
          height: 420,
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}
      />

      <View style={{ paddingTop: insets.top + 14 }} className='px-7'>
        <View className='flex-row gap-2'>
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const isCompleted = index < activeIndex;

            return (
              <View
                key={slide.id}
                className='h-1 flex-1 rounded-full'
                style={{
                  backgroundColor:
                    isActive || isCompleted
                      ? 'rgba(255,255,255,0.85)'
                      : 'rgba(255,255,255,0.4)',
                }}
              />
            );
          })}
        </View>
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        renderItem={({ item }) => (
          <View style={{ width }} className='flex-1 px-7 items-center justify-center'>
            <Text
              className='text-white text-center'
              style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 50,
                lineHeight: 52,
                letterSpacing: -1.3,
              }}
            >
              {item.title}
            </Text>

            <Text
              className='text-white/85 text-center mt-4'
              style={{ fontFamily: 'Poppins_300Light', fontSize: 15, lineHeight: 22 }}
            >
              {item.subtitle}
            </Text>

            <Image
              source={{ uri: item.image }}
              className='mt-7'
              style={{ width: 360, height: 300, borderRadius: 24 }}
              resizeMode='contain'
            />
          </View>
        )}
      />

      <View className='px-7' style={{ paddingBottom: insets.bottom + 20 }}>
        <TouchableOpacity
          onPress={handlePrimaryAction}
          activeOpacity={0.9}
          className='h-14 rounded-full items-center justify-center'
          style={{ backgroundColor: '#FFF6EB' }}
        >
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 18,
              color: Colors.primaryDark,
            }}
          >
            {isLastSlide ? 'Começar' : 'Próximo'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={finish}
          activeOpacity={0.85}
          className='h-14 rounded-full items-center justify-center mt-4 border'
          style={{ borderColor: 'rgba(255,255,255,0.55)' }}
        >
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 17,
              color: '#FFF',
            }}
          >
            {isLastSlide ? 'Já tenho uma conta' : 'Pular'}
          </Text>
        </TouchableOpacity>

        <Text
          className='text-center mt-5 text-white/80'
          style={{ fontFamily: 'Poppins_300Light', fontSize: 12, lineHeight: 18 }}
        >
          Ao continuar com Email, Google ou contas sociais, você confirma que
          aceita nossos Termos de Serviço e Política de Privacidade.
        </Text>
      </View>
    </View>
  );
}
