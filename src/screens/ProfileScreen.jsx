import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import CustomProfileOption from "../components/CustomProfileOption";
import { useUser } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Ensure this is correctly imported

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { currentUser } = useUser();
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  const confirmSignOut = async () => {
    try {
      await signOut(auth);
      setModalVisible(false); // Close modal after sign-out
      navigation.replace("Login"); // Ensure user cannot go back after sign-out
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  // Show an activity indicator while currentUser is still being fetched
  if (!currentUser) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="blue" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 gap-12 bg-white p-6">
      {/* Profile Info */}
      <View className="mb-10 mt-8 flex flex-row items-center">
        {/* Profile Picture */}
        <View className="h-16 w-16 items-center justify-center rounded-full bg-gray-300">
          {currentUser.profilePicture ? (
            <Image
              source={{ uri: currentUser.profilePicture }}
              className="h-16 w-16 rounded-full"
            />
          ) : (
            <FontAwesome name="user" size={40} color="black" />
          )}
        </View>

        {/* User Info */}
        <View className="ml-4">
          <View className="flex-row items-center">
            <Text className="text-lg font-semibold mr-2">
              {currentUser.fullName || "Guest"}
            </Text>

            {/* Show verification tick if user is verified */}
            {currentUser.isVerified && (
              <MaterialIcons
                name="verified"
                size={18}
                color="green"
                className="ml-1"
              />
            )}
          </View>

          {/* Email */}
          <Text className="text-gray-500">{currentUser.email || "No email"}</Text>
        </View>
      </View>

      {/* Menu Options */}
      <View className="flex flex-col gap-6">
        <CustomProfileOption
          title="My Shop"
          onPress={() => navigation.navigate("MyShop")}
          iconName="shopping-store"
          iconType="Fontisto"
        />
        <CustomProfileOption
          title="Edit Profile"
          onPress={() => navigation.navigate("EditProfile")}
          iconName="user"
          iconType="FontAwesome"
        />

        {/* Render KYC Verification button only if user is NOT verified */}
        {!currentUser.isVerified && (
          <CustomProfileOption
            title="KYC Verification"
            onPress={() => navigation.navigate("Kyc")}
            iconName="verified-user"
            iconType="MaterialIcons"
          />
        )}

        <CustomProfileOption
          title="Contact Support"
          onPress={() => console.log("Contact Support")}
          iconName="support-agent"
          iconType="MaterialIcons"
        />
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity className="mt-6" onPress={() => setModalVisible(true)}>
        <Text className="text-center text-red-600">Sign Out</Text>
      </TouchableOpacity>

      {/* Logout Confirmation Modal */}
      <Modal
      animationType="fade" // Changed from 'slide' to 'fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/20"> 
          {/* Light black transparent background (20% opacity) */}
          <View className="bg-white p-6 rounded-lg shadow-lg w-80 border border-gray-300">
            <Text className="text-lg font-semibold text-center mb-4">
              Are you sure you want to log out?
            </Text>

            {/* Buttons */}
            <View className="flex-row justify-around">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                <Text className="text-gray-700">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmSignOut}
                className="px-4 py-2 bg-red-600 rounded-lg"
              >
                <Text className="text-white">Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


    </SafeAreaView>
  );
}
