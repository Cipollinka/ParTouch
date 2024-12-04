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

export const OnBoardingTwo = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();
  useEffect(() => {
    if (user?.onBoardingTwo === true) {
      return navigation.navigate(ScreenName.onBoardTree);
    }
  }, [user?.onBoardingTwo]);
  const handleOnBoardingThree = async () => {
    await saveUser({...user, onBoardingTwo: true});
    navigation.navigate(ScreenName.onBoardTree);
  };
  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../asstes/onBoardingTwo.png')}>
        <Text style={styles.header_text}>New ParTouch</Text>
        <SafeAreaView style={styles.content}>
          <SafeAreaView>
            <Text style={styles.h1_text}>Create your own categories!</Text>
            <Text style={styles.h2_text}>
              Choose from options like ‘What to{'\n'}eat?’ or ‘Where to go?’
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
    justifyContent: 'space-between',
    gap: 335,
  },
  content: {
    alignItems: 'center',
    paddingBottom: 130,
    gap: 27,
  },
  header_text: {
    marginTop: 50,
    fontSize: 26,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
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
