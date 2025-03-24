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

import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, db } from '../../firebaseConfig';

export default function EditProfileScreen() {
  const { currentUser, setCurrentUser } = useUser();
  const navigation = useNavigation();

  const [name, setName] = useState(currentUser.fullName);
  const [matricNum, setMatricNum] = useState(currentUser.matricNumber);
  const [image, setImage] = useState(currentUser.profilePicture);
  const [moreInfo, setMoreInfo] = useState(currentUser.address);
  const [selected, setSelected] = useState(currentUser.locationType);
  const [loading, setLoading] = useState(false);
  // Function to upload image to Firebase Storage
  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
  
      // Extract file extension manually
      const fileExtension = uri.split('.').pop().toLowerCase() || "jpg";
  
      // Generate a unique filename
      const imageRef = ref(storage, `images/${Date.now()}.${fileExtension}`);
  
      // Upload the image
      const uploadTask = uploadBytesResumable(imageRef, blob);
  
      // Wait for upload completion
      await uploadTask;
  
      // Get and return the Download URL
      return getDownloadURL(uploadTask.snapshot.ref);
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };
  

  // Function to save updated profile data
  const handleSave = async () => {
    setLoading(true);
    try {
      let imageUrl = image; 

      // Check if a new image was selected
      if (image && image !== currentUser.profilePicture) {
        imageUrl = await uploadImage(image);
      }

      // Updated user data
      const updatedUserData = {
        fullName: name,
        matricNumber: matricNum,
        profilePicture: imageUrl,
        address: moreInfo,
        locationType: selected,
      };

      // Update Firestore with new data (using user's unique ID)
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, updatedUserData);

      // Update local state
      setCurrentUser((prevUser) => ({
        ...prevUser,
        ...updatedUserData,
      }));

      Alert.alert("Success", "Profile Updated Successfully!", [
        { text: "OK", onPress: () => navigation.navigate("Profile") },
      ]);
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <Customheader screenName="Profile" title="Edit Profile" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust as needed
          className="flex-1 p-3"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Profile Image Picker */}
            <ProfileImagePicker image={image} setImage={setImage} />

            {/* Inputs Section */}
            <View className="p-3">
              <Text className="mb-2 text-lg text-gray-500">Full Name</Text>
              <CustomTextInput value={name} onChangeText={setName} placeholder="Full Name" />

              <Text className="mb-2 text-lg text-gray-500">Matric Number</Text>
              <CustomTextInput
                value={matricNum}
                onChangeText={setMatricNum}
                placeholder="LCU/UG/XX/XXXX"
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
              <SaveButton onPress={handleSave} title="Save" loading={loading} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
