import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUser} from '../../user';

interface AddTouchesProps {
  setAddItem: (value: ((prevState: boolean) => boolean) | boolean) => void;
  setScreen: (value: ((prevState: string) => string) | string) => void;
}

export const AddTouches = ({setAddItem, setScreen}: AddTouchesProps) => {
  const {user, saveUser} = useUser();
  const [variants, setVariants] = useState(['', '']); // Початково два інпути
  const [title, setTitle] = useState('');

  const GoBack = () => {
    setAddItem(false);
  };

  const handleAddVariant = () => {
    if (variants.length < 4) {
      setVariants([...variants, '']); // Додаємо новий порожній варіант
    }
  };

  const handleVariantChange = (text: string, index: number) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = text; // Оновлюємо значення варіанта
    setVariants(updatedVariants);
  };

  const handleRemoveVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index); // Видаляємо варіант
    setVariants(updatedVariants);
  };

  const handleSave = () => {
    setScreen('presets');
    if (!title.trim() || variants.some(variant => !variant.trim())) {
      console.warn('Please fill in all fields before saving!');
      return;
    }
    const newSavedItem = {title, variant: variants};
    saveUser({...user, saved: [...(user?.saved || []), newSavedItem]});
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.back_and_text}>
        <TouchableOpacity onPress={GoBack}>
          <Image source={require('../../asstes/icons/back.png')} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>New ParTouch</Text>
        <Text style={{width: 8}} />
      </SafeAreaView>
      <SafeAreaView style={styles.inputTitle}>
        <Text>Title:</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Type here"
          style={styles.titleInput}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.inputs_variant_container}>
        <ScrollView
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}>
          {variants.map((variant, index) => (
            <SafeAreaView key={index} style={styles.input_variant}>
              <TouchableOpacity onPress={() => handleRemoveVariant(index)}>
                <Image
                  source={require('../../asstes/icons/delete_input.png')}
                />
              </TouchableOpacity>
              <TextInput
                placeholder={`Variant ${index + 1}`}
                value={variant}
                onChangeText={text => handleVariantChange(text, index)}
                style={styles.variantInput}
              />
            </SafeAreaView>
          ))}
        </ScrollView>
        {variants.length < 4 && (
          <TouchableOpacity
            style={styles.add_button_variant}
            onPress={handleAddVariant}>
            <Image source={require('../../asstes/icons/add_input.png')} />
            <Text>Add variant</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
      <TouchableOpacity
        onPress={handleSave}
        style={[
          styles.save_button,
          {
            backgroundColor:
              !title.trim() || variants.some(variant => !variant.trim())
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(255, 255, 255, 1)',
          },
        ]}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  back_and_text: {
    width: 312,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textHeader: {
    fontSize: 26,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
  inputTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    width: 312,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 14,
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  inputs_variant_container: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
    height: 200,
  },
  input_variant: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240, 240, 240, 1)',
    gap: 12,
    marginBottom: 10,
  },
  variantInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  add_button_variant: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  save_button: {
    marginTop: 20,
    width: 312,
    height: 56,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
