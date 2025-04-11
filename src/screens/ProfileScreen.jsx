import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import CustomProfileOption from '../components/CustomProfileOption';
import { useUser } from '../context/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Ensure this is correctly imported

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { currentUser } = useUser();

  const confirmSignOut = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: confirmSignOut },
    ]);
  };

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
            <Text className="mr-2 text-lg font-semibold">{currentUser.fullName || 'Guest'}</Text>

            {/* Show verification tick if user is verified */}
            {currentUser.isVerified && (
              <MaterialIcons name="verified" size={18} color="green" className="ml-1" />
            )}
          </View>

          {/* Email */}
          <Text className="text-gray-500">{currentUser.email || 'No email'}</Text>
        </View>
      </View>

      {/* Menu Options */}
      <View className="flex flex-col gap-6">
        <CustomProfileOption
          title="My Shop"
          onPress={() => navigation.navigate('MyShop')}
          iconName="shopping-store"
          iconType="Fontisto"
        />
        <CustomProfileOption
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
          iconName="user"
          iconType="FontAwesome"
        />

        {/* Render KYC Verification button only if user is NOT verified */}
        {!currentUser.isVerified && (
          <CustomProfileOption
            title="KYC Verification"
            onPress={() => navigation.navigate('Kyc')}
            iconName="verified-user"
            iconType="MaterialIcons"
          />
        )}

        <CustomProfileOption
          title="Contact Support"
          onPress={() => console.log('Contact Support')}
          iconName="support-agent"
          iconType="MaterialIcons"
        />
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity className="mt-6" onPress={handleSignOut}>
        <Text className="text-center text-red-600">Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
