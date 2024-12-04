import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';
import { useUser } from "../../user";
import { useEffect } from "react";

export const OnBoardingFour = () => {
  const {user, saveUser} = useUser();

  const navigation = useNavigation();
  useEffect(() => {
    if (user?.onBoardingFour === true) {
      return navigation.navigate(ScreenName.onBoardFive);
    }
  }, [user?.onBoardingFour]);
  const handleOnBoardingThree = async () => {
    await saveUser({...user, onBoardingFour: true});
    navigation.navigate(ScreenName.onBoardFive);
  };
  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../asstes/onBoardingFour.png')}>
        <SafeAreaView style={styles.content}>
          <Text style={styles.h1_text}>
            Tap and let ParTouch{'\n'}choose for you!
          </Text>
          <TouchableOpacity
            onPress={handleOnBoardingThree}
            style={styles.button}>
            <Text style={styles.button_text}>Next</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  imageBg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  content: {
    alignItems: 'center',
    gap: 50,
    marginBottom: 100,
  },
  h1_text: {
    fontSize: 26,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
  },
  button: {
    width: 270,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 500,
  },
  button_text: {
    fontSize: 17,
    fontWeight: '700',
    color: 'rgba(32, 32, 32, 1)',
  },
});
