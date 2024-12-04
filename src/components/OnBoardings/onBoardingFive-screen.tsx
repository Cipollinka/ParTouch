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

export const OnBoardingFive = () => {
  const {user, saveUser} = useUser();

  const navigation = useNavigation();
  useEffect(() => {
    if (user?.onBoardingFive === true) {
      return navigation.navigate(ScreenName.MainLayout);
    }
  }, [user?.onBoardingFive]);
  const handleOnBoardingTwo = async () => {
    await saveUser({...user, onBoardingFive: true});
    navigation.navigate(ScreenName.MainLayout);
  };

  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../asstes/onBoardingOne.png')}>
        <View style={styles.content}>
          <SafeAreaView style={{alignItems: 'center'}}>
            <Text style={styles.h1_text}>
              Share your choice{'\n'}with friends!
            </Text>
            <Text style={styles.h2_text}>
              Who will pick for dinner tonight?
            </Text>
          </SafeAreaView>
          <TouchableOpacity onPress={handleOnBoardingTwo} style={styles.button}>
            <Text style={styles.button_text}>Start</Text>
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
    textAlign: 'center',
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
