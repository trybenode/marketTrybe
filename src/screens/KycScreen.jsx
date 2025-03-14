import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../components/CustomTextInput';
import CustomHeader from '../components/CustomHeader';
import UserProfile from '../components/UserProfile';

export default function KycScreen() {
  const [fullName, setFullName] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [frontID, setFrontID] = useState(null);
  const [backID, setBackID] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const navigation = useNavigation();

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
      const result = await ImagePicker.launchImageLibraryAsync({
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
    navigation.navigate('SuccessKyc');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader
        screenName="Profile"
        title="Complete KYC Registration"
        extraComponent={<UserProfile />}
      />
      <ScrollView className="mt-5 flex-1 p-3">
        <View className="mt-2 p-2">
          {/* Use CustomTextInput for Full Name */}
          <CustomTextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} />

          {/* Use CustomTextInput for Matric Number */}
          <CustomTextInput
            placeholder="Matric Number"
            value={matricNumber}
            onChangeText={setMatricNumber}
          />

          {/* Front ID Upload */}
          <View className="w-full">
            <TouchableOpacity
              className="mb-2 w-full items-center rounded-md border border-gray-300 bg-white p-4"
              onPress={() => pickImage(setFrontID)}>
              <Text>{frontID ? 'Image Selected' : 'Choose Image'}</Text>
            </TouchableOpacity>
            {frontID && (
              <Image source={{ uri: frontID }} className="mb-2 h-20 w-32 self-start rounded-md" />
            )}
            <Text className="mb-4 w-full text-xs text-red-500">
              * Upload photo of front of ID card
            </Text>
          </View>

          <View className="w-full">
            <TouchableOpacity
              className="mb-2 w-full items-center rounded-md border border-gray-300 bg-white p-4"
              onPress={() => pickImage(setBackID)}>
              <Text>{backID ? 'Image Selected' : 'Choose Image'}</Text>
            </TouchableOpacity>
            {backID && (
              <Image source={{ uri: backID }} className="mb-2 h-20 w-32 self-start rounded-md" />
            )}
            <Text className="mb-6 w-full text-xs text-red-500">
              * Upload photo of back of ID card
            </Text>
          </View>

          <View className="w-full items-center">
            <TouchableOpacity
              className={`w-1/3 items-center justify-center rounded-md p-4 ${
                fullName && matricNumber && frontID && backID ? 'bg-[#2563eb]' : 'bg-gray-400'
              }`}
              onPress={handleSubmit}
              disabled={!fullName || !matricNumber || !frontID || !backID}>
              <Text className="text-xl font-bold text-white">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

