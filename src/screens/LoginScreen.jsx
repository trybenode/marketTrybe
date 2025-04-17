import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import SocialAuthButton from '../components/SocialAuthButton';
import useUserStore from '../store/userStore';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    // Validate fields
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill in both email and password.',
      });
      setLoading(false);
      return;
    }

    try {
      // Attempt to sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if email is verified AFTER login
      if (!user.emailVerified) {
        Toast.show({
          type: 'error',
          text1: 'Email Not Verified',
          text2: 'Please check your email and verify your account before logging in.',
        });

        await auth.signOut();
        setLoading(false);
        return;
      }

      // Show success toast
      console.log('User email verified:', user.emailVerified);

      Toast.show({
        type: 'success',
        text1: 'Login Successful 🎉',
        text2: 'Welcome back!',
      });

      // Change this line to use the proper async method
      await useUserStore.getState().setUser({
        id: user.uid,
        email: user.email,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });

    } catch (err) {
      console.error('Login error:', err.message);

      // Extract error code
      const errorCode = err.code;
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Loading State:', loading);
      // Handle Firebase authentication errors
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
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: `Unexpected error: ${errorCode}`,
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
  

  // const handleGoogleLogin = async () => {
  //   try {
  //     setLoading(true);
  //     const user = await signIn();
  //     if (user) {
  //       handleGoogleSuccess(user);
  //     }
  //   } catch (error) {
  //     console.error('Google Sign-In Error:', error);
  //     let errorMessage = 'Something went wrong';
  //     if (error.code === 'SIGN_IN_CANCELLED') {
  //       errorMessage = 'Sign-in was cancelled';
  //     } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
  //       errorMessage = 'Google Play Services is not available';
  //     }
      
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Google Sign-In Failed',
  //       text2: errorMessage,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleGoogleSuccess = async (user) => {
  //   try {
  //     // Store user in Firestore
  //     const userRef = doc(db, 'users', user.uid);
  //     await setDoc(userRef, {
  //       uid: user.uid,
  //       email: user.email,
  //       fullName: user.displayName,
  //       emailVerified: true,
  //       isVerified: true,
  //       createdAt: new Date().toISOString(),
  //       profilePicture: user.photoURL,
  //     }, { merge: true });

  //     // Store in userStore
  //     await useUserStore.getState().setUser({
  //       id: user.uid,
  //       email: user.email,
  //       fullName: user.displayName,
  //       profilePicture: user.photoURL,
  //     });

  //     Toast.show({
  //       type: 'success',
  //       text1: 'Login Successful',
  //       text2: `Welcome ${user.displayName}`,
  //     });

  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'MainTabs' }],
  //     });
  //   } catch (error) {
  //     console.error('Google Sign-In Error:', error);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Google Sign-In Failed',
  //       text2: error.message || 'Something went wrong',
  //     });
  //   }
  // };

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
      console.log('Error:', error.message); // Log error for debugging
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-auto px-8 shadow-md">
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
            className="w-4/5 flex-row items-center justify-center gap-2 self-center rounded-lg border border-gray-300 p-2"
            accessibilityLabel="Social Login Buttons"
            onPress={handleGoogleLogin}
            disabled={loading}>
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
              accessibilityLabel="Sign Up Link">
              <Text className="text-blue-600">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
