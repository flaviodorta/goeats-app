import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFonts,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  ViewToken,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    icon: 'moped' as const,
    title: 'GoEats',
    subtitle: 'Descubra restaurantes\nperto de você',
  },
  {
    id: '2',
    icon: 'food' as const,
    title: 'Peça com\nfacilidade',
    subtitle: 'Monte seu pedido e\npersonalize do seu jeito',
  },
  {
    id: '3',
    icon: 'clock-fast' as const,
    title: 'Receba em\nminutos',
    subtitle: 'Acompanhe sua entrega\nem tempo real',
  },
];

function Slide({ item }: { item: (typeof slides)[0] }) {
  return (
    <View style={{ width }} className='flex-1 items-center justify-center px-8'>
      <View className='w-28 h-28 rounded-full bg-white items-center justify-center mb-8'>
        <MaterialCommunityIcons name={item.icon} size={52} color='#E53935' />
      </View>

      <Text
        className='text-white text-4xl text-center mb-3'
        style={{ fontFamily: 'Poppins_700Bold' }}
      >
        {item.title}
      </Text>

      <Text
        className='text-white/80 text-base text-center leading-6'
        style={{ fontFamily: 'Poppins_300Light' }}
      >
        {item.subtitle}
      </Text>
    </View>
  );
}

function Dots({ activeIndex }: { activeIndex: number }) {
  return (
    <View className='flex-row items-center justify-center'>
      {slides.map((_, index) => (
        <View
          key={index}
          // O dot ativo é maior (w-4) e opaco; os inativos são menores e translúcidos
          className={[
            'h-2 rounded-full mx-1 transition-all',
            index === activeIndex ? 'w-4 bg-white' : 'w-2 bg-white/40',
          ].join(' ')}
        />
      ))}
    </View>
  );
}

type Props = {
  onDone: () => void;
};

export default function OnboardingScreen({ onDone }: Props) {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);

  if (!fontsLoaded) {
    return (
      <View className='flex-1 bg-primary items-center justify-center'>
        <ActivityIndicator color='white' />
      </View>
    );
  }

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  };

  const isLastSlide = activeIndex === slides.length - 1;

  const handleNext = async () => {
    if (isLastSlide) {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      onDone();
    } else {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  return (
    <View className='flex-1 bg-primary'>
      <StatusBar style='light' />

      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Slide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      <View className='absolute bottom-10 left-0 right-0 items-center px-8'>
        <Dots activeIndex={activeIndex} />

        <TouchableOpacity
          onPress={handleNext}
          className='mt-8 w-full bg-white rounded-2xl py-4 items-center'
          activeOpacity={0.85}
        >
          <Text
            className='text-primary text-base'
            style={{ fontFamily: 'Poppins_600SemiBold' }}
          >
            {isLastSlide ? 'Começar' : 'Próximo'}
          </Text>
        </TouchableOpacity>

        {!isLastSlide && (
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.setItem('hasSeenOnboarding', 'true');
              onDone();
            }}
            className='mt-4'
          >
            <Text
              className='text-white/60 text-sm'
              style={{ fontFamily: 'Poppins_300Light' }}
            >
              Pular
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {activeIndex === 0 && (
        <View className='absolute bottom-52 left-0 right-0 items-center'>
          <Text
            className='text-white/70 text-xs tracking-widest'
            style={{ fontFamily: 'Poppins_300Light' }}
          >
            SUA COMIDA FAVORITA, ENTREGA RÁPIDA.
          </Text>
        </View>
      )}
    </View>
  );
}
