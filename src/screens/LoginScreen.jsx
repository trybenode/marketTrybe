import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import SocialAuthButton from '../components/SocialAuthButton';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // const handleLogin = () => {
  //   // Basic validation
  //   if (!email || !password) {
  //     setError('Please fill in all fields');
  //     return;
  //   }

  //   // Simulate login logic
  //   if (email === 'user@example.com' && password === 'password') {
  //     setError('');
  //     navigation.navigate('MainTabs');
  //   } else {
  //     setError('Invalid email or password');
  //   }
  // };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Logo */}
      <View className="my-auto  p-8  shadow-md">
        <View className="items-center">
          <Image
            source={require('../assets/logo.png')}
            className="h-20 w-20"
            resizeMode="contain"
            accessibilityLabel="App Logo"
          />
          <Text className="mt-4 text-2xl font-bold text-gray-800">Welcome Back</Text>
          <Text className="my-4 text-gray-500">Log in to continue</Text>
        </View>

        {/* Error Message */}
        {error && (
          <Text className="mt-4 text-center text-red-500" accessibilityLabel="Error Message">
            {error}
          </Text>
        )}

        {/* Reusable Text Inputs */}
        <CustomTextInput
          placeholder="Email"
          containerStyle="mt-6"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          accessibilityLabel="Email Input"
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

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() => console.log('Reset Password Clicked!')}
          accessibilityLabel="Forgot Password Link">
          <Text className="mt-1 mb-3 text-left text-blue-600">Forgot Password? Reset</Text>
        </TouchableOpacity>

        {/* Reusable Login Button */}
        <CustomButton
          title="Log In"
          onPress={() => navigation.navigate('MainTabs')}
          containerStyle="mt-6"
          buttonStyle="bg-blue-600"
          textStyle="text-white"
          accessibilityLabel="Login Button"
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
          accessibilityLabel="Social Login Buttons">
          <SocialAuthButton
            name="google"
            type="FontAwesome"
            iconColor="#DB4437"
            onPress={() => console.log('Google Login')}
            accessibilityLabel="Google Login Button"
          />
          <SocialAuthButton
            name="facebook"
            type="FontAwesome"
            iconColor="#1877F2"
            onPress={() => console.log('Facebook Login')}
            accessibilityLabel="Facebook Login Button"
          />
          <SocialAuthButton
            name="logo-apple"
            type="Ionicons"
            iconColor="black"
            onPress={() => console.log('Apple Login')}
            accessibilityLabel="Apple Login Button"
          />
        </View>

        {/* Sign Up Link */}
        <View className="mt-8 items-center" accessibilityLabel="Sign Up Section">
          <Text className="text-gray-600">Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            accessibilityLabel="Sign Up Link">
            <Text className="text-blue-600">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
