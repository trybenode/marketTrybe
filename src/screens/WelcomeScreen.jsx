import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        navigation.navigate('MainTabs');
      } else if (user && !user.emailVerified) {
        // Prompt user to verify email
        navigation.navigate('Login');
      }
    });
    return unsubscribe;
  }, []);
  
  
  return (
    <SafeAreaView className="flex-1 bg-white p-2">
      {/* Logo Section */}

      {/* Text Section */}
      <View className="flex-1 items-center justify-center p-4">
        <View className="mx-auto mb-20 w-1/2 items-center rounded bg-blue-400">
          <Image source={require('../assets/logo.png')} resizeMode="contain" />
        </View>
        <Text className="mb-6 text-3xl font-bold text-blue-400">Welcome to Market Trybe</Text>
        <Text className="mb-6 px-4 text-center text-gray-600">
          Your personal pocket marketplace to buy and sell
        </Text>

        {/* Buttons */}
        <TouchableOpacity
          className="mb-4 w-full rounded-xl bg-blue-600 px-6 py-3"
          onPress={() => navigation.navigate('SignUp')}>
          <Text className="text-center text-lg font-semibold text-white">Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full rounded-xl border border-gray-300 px-6 py-3"
          onPress={() => navigation.navigate('Login')}>
          <Text className="text-center text-lg font-semibold text-gray-700">Log In</Text>
        </TouchableOpacity>

        {/* Footer Links */}
        <Text className="mt-6 px-4 text-center text-blue-400">
          Connecting buyers and sellers seamlessly.
        </Text>
        <Text className="mt-6 text-sm text-gray-500">
          By continuing, you agree to our{' '}
          <Text className="text-blue-600">Terms & Privacy Policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
}
