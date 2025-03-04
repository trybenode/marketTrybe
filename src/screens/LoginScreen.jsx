import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className="w-4/5 rounded-lg bg-gray-300 p-6">
        <Text className="mb-4 text-center text-xl font-semibold">Log In</Text>

        <TextInput placeholder="Email" className="mb-3 rounded-md bg-white p-3" />

        <TextInput
          placeholder="Password"
          secureTextEntry
          className="mb-3 rounded-md bg-white p-3"
        />

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text className="mb-3 text-center text-blue-600">Don't have an account? Sign Up.</Text>
        </TouchableOpacity>

        <TouchableOpacity className="rounded-md bg-white p-3">
          <Text className="text-center font-semibold">Log In</Text>
        </TouchableOpacity>

        <View className="my-4 flex-row items-center justify-center">
          <View className="flex-1 border-b border-black"></View>
          <Text className="mx-3 text-gray-600">Or login with</Text>
          <View className="flex-1 border-b border-black"></View>
        </View>

        <View className="mt-3 flex-row justify-center space-x-6">
          <TouchableOpacity onPress={() => console.log('Google Login')}>
            <Image source={require('../../assets/google.png')} className="h-8 w-11" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Facebook Login')}>
            <Image source={require('../../assets/facebook.png')} className="h-8 w-8" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Apple Login')}>
            <Image source={require('../../assets/apple.png')} className="h-8 w-8" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
