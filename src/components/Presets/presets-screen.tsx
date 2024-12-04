import {
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUser} from '../../user';
import {useEffect, useState} from 'react';

interface PresetsProps {
  setScreen: (value: ((prevState: string) => string) | string) => void;
}

export const Presets = ({setScreen}: PresetsProps) => {
  const {user, saveUser} = useUser();
  const [isActive, setIsActive] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleButtonPress = (item: string) => {
    setIsActive(prevState => (prevState === item ? null : item));
  };
  const handleDelete = (itemTitle: string) => {
    const updatedSaved = user?.saved.filter(item => item.title !== itemTitle);
    saveUser({...user, saved: updatedSaved});
    setModalVisible(false);
  };
  const confirmDelete = (itemTitle: string) => {
    setItemToDelete(itemTitle); // Зберігаємо елемент, який хочемо видалити
    setModalVisible(true); // Відкриваємо модальне вікно
  };
  useEffect(() => {
    console.log('User saved data:', user?.saved);
  }, [user]);

  const hanldeSpin = (item: {title: string; variant: any[]}) => {
    saveUser({...user, selectedItem: item});
    setScreen('decision');
  };

  return (
    <View style={styles.container}>
      {(user?.saved || []).map((item, index) => (
        <View style={styles.button_container} key={index}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => handleButtonPress(item.title)}
            style={[
              styles.itemButton,
              isActive === item.title && styles.activeItemButton, // Застосовується тільки для активного елемента
            ]}>
            <SafeAreaView style={styles.textContainer}>
              <Text>{item.title}</Text>
              <Text>{item.variant.join(' - ')}</Text>
            </SafeAreaView>
            <TouchableOpacity onPress={() => hanldeSpin(item)}>
              <ImageBackground
                style={styles.spinButton}
                source={require('../../asstes/spin_button.png')}>
                <Text style={{color: 'white'}}>Spin</Text>
              </ImageBackground>
            </TouchableOpacity>
          </TouchableOpacity>
          {isActive === item.title && (
            <TouchableOpacity
              onPress={() => confirmDelete(item.title)}
              style={styles.button_delete}>
              <Image source={require('../../asstes/icons/delete.png')} />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure want to delete?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => itemToDelete && handleDelete(itemToDelete)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 20,
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  itemButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 312,
    height: 84,
    backgroundColor: 'white',
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  textContainer: {
    gap: 14,
  },
  spinButton: {
    width: 88,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeItemButton: {
    marginLeft: -50, // Стиль для активного елемента
  },
  button_delete: {
    marginLeft: -13,
    width: 50,
    height: 84,
    borderBottomRightRadius: 14,
    borderTopRightRadius: 14,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    paddingTop: 20,
    backgroundColor: 'rgba(179, 179, 179, 0.82)',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    height: 44,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: 'rgba(128, 128, 128, 0.55)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.55)',
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(128, 128, 128, 0.55)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.55)',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
