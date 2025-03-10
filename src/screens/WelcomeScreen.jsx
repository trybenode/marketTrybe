import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-white p-2">
      {/* Logo and */}
      <Image
        source={require('../assets/logo.png')}
        className="mb-6 h-32 w-32"
        resizeMode="contain"
      />
      {/* <View>
        <Text className="text-2xl font-extrabold color-black">MARKET TRYBE</Text>
      </View> */}
      <Text className="mb-2 text-2xl font-bold text-gray-900">Welcome to Market Trybe</Text>
      <Text className="mb-6 px-4 text-center text-gray-600">Your personal pocket marketplace!</Text>

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
      <Text className="mt-6 text-sm text-gray-500">
        By continuing, you agree to our{' '}
        <Text className="text-blue-600">Terms & Privacy Policy</Text>.
      </Text>
      <Text className="mb-6 px-4 text-center text-gray-600">
        Connecting buyers and sellers seamlessly.
      </Text>
    </View>
  );
}
