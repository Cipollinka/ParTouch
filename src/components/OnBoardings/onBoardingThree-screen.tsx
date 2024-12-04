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
import { useEffect } from "react";
import { useUser } from "../../user";

export const OnBoardingThree = () => {
  const {user, saveUser} = useUser();

  const navigation = useNavigation();
  useEffect(() => {
    if (user?.onBoardingThree === true) {
      return navigation.navigate(ScreenName.onBoardFour);
    }
  }, [user?.onBoardingThree]);
  const handleOnBoardingThree = async () => {
    await saveUser({...user, onBoardingThree: true});
    navigation.navigate(ScreenName.onBoardFour);
  };
  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../asstes/onBoardingTwo.png')}>
        <SafeAreaView style={styles.content}>
          <SafeAreaView style={{alignItems: 'center'}}>
            <Text style={styles.h1_text}>Add your options!</Text>
            <Text style={styles.h2_text}>
              Fill in each category with choices.
            </Text>
          </SafeAreaView>
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
    gap: 27,
    marginBottom: 100,
  },
  h1_text: {
    fontSize: 26,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
  h2_text: {
    fontSize: 17,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    marginTop: 22,
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
