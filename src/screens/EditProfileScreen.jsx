import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);

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
      <Text className="text-black-400 mb-2 text-xl">Full Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        className="mb-10 rounded-md border  border-gray-300 p-3"
      />

      <Text className="text-black-400 mb-2 text-xl">Phone Number</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        className="mb-5 rounded-md border  border-gray-300 p-3"
      />

      {/* Save Button */}
      <TouchableOpacity
        onPress={() => alert('Profile Updated!')}
        className="items-center rounded-md bg-black p-4">
        <Text className="text-xl font-bold text-white">Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
