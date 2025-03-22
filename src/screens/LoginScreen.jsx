import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Adjust path accordingly
import Toast from 'react-native-toast-message'; 

import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import SocialAuthButton from '../components/SocialAuthButton';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // for loading indicator
  // const { promptAsync } = useGoogleAuth();

  const handleLogin = async () => {
    // Start loading
    setLoading(true);
  
    // Validate fields
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill in both email and password.',
      });
      setLoading(false); // Stop loading
      return;
    }
  
    try {
      // Attempt to sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
  
      // Show success toast
      Toast.show({
        type: 'success',
        text1: 'Login Successful 🎉',
        text2: 'Welcome back!',
      });
  
      // Navigate to main screen
      navigation.navigate('MainTabs');
    } catch (err) {
      
  
      // Extract error code
      const errorCode = err.code;
  
      // Handle error cases using if...else if
      if (errorCode === 'auth/user-not-found') {
        Toast.show({
          type: 'error',
          text1: 'User Not Found',
          text2: 'No account exists with this email.',
        });
      } else if (errorCode === 'auth/wrong-password') {
        Toast.show({
          type: 'error',
          text1: 'Incorrect Password',
          text2: 'Password is incorrect. Please try again.',
        });
      } else if (errorCode === 'auth/invalid-email') {
        Toast.show({
          type: 'error',
          text1: 'Invalid Email',
          text2: 'Please enter a valid email address.',
        });
      } else if (errorCode === 'auth/invalid-credential') {
        Toast.show({
          type: 'error',
          text1: 'Invalid Credentials',
          text2: 'The email or password provided is incorrect.',
        });
      } else if (errorCode === 'auth/too-many-requests') {
        Toast.show({
          type: 'error',
          text1: 'Too Many Attempts',
          text2: 'Too many failed attempts. Please try again later.',
        });
      } else if (errorCode === 'auth/network-request-failed') {
        Toast.show({
          type: 'error',
          text1: 'Network Error',
          text2: 'Please check your internet connection and try again.',
        });
      } else {
        // Default unknown error
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: `Unexpected error: ${errorCode}`,
        });
      }
    } finally {
      // Stop loading regardless of outcome
      setLoading(false);
    }
  };
  


  const handleForgotPassword = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Missing Email',
        text2: 'Please enter your email first.',
      });
      return;
    }
  
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log("Error:", error.message); // Log error for debugging
    }
  
    // Show the same success message regardless of whether the email exists or not
    Toast.show({
      type: 'success',
      text1: 'Reset Email Sent!',
      text2: 'If this email is registered, you will receive reset instructions.',
    });
  };
  

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Logo */}
      <View className="my-auto p-8 shadow-md">
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
          placeholder="Password"
          secureTextEntry
          icon="lock"
          containerStyle="mt-4"
          value={password}
          onChangeText={setPassword}
          accessibilityLabel="Password Input"
        />

        {/* Forgot Password */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text className="mb-3 mt-1 text-left text-blue-600">
              Forgot Password? <Text className="font-bold">Reset</Text>
          </Text>
        </TouchableOpacity>


        {/* Login Button with Loading */}
        <CustomButton
          title={loading ? 'Logging in...' : 'Log In'}
          onPress={handleLogin}
          disabled={loading}
          containerStyle="mt-6"
          buttonStyle={`bg-blue-600 ${loading ? 'opacity-50' : ''}`}
          textStyle="text-white"
          accessibilityLabel="Login Button"
        />

        {/* OR Divider */}
        <View className="my-6 flex-row items-center" accessibilityLabel="OR Divider">
          <View className="flex-1 border-b border-gray-300" />
          <Text className="mx-3 text-gray-500">Or</Text>
          <View className="flex-1 border-b border-gray-300" />
        </View>

        {/* Social Auth Button */}
        <TouchableOpacity
          className="flex-row border items-center self-center border-gray-300 justify-center p-2 rounded-lg gap-2 w-4/5"
          accessibilityLabel="Social Login Buttons" onPress={() => console.log("Hey Google")}
        >
          <SocialAuthButton
            name="google"
            type="FontAwesome"
            iconColor="#DB4437"
            accessibilityLabel="Google Login Button"
          />
          <Text className="text-grey-700">Sign in with Google</Text>
          
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="mt-8 items-center" accessibilityLabel="Sign Up Section">
          <Text className="text-gray-600">Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            accessibilityLabel="Sign Up Link"
          >
            <Text className="text-blue-600 font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}
