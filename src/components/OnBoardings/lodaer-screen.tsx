import {ImageBackground, StyleSheet} from 'react-native';
import {useEffect} from 'react';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';

export const Loader = () => {
  const navigation = useNavigation();
  setTimeout(() => {
    navigation.navigate(ScreenName.onBoardOne);
  }, 2000);
  return (
    <ImageBackground
      style={styles.imageBg}
      source={require('../../asstes/load_screen.png')}
    />
  );
};
const styles = StyleSheet.create({
  imageBg: {
    width: '100%',
    height: '100%',
  },
});
