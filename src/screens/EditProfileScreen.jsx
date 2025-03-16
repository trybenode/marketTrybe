import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Customheader from '../components/CustomHeader';
import CustomTextInput from '../components/CustomTextInput';
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
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <Customheader screenName="Profile" title="Edit Profile" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust as needed for nav/header
          className="flex-1 p-3">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            keyboardShouldPersistTaps="handled" // Dismiss keyboard when tapping outside input
          >
            {/* Profile Image */}
            <ProfileImagePicker image={image} setImage={setImage} />

            {/* Inputs Section */}
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
              <View className="mb-2 flex-row items-center justify-between">
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

            {/* Save Button */}
            <View className="mt-0">
              <SaveButton onPress={handleSave} title="Save" />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
