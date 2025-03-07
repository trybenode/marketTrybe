import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../components/CustomTextInput';
import BackButton from '../components/BackButton';
import ProfileImagePicker from '../components/ProfileImagePicker';
import RadioButton from '../components/RadioButton';
import SaveButton from '../components/SaveButton';

export default function EditProfileScreen() {
  const [name, setName] = useState('');
  const [matricNum, setMatricNum] = useState('');
  const [image, setImage] = useState(null);
  const [moreInfo, setMoreInfo] = useState('');
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <BackButton />
      <ProfileImagePicker image={image} setImage={setImage} />

      <Text className="mb-2 text-lg text-gray-500">Full Name</Text>
      <CustomTextInput value={name} onChangeText={setName} placeholder="Full Name" />

      <Text className="mb-2 text-lg text-gray-500">Matric Number</Text>
      <CustomTextInput value={matricNum} onChangeText={setMatricNum} placeholder="Matric Number" />

      {/* Location Selection */}
      <Text className="mb-3 text-left text-lg text-gray-500">Location</Text>
      <View className="flex-row items-center justify-between">
        <RadioButton
          label="Hostelite"
          selected={selected === 'hostelite'}
          onPress={() => setSelected('hostelite')}
        />
        <RadioButton
          label="Non-Hostelite"
          selected={selected === 'non-hostelite'}
          onPress={() => setSelected('non-hostelite')}
        />
      </View>

      <Text className="mb-2 text-lg text-gray-500">More Information</Text>
      <CustomTextInput
        value={moreInfo}
        onChangeText={setMoreInfo}
        placeholder="Room Number, Hostel Name, etc."
      />

      <SaveButton onPress={() => alert('Profile Updated!')} />
    </SafeAreaView>
  );
}
