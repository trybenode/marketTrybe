import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import SocialAuthButton from '../components/SocialAuthButton';

export default function SignUpScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className="w-4/5 rounded-lg bg-gray-300 p-6">
        <Text className="mb-4 text-center text-xl font-semibold">Sign-up</Text>

        <CustomTextInput placeholder="Email" />
        <CustomTextInput placeholder="Number" keyboardType="numeric" />
        <CustomTextInput placeholder="Password" secureTextEntry />

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="mb-3 text-left text-blue-600">Already have an account? Login.</Text>
        </TouchableOpacity>

        <CustomButton title="Sign-up" onPress={() => navigation.navigate('Profile')} />

        <View className="my-4 flex-row items-center justify-center">
          <View className="flex-1 border-b border-black"></View>
          <Text className="mx-3 text-gray-600">Or sign up with</Text>
          <View className="flex-1 border-b border-black"></View>
        </View>

        <View className="mt-3 flex-row justify-center gap-2 space-x-6">
          <SocialAuthButton
            name="google"
            type="FontAwesome"
            color="#DB4437"
            onPress={() => console.log('Google Sign-up')}
          />
          <SocialAuthButton
            name="facebook"
            type="FontAwesome"
            color="#1877F2"
            onPress={() => console.log('Facebook Sign-up')}
          />
          <SocialAuthButton
            name="logo-apple"
            type="Ionicons"
            color="black"
            onPress={() => console.log('Apple Sign-up')}
          />
        </View>
      </View>
    </View>
  );
}
