import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {FooterMenu} from './footer-menu-component.tsx';
import {AddParTouches} from '../AddParTouches/add-par-touches-page.tsx';
import {useState} from 'react';
import {Presets} from '../Presets/presets-screen.tsx';
import {DecisionWheelScreen} from '../DecisionWheelScreen/decision-wheel-screen.tsx';
import {Settings} from '../SettingsPage/settings-screen.tsx';

export const Main = () => {
  const [screen, setScreen] = useState('glob');
  const renderScreen = () => {
    switch (screen) {
      case 'glob':
        return <AddParTouches setScreen={setScreen} />;
      case 'presets':
        return <Presets setScreen={setScreen} />;
      case 'decision':
        return <DecisionWheelScreen />;
      case 'settings':
        return <Settings />;
      default:
        return <AddParTouches setScreen={setScreen} />; // Дефолтний екран
    }
  };
  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../asstes/main_background.png')}>
        <View style={styles.header_image}>
          <Image source={require('../../asstes/header.png')} />
        </View>
        {renderScreen()}
        <FooterMenu setScreen={setScreen} />
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
  },
  header_image: {
    width: '100%',
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    height: 100,
    backgroundColor: 'rgba(242, 89, 88, 1)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
});
