import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [matricNum, setMatricNum] = useState('');
  const [image, setImage] = useState(null);
  const [moreInfo, setMoreInfo] = useState('');
  const [selected, setSelected] = useState(null);

  // Pick Image from Gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} className="mb-4 font-bold">
        {/* <MaterialIcons name="chevron-left" size={60} color="black" className="font-bold" /> */}
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      {/* Profile Image */}
      <View className="mb-6 items-center">
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} className="h-24 w-24 rounded-full" />
          ) : (
            <View className="h-24 w-24 items-center justify-center rounded-full bg-gray-300">
              <FontAwesome name="user" size={40} color="black" />
            </View>
          )}
        </TouchableOpacity>
        <Text className="mt-2 text-gray-500">Tap to change photo</Text>
      </View>

      {/* Input Fields */}
      <Text className="mb-2 text-lg text-gray-500">Full Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Full Name"
        className="mb-6 rounded-md border  border-gray-300 p-3"
      />

      <Text className="mb-2 text-lg text-gray-500">Matric Number</Text>
      <TextInput
        value={matricNum}
        onChangeText={setMatricNum}
        placeholder="Matric Number"
        className="mb-5 rounded-md border  border-gray-300 p-3"
      />

      <Text className="mb-2 text-lg text-gray-500">Resident Address or Hostel Info</Text>
      <TextInput
        value={moreInfo}
        onChangeText={setMoreInfo}
        placeholder="Room Number, Hostel Name, etc."
        className="mb-5 rounded-md border  border-gray-300 p-3"
      />

      <View className="">
        <Text className="mb-3 text-left text-lg text-gray-500">Location</Text>

        {/* Radio Buttons */}
        <View className="flex-row items-center justify-between">
          {/* Hostelite */}
          <TouchableOpacity
            className="mb-6 flex-row items-center"
            onPress={() => setSelected('hostelite')}>
            <View className="mr-2 h-5 w-5 items-center justify-center rounded-full border-2 border-gray-400">
              {selected === 'hostelite' && <View className="h-3 w-3 rounded-full bg-black" />}
            </View>
            <Text className="text-lg text-gray-500">Hostelite</Text>
          </TouchableOpacity>

          {/* Non-Hostelite */}
          <TouchableOpacity
            className="mb-6 flex-row items-center"
            onPress={() => setSelected('non-hostelite')}>
            <View className="mr-2 h-5 w-5 items-center justify-center rounded-full border-2 border-gray-400">
              {selected === 'non-hostelite' && <View className="h-3 w-3 rounded-full bg-black" />}
            </View>
            <Text className="text-lg text-gray-500">Non-Hostelite</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        onPress={() => alert('Profile Updated!')}
        className="mt-8 items-center rounded-md bg-black p-3">
        <Text className="text-lg text-white">Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
