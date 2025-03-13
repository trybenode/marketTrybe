import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';
import CustomProfileOption from '../components/CustomProfileOption';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const { currentUser } = useUser();

  return (
    <SafeAreaView className="flex-1 gap-12 bg-white p-6">
      {/* Profile Info */}
      <View className="mb-10 mt-8 flex flex-row items-center">
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
        <View className="ml-4">
          <Text className="text-lg font-semibold">{currentUser.fullName}</Text>
          <Text className="text-gray-500">{currentUser.email}</Text>
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
        <CustomProfileOption
          title="KYC Verification"
          onPress={() => navigation.navigate('Kyc')}
          iconName="verified-user"
          iconType="MaterialIcons"
        />
        <CustomProfileOption
          title="Contact Support"
          onPress={() => console.log('Contact Support')}
          iconName="support-agent"
          iconType="MaterialIcons"
        />
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity className="mt-6" onPress={() => navigation.navigate('Login')}>
        <Text className="text-center text-red-600">Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
