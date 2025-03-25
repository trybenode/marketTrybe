// import { useNavigation } from '@react-navigation/native';
// import * as ImagePicker from 'expo-image-picker';
// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import CustomHeader from '../components/CustomHeader';
// import CustomTextInput from '../components/CustomTextInput';
// import UserProfile from '../components/UserProfile';

// export default function KycScreen() {
//   const [fullName, setFullName] = useState('');
//   const [matricNumber, setMatricNumber] = useState('');
//   const [frontID, setFrontID] = useState(null);
//   const [backID, setBackID] = useState(null);
//   const [hasPermission, setHasPermission] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission Denied', 'You need to allow access to your photo library.');
//       } else {
//         setHasPermission(true);
//       }
//     })();
//   }, []);

//   const pickImage = async (setImage) => {
//     if (!hasPermission) {
//       Alert.alert('Permission Required', 'Please enable photo access in your settings.');
//       return;
//     }

//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ['images'],
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.canceled) {
//         setImage(result.assets[0].uri);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong while selecting the image.');
//     }
//   };

//   const handleSubmit = () => {
//     navigation.navigate('SuccessKyc');
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <CustomHeader
//         screenName="Profile"
//         title="Complete KYC Registration"
//         extraComponent={<UserProfile />}
//       />
//       <ScrollView className="mt-5 flex-1 p-3">
//         <View className="mt-2 p-2">
//           {/* Use CustomTextInput for Full Name */}
//           <CustomTextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} />

//           {/* Use CustomTextInput for Matric Number */}
//           <CustomTextInput
//             placeholder="Matric Number"
//             value={matricNumber}
//             onChangeText={setMatricNumber}
//           />

//           {/* Front ID Upload */}
//           <View className="w-full">
//             <TouchableOpacity
//               className="mb-2 w-full items-center rounded-md border border-gray-300 bg-white p-4"
//               onPress={() => pickImage(setFrontID)}>
//               <Text>{frontID ? 'Image Selected' : 'Choose Image'}</Text>
//             </TouchableOpacity>
//             {frontID && (
//               <Image source={{ uri: frontID }} className="mb-2 h-20 w-32 self-start rounded-md" />
//             )}
//             <Text className="mb-4 w-full text-xs text-red-500">
//               * Upload photo of front of ID card
//             </Text>
//           </View>

//           <View className="w-full">
//             <TouchableOpacity
//               className="mb-2 w-full items-center rounded-md border border-gray-300 bg-white p-4"
//               onPress={() => pickImage(setBackID)}>
//               <Text>{backID ? 'Image Selected' : 'Choose Image'}</Text>
//             </TouchableOpacity>
//             {backID && (
//               <Image source={{ uri: backID }} className="mb-2 h-20 w-32 self-start rounded-md" />
//             )}
//             <Text className="mb-6 w-full text-xs text-red-500">
//               * Upload photo of back of ID card
//             </Text>
//           </View>

//           <View className="w-full items-center">
//             <TouchableOpacity
//               className={`w-1/3 items-center justify-center rounded-md p-4 ${
//                 fullName && matricNumber && frontID && backID ? 'bg-[#2563eb]' : 'bg-gray-400'
//               }`}
//               onPress={handleSubmit}
//               disabled={!fullName || !matricNumber || !frontID || !backID}>
//               <Text className="text-xl font-bold text-white">Submit</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../firebaseConfig";

import CustomHeader from "../components/CustomHeader";
import CustomTextInput from "../components/CustomTextInput";
import UserProfile from "../components/UserProfile";

export default function KycScreen() {
  const [fullName, setFullName] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [frontID, setFrontID] = useState(null);
  const [backID, setBackID] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "You need to allow access to your photo library.");
      } else {
        setHasPermission(true);
      }
    })();
  }, []);

  const pickImage = async (setImage) => {
    if (!hasPermission) {
      Alert.alert("Permission Required", "Please enable photo access in your settings.");
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
      Alert.alert("Error", "Something went wrong while selecting the image.");
    }
  };

  const uploadImageToCloudinary = async (uri) => {
    const data = new FormData();
    data.append("file", {
      uri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    data.append("upload_preset", "Markettrybe"); // Replace with Cloudinary upload preset
    data.append("cloud_name", "dj21x4jnt"); // Replace with your Cloudinary cloud name
  
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dj21x4jnt/image/upload", {
        method: "POST",
        body: data,
      });
  
      const res = await response.json();
      if (res.secure_url) {
        return res.secure_url; // This is the image URL to store in Firebase
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new Error("Image upload failed.");
    }
  };
  

  const handleSubmit = async () => {
    if (!fullName || !matricNumber || !frontID || !backID) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        Alert.alert("Authentication Error", "Please log in first.");
        return;
      }

      // Upload images to Firebase Storage
      const frontIDUrl = await uploadImageToCloudinary(frontID);
      const backIDUrl = await uploadImageToCloudinary(backID);
      

      // Save KYC details to Firestore
      await addDoc(collection(db, "kycRequests"), {
        userId: user.uid,
        fullName,
        matricNumber,
        frontID: frontIDUrl,
        backID: backIDUrl,
        status: "pending",
        submittedAt: new Date(),
      });

      Alert.alert("Success", "Your KYC request has been submitted.", [
        { text: "OK", onPress: () => navigation.navigate("SuccessKyc") },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to submit KYC. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader screenName="Profile" title="Complete KYC Registration" extraComponent={<UserProfile />} />
      <ScrollView className="mt-5 flex-1 p-3">
        <View className="mt-2 p-2">
          <CustomTextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} />
          <CustomTextInput placeholder="Matric Number" value={matricNumber} onChangeText={setMatricNumber} />

          <View className="w-full">
            <TouchableOpacity className="mb-2 w-full items-center rounded-md border border-gray-300 bg-white p-4" onPress={() => pickImage(setFrontID)}>
              <Text>{frontID ? "Image Selected" : "Choose Image"}</Text>
            </TouchableOpacity>
            {frontID && <Image source={{ uri: frontID }} className="mb-2 h-20 w-32 self-start rounded-md" />}
            <Text className="mb-4 w-full text-xs text-red-500">* Upload photo of front of ID card</Text>
          </View>

          <View className="w-full">
            <TouchableOpacity className="mb-2 w-full items-center rounded-md border border-gray-300 bg-white p-4" onPress={() => pickImage(setBackID)}>
              <Text>{backID ? "Image Selected" : "Choose Image"}</Text>
            </TouchableOpacity>
            {backID && <Image source={{ uri: backID }} className="mb-2 h-20 w-32 self-start rounded-md" />}
            <Text className="mb-6 w-full text-xs text-red-500">* Upload photo of back of ID card</Text>
          </View>

          <View className="w-full items-center">
            <TouchableOpacity
              className={`w-1/3 items-center justify-center rounded-md p-4 ${
                fullName && matricNumber && frontID && backID ? "bg-[#2563eb]" : "bg-gray-400"
              }`}
              onPress={handleSubmit}
              disabled={!fullName || !matricNumber || !frontID || !backID || loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-xl font-bold text-white">Submit</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
