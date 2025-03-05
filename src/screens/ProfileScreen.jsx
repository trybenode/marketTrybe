import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import CustomProfileOption from '../components/CustomProfileOption';

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 gap-12 bg-white p-6">
      {/* Profile Info */}
      <View className="mb-10 mt-12 flex flex-row items-center">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-gray-300">
          <FontAwesome name="user" size={40} color="black" />
        </View>
        <View className="ml-4">
          <Text className="text-lg font-semibold">Douglas Allen</Text>
          <Text className="text-gray-500">allenissabigboi@gmail.com</Text>
        </View>
      </View>

      {/* Menu Options */}
      <View className="flex flex-col gap-6">
        <CustomProfileOption
          title="Edit Profile"
          onPress={() => console.log('Edit Profile')}
          iconName="user"
          iconType="FontAwesome"
        />

        <CustomProfileOption
          title="KYC Verification"
          onPress={() => console.log('KYC Verification')}
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
    </View>
  );
}
