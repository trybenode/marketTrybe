import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

const ProfileImagePicker = ({ image, setImage }) => {
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
  );
};

export default ProfileImagePicker;
