import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';

import Toast from 'react-native-toast-message'; // for displaying Flash Messages

import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import SocialAuthButton from '../components/SocialAuthButton';
import { setDoc, doc } from 'firebase/firestore';

export default function SignUpScreen() {
  const navigation = useNavigation();

  // Form states
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // For loading indicator

  const handleSignUp = async () => {
    setLoading(true);

    // Basic validation
    if (!email || !fullName || !password) {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Fields',
        text2: 'Please fill in all fields to continue.',
      });
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address.',
      });
      setLoading(false);
      return;
    }

    try {
      // Firebase Sign Up
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Show success message
      // console.log("User registered:", user);

      // Send verification email
      await sendEmailVerification(user);
      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'A verification email has been sent. Please verify your email.',
      });

      // Store user data in Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        fullName: fullName,
        isVerified: false, // KYC verification
        emailVerified: false, // Track email verification
        createdAt: new Date().toISOString(),
      });

      // console.log("User document created with ID:", user.uid);

      // Show success message
      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'A verification email has been sent. Please verify your email.',
      });

      // Log user out after sign-up to force email verification
      setTimeout(async () => {
        await auth.signOut();
        navigation.navigate('Login');
      }, 3000); // Delay before navigating
    } catch (err) {
      console.error('Sign up error:', err.message);

      // Handle Firebase error messages
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
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      const user = userCredential.user;

      // Store user in Firestore
      // const userRef = doc(db, 'users', user.uid);
      // await setDoc(
      //   userRef,
      //   {
      //     uid: user.uid,
      //     email: user.email,
      //     fullName: user.displayName,
      //     emailVerified: user.emailVerified,
      //     isVerified: true,
      //     createdAt: new Date().toISOString(),
      //   },
      //   { merge: true }
      // );

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: `Welcome ${user.displayName}`,
      });

      // Navigate to home
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Google Sign-In Failed',
        text2: error.message || 'Something went wrong',
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Logo and Header */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-auto px-8 shadow-md">
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
            placeholder="Full Name"
            containerStyle="mt-4"
            value={fullName}
            onChangeText={setFullName}
            keyboardType="default"
            accessibilityLabel="Full Name Input"
          />
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
            containerStyle="mt-4"
            value={password}
            onChangeText={setPassword}
            accessibilityLabel="Password Input"
          />

          {/* Already have an account */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            accessibilityLabel="Login Link">
            <Text className="mb-3 mt-1 text-left text-blue-600">
              Already have an account? Login.
            </Text>
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
          <TouchableOpacity
            className="w-4/5 flex-row items-center justify-center gap-2 self-center rounded-lg border border-gray-300 p-2"
            accessibilityLabel="Social Login Buttons"
            onPress={() => handleGoogleLogin()}>
            <SocialAuthButton
              name="google"
              type="FontAwesome"
              iconColor="#DB4437"
              accessibilityLabel="Google Login Button"
            />
            <Text className="text-grey-700">Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
