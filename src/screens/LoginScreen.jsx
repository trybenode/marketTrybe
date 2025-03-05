import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import SocialAuthButton from '../components/SocialAuthButton';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className="w-4/5 rounded-lg bg-gray-300 p-6">
        <Text className="mb-6 text-center text-xl font-semibold">Log In</Text>

        {/* Reusable Text Inputs */}
        <CustomTextInput placeholder="Email" />
        <CustomTextInput placeholder="Password" secureTextEntry />

        {/* Navigate to Reset PPassword */}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text className="mb-4 text-left text-blue-600">Forgot Password? Reset.</Text>
        </TouchableOpacity>

        {/* Reusable Login Button */}

        <CustomButton title="Log In" onPress={() => navigation.navigate('MainTabs')} />

        {/* OR Divider */}
        <View className="my-4 flex-row items-center justify-center">
          <View className="flex-1 border-b border-black" />
          <Text className="mx-3 text-gray-600">Or login with</Text>
          <View className="flex-1 border-b border-black" />
        </View>

        {/* Social Authentication Buttons */}
        <View className="mt-3 flex-row justify-center gap-2 space-x-6">
          <SocialAuthButton
            name="google"
            type="FontAwesome"
            color="#DB4437"
            onPress={() => console.log('Google Login')}
          />
          <SocialAuthButton
            name="facebook"
            type="FontAwesome"
            color="#1877F2"
            onPress={() => console.log('Facebook Login')}
          />
          <SocialAuthButton
            name="logo-apple"
            type="Ionicons"
            color="black"
            onPress={() => console.log('Apple Login')}
          />
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="mt-8 text-center text-blue-600">New Member? Sign Up.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
