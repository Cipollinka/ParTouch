import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface FooterMenuProps {
  setScreen: (value: ((prevState: string) => string) | string) => void;
}

export const FooterMenu = ({setScreen}: FooterMenuProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setScreen('settings')} style={styles.buttons}>
        <Image source={require('../../asstes/icons/setting_icon.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('add')} style={styles.buttons}>
        <Image source={require('../../asstes/icons/add_icon.png')} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setScreen('presets')}
        style={styles.buttons}>
        <Image source={require('../../asstes/icons/presets_icon.png')} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 106,
    borderTopStartRadius: 22,
    borderTopEndRadius: 22,
    backgroundColor: 'rgba(242, 89, 88, 1)',
    paddingTop: 18,
    paddingLeft: 48,
    paddingRight: 48,
    paddingBottom: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
