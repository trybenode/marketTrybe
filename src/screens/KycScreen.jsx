import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

export default function KycScreen() {
  const [fullName, setFullName] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [frontID, setFrontID] = useState(null);
  const [backID, setBackID] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to allow access to your photo library.');
      } else {
        setHasPermission(true);
      }
    })();
  }, []);

  const pickImage = async (setImage) => {
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Please enable photo access in your settings.');
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while selecting the image.');
    }
  };

  const handleSubmit = () => {
    if (!fullName || !matricNumber || !frontID || !backID) {
      Alert.alert('Incomplete Form', 'Please fill in all fields and upload both images.');
      return;
    }
    Alert.alert('Success', 'KYC details submitted successfully!');
  };

  return (
    <View className="flex-1 bg-white p-5 pt-20">
      <Text className="mb-5 text-center text-xl font-bold">Complete KYC Registration</Text>

      <TextInput
        className="mb-4 rounded-md border border-gray-300 p-3"
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        className="mb-4 rounded-md border border-gray-300 p-3"
        placeholder="Matric Number"
        value={matricNumber}
        onChangeText={setMatricNumber}
      />

      {/* Front ID Upload */}
      <TouchableOpacity
        className="mb-2 items-center rounded-md border border-gray-300 p-3"
        onPress={() => pickImage(setFrontID)}>
        <Text>{frontID ? 'Image Selected' : 'Choose Image'}</Text>
      </TouchableOpacity>
      {frontID && <Image source={{ uri: frontID }} className="mb-2 h-20 w-32 rounded-md" />}
      <Text className="mb-4 text-xs text-red-500">* Upload photo of front of ID card</Text>

      {/* Back ID Upload */}
      <TouchableOpacity
        className="mb-2 items-center rounded-md border border-gray-300 p-3"
        onPress={() => pickImage(setBackID)}>
        <Text>{backID ? 'Image Selected' : 'Choose Image'}</Text>
      </TouchableOpacity>
      {backID && <Image source={{ uri: backID }} className="mb-2 h-20 w-32 rounded-md" />}
      <Text className="mb-4 text-xs text-red-500">* Upload photo of back of ID card</Text>

      <TouchableOpacity
        className={`items-center rounded-md p-4 ${fullName && matricNumber && frontID && backID ? 'bg-black' : 'bg-gray-400'}`}
        onPress={handleSubmit}
        disabled={!fullName || !matricNumber || !frontID || !backID}>
        <Text className="text-xl font-bold text-white">Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
