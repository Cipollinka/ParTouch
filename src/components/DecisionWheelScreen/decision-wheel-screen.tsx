import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  Share,
} from 'react-native';
import Svg, {G, Path, Text as SvgText} from 'react-native-svg';
import {useUser} from '../../user';

export const DecisionWheelScreen = () => {
  const [rotation, setRotation] = useState(new Animated.Value(0));
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const {user} = useUser();

  const segments = user?.selectedItem.variant; // Список варіантів
  const segmentAngle = 360 / segments!.length;

  // Обробка обертання рулетки
  const spinWheel = () => {
    rotation.setValue(0);
    const randomRotation = Math.floor(Math.random() * 360) + 3600; // Випадкове обертання + 2 оберти
    const offset = segmentAngle / 2; // Половина кута одного сегмента

    Animated.timing(rotation, {
      toValue: randomRotation,
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      const normalizedRotation = (randomRotation % 360) + offset; // Компенсуємо зміщення
      const adjustedAngle = 360 - normalizedRotation; // Обертання у зворотному напрямку
      const selectedIndex =
        Math.floor(adjustedAngle / segmentAngle) % segments!.length;

      console.log({
        randomRotation,
        normalizedRotation,
        adjustedAngle,
        selectedIndex,
        selectedSegment: segments![selectedIndex],
      });

      setSelectedOption(segments![selectedIndex]);
    });
  };

  // Створення сегментів рулетки
  const renderSegments = () => {
    const radius = 160; // Радіус кола
    const textRadius = 100; // Радіус для розміщення тексту ближче до центру

    return segments!.map((item, index) => {
      const startAngle = (index * segmentAngle * Math.PI) / 180; // Початковий кут у радіанах
      const endAngle = ((index + 1) * segmentAngle * Math.PI) / 180; // Кінцевий кут у радіанах

      const largeArcFlag = segmentAngle > 180 ? 1 : 0; // Для визначення дуги, якщо кут більше 180

      // Координати для початку і кінця сегмента
      const x1 = radius + radius * Math.cos(startAngle);
      const y1 = radius + radius * Math.sin(startAngle);

      const x2 = radius + radius * Math.cos(endAngle);
      const y2 = radius + radius * Math.sin(endAngle);

      // Опис шляху для сегмента
      const pathData = `
      M ${radius},${radius}
      L ${x1},${y1}
      A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2}
      Z
    `;

      // Розрахунок координат тексту
      const textX =
        radius +
        textRadius * Math.cos(startAngle + (endAngle - startAngle) / 2);
      const textY =
        radius +
        textRadius * Math.sin(startAngle + (endAngle - startAngle) / 2);

      return (
        <G key={index}>
          {/* Сегмент */}
          <Path d={pathData} fill={index % 2 === 0 ? '#FF6F61' : '#FFF'} />

          {/* Текст в середині сегмента */}
          <SvgText
            x={textX}
            y={textY}
            fill="black"
            fontSize="16"
            textAnchor="middle"
            alignmentBaseline="middle">
            {item}
          </SvgText>

          {/* Лінія для розділення сегментів */}
          <Path
            d={`M ${radius},${radius} L ${x1},${y1}`}
            stroke="black"
            strokeWidth="1"
          />
        </G>
      );
    });
  };
  useEffect(() => {
    const listener = rotation.addListener(({value}) => {
      setCurrentRotation(value);
    });

    return () => {
      rotation.removeListener(listener);
    };
  }, [rotation]);
  const shareResult = async () => {
    if (selectedOption) {
      try {
        const message = `I just spun the wheel and got "${selectedOption}"! Try your luck too! 🎉`;
        await Share.share({
          message: message,
        });
      } catch (error: any) {
        console.error('Error sharing result:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wheelContainer}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}>
          <Svg
            style={{borderWidth: 1, borderColor: 'white'}}
            height="320"
            width="320"
            viewBox="0 0 320 320">
            {renderSegments()}
          </Svg>
        </Animated.View>
        <Image
          style={styles.pointer}
          source={require('../../asstes/icons/center_pointer.png')}
        />
      </View>
      <TouchableOpacity style={styles.spinButton} onPress={spinWheel}>
        <Text style={styles.spinButtonText}>
          {currentRotation > 0 ? 'Spin one more time' : 'Spin'}
        </Text>
      </TouchableOpacity>
      {selectedOption && (
        <TouchableOpacity
          style={{
            marginTop: 15,
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}
          onPress={shareResult}>
          <Image source={require('../../asstes/icons/share_icon.png')} />
          <Text
            style={{
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 17,
              fontWeight: '700',
            }}>
            Share result
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointer: {
    position: 'absolute',
    // transform: [{translateX: -5}],
  },
  spinButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF6F61',
    borderRadius: 10,
  },
  spinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
