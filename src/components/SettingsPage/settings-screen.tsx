import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Share from 'react-native-share';
import {useUser} from '../../user';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';

export const Settings = () => {
  const navigation = useNavigation();
  const {user, saveUser} = useUser();

  const handleResetData = () => {
    navigation.navigate(ScreenName.Loader);
    saveUser({
      ...user,
      onBoardingFive: false,
      onBoardingFour: false,
      onBoardingThree: false,
      onBoardingOne: false,
      saved: [],
      onBoardingTwo: false,
      selectedItem: {title: '', variant: []},
    });
  };

  const handleShare = async () => {
    try {
      const shareOptions = {
        message: 'I use this great app! Download it too!',
        url: 'https://example.com', // Ви можете додати URL вашого додатку або іншої сторінки
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Sharing error:', error);
      Alert.alert('Error', 'Could not share.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleResetData} style={styles.button}>
        <Text style={{fontSize: 17, fontWeight: '700', color: 'white'}}>
          Reset Date
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleShare} style={styles.button}>
        <Text style={{fontSize: 17, fontWeight: '700', color: 'white'}}>
          Share
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 312,
    height: 56,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  container: {
    gap: 50,
  },
});
