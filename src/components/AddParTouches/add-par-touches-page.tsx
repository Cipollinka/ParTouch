import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import {AddTouches} from './add-par-touches.tsx';

interface AddParTouchesProps {
  setScreen: (value: ((prevState: string) => string) | string) => void;
}

export const AddParTouches = ({setScreen}: AddParTouchesProps) => {
  const [addItem, setAddItem] = useState(false);
  const handleAddItem = () => {
    setAddItem(true);
  };
  const handlePresets = () => {
    setScreen('presets');
  };
  return (
    <View>
      {!addItem ? (
        <View style={styles.container_one}>
          <TouchableOpacity onPress={handleAddItem}>
            <Image source={require('../../asstes/icons/white_plus.png')} />
          </TouchableOpacity>
          <Text style={styles.h1_text}>No ParTouches</Text>
          <Text style={styles.h3_text}>Tap + to add a new one</Text>
          <SafeAreaView style={{gap: 7, alignItems: 'center', marginTop: 21}}>
            <Text style={styles.strips} />
            <Text style={styles.h3_text}>or</Text>
            <Text style={styles.strips} />
          </SafeAreaView>
          <Text style={styles.h1_text}>Try our prepared</Text>
          <TouchableOpacity onPress={handlePresets} style={styles.button_open}>
            <Text style={styles.open_text}>Open presets</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <AddTouches setScreen={setScreen} setAddItem={setAddItem} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container_one: {
    alignItems: 'center',
  },
  strips: {
    width: 44,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  h1_text: {
    fontWeight: '700',
    fontSize: 27,
    color: 'rgba(255, 255, 255, 1)',
    marginTop: 25,
    marginBottom: 19,
  },
  h3_text: {
    fontWeight: '400',
    fontSize: 17,
    color: 'rgba(255, 255, 255, 1)',
  },
  button_open: {
    width: 270,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  open_text: {
    fontWeight: '700',
    fontSize: 17,
    color: 'rgba(32, 32, 32, 1)',
  },
});
