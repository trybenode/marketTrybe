import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig'; 

import Toast from 'react-native-toast-message'; // for displaying Flash Messages 

import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import SocialAuthButton from '../components/SocialAuthButton';
import { setDoc, collection, doc } from 'firebase/firestore';

export default function SignUpScreen() {
  const navigation = useNavigation();

  // Form states
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // For loading indicator

  const handleSignUp = async () => {
    setLoading(true);

    // Basic validation
    if (!email || !number || !password) {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Fields',
        text2: 'Please fill in all fields to continue.',
      });
      setLoading(false);
      return;
    }

    try {
      // Firebase Sign Up
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);

      // Show success flash message
      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'Sign up successful! Please login to continue.',
      });

        if (userCredential.user) {
          const userRef = doc(db, 'users', userCredential.user.uid);
          
          await setDoc(userRef, {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            number: number,
          });
        console.log('Document written with ID: ', userRef.id);
      }

      // Redirect to Login Screen after short delay for user to read message
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000); // 2 seconds delay before navigating
    } catch (err) {
      console.error('Sign up error:', err.message);

      // Handle Firebase error messages gracefully using toast
      if (err.code === 'auth/email-already-in-use') {
        Toast.show({
          type: 'error',
          text1: 'Email Already Used',
          text2: 'This email is already registered. Please login or use another email.',
        });
      } else if (err.code === 'auth/invalid-email') {
        Toast.show({
          type: 'error',
          text1: 'Invalid Email',
          text2: 'Please enter a valid email address.',
        });
      } else if (err.code === 'auth/weak-password') {
        Toast.show({
          type: 'error',
          text1: 'Weak Password',
          text2: 'Password should be at least 6 characters.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Sign Up Failed',
          text2: 'Something went wrong. Please try again.',
        });
      }
    } finally {
      setLoading(false); // Stop loading when done
    }
  };

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
          <Text className="mb-3 mt-1 text-left text-blue-600">Already have an account? Login.</Text>
        </TouchableOpacity>

        {/* Sign Up Button with Loading Indicator */}
        <CustomButton
          title={loading ? 'Signing up...' : 'Sign Up'}
          onPress={handleSignUp}
          disabled={loading}
          containerStyle="mt-6"
          buttonStyle={`bg-blue-600 ${loading ? 'opacity-50' : ''}`}
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
