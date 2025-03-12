import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

import CustomTextInput from '../components/CustomTextInput';
import BackButton from '../components/BackButton';
import ProfileImagePicker from '../components/ProfileImagePicker';
import RadioButton from '../components/RadioButton';
import SaveButton from '../components/SaveButton';

import { useUser } from '../context/UserContext';

export default function EditProfileScreen() {
  const { currentUser, setCurrentUser } = useUser();
  const navigation = useNavigation();

  const [name, setName] = useState(currentUser.fullName);
  const [matricNum, setMatricNum] = useState(currentUser.matricNumber);
  const [image, setImage] = useState(currentUser.profilePicture);
  const [moreInfo, setMoreInfo] = useState(currentUser.address);
  const [selected, setSelected] = useState(currentUser.locationType);

  const handleSave = () => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      fullName: name,
      matricNumber: matricNum,
      profilePicture: image,
      address: moreInfo,
      locationType: selected,
    }));

    Alert.alert('Success', 'Profile Updated Successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('Profile') },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 p-3">
      <BackButton screenName="Profile" />
      <ProfileImagePicker image={image} setImage={setImage} />

      <View className="p-3">
        <Text className="mb-2 text-lg text-gray-500">Full Name</Text>
        <CustomTextInput value={name} onChangeText={setName} placeholder="Full Name" />

        <Text className="mb-2 text-lg text-gray-500">Matric Number</Text>
        <CustomTextInput
          value={matricNum}
          onChangeText={setMatricNum}
          placeholder="Matric Number or Phone"
        />

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
      </View>

      <SaveButton onPress={handleSave} title="Save" />
    </SafeAreaView>
  );
}
