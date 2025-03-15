import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import SocialAuthButton from '../components/SocialAuthButton';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // const handleSignUp = () => {
  //   // Basic validation
  //   if (!email || !number || !password) {
  //     setError('Please fill in all fields');
  //     return;
  //   }

  //   // Proceed with sign-up logic or API call here

  //   // On success:
  //   setError('');
  //   navigation.navigate('MainTabs');
  // };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Logo and Header */}
      <View className="my-auto p-8 shadow-md">
        <View className="items-center">
          <Image
            source={require('../assets/logo.png')}
            className="h-20 w-20"
            resizeMode="contain"
            accessibilityLabel="App Logo"
          />
          <Text className="mt-4 text-2xl font-bold text-gray-800">Create an Account</Text>
          <Text className="my-4 text-gray-500">Sign up to get started</Text>
        </View>

        {/* Error Message */}
        {error && (
          <Text className="mt-4 text-center text-red-500" accessibilityLabel="Error Message">
            {error}
          </Text>
        )}

        {/* Input Fields */}
        <CustomTextInput
          placeholder="Email"
          containerStyle="mt-6"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          accessibilityLabel="Email Input"
        />
        <CustomTextInput
          placeholder="Number"
          containerStyle="mt-4"
          value={number}
          onChangeText={setNumber}
          keyboardType="numeric"
          accessibilityLabel="Number Input"
        />
        <CustomTextInput
          placeholder="Password"
          secureTextEntry
          icon="lock"
          containerStyle="mt-4"
          value={password}
          onChangeText={setPassword}
          accessibilityLabel="Password Input"
        />

        {/* Already have an account */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          accessibilityLabel="Login Link">
          <Text className="mt-1 mb-3 text-left text-blue-600">Already have an account? Login.</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <CustomButton
          title="Sign Up"
          onPress={() => navigation.navigate('MainTabs')}
          // onPress={handleSignUp}
          containerStyle="mt-6"
          buttonStyle="bg-blue-600"
          textStyle="text-white"
          accessibilityLabel="Sign Up Button"
        />

        {/* OR Divider */}
        <View className="my-6 flex-row items-center" accessibilityLabel="OR Divider">
          <View className="flex-1 border-b border-gray-300" />
          <Text className="mx-3 text-gray-500">Or</Text>
          <View className="flex-1 border-b border-gray-300" />
        </View>

        {/* Social Authentication Buttons */}
        <View
          className="flex-row justify-center gap-2 space-x-4"
          accessibilityLabel="Social Sign Up Buttons">
          <SocialAuthButton
            name="google"
            type="FontAwesome"
            iconColor="#DB4437"
            onPress={() => console.log('Google Sign-up')}
            accessibilityLabel="Google Sign Up Button"
          />
          <SocialAuthButton
            name="facebook"
            type="FontAwesome"
            iconColor="#1877F2"
            onPress={() => console.log('Facebook Sign-up')}
            accessibilityLabel="Facebook Sign Up Button"
          />
          <SocialAuthButton
            name="logo-apple"
            type="Ionicons"
            iconColor="black"
            onPress={() => console.log('Apple Sign-up')}
            accessibilityLabel="Apple Sign Up Button"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
