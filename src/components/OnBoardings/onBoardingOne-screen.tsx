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

export const OnBoardingOne = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    if (user?.onBoardingOne === true) {
      return navigation.navigate(ScreenName.onBoardTwo);
    }
  }, [user?.onBoardingOne]);

  const handleOnBoardingTwo = async () => {
    await saveUser({...user, onBoardingOne: true});
    navigation.navigate(ScreenName.onBoardTwo);
  };

  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../asstes/onBoardingOne.png')}>
        <View style={styles.content}>
          <SafeAreaView style={{alignItems: 'center'}}>
            <Text style={styles.h1_text}>Welcome to ParTouch!</Text>
            <Text style={styles.h2_text}>
              Need help making decisions?{'\n'}
              We’ve got you covered!
            </Text>
          </SafeAreaView>
          <TouchableOpacity onPress={handleOnBoardingTwo} style={styles.button}>
            <Text style={styles.button_text}>Let's Go</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 100,
    gap: 27,
  },
  h1_text: {
    fontSize: 26,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: 22,
  },
  h2_text: {
    fontSize: 17,
    fontWeight: '400',
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
