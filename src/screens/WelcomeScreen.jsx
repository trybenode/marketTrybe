import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white items-center justify-center p-6">
      {/* Logo and Branding */}
      <Image 
        source={require('../assets/logo.png')} 
        className="w-32 h-32 mb-6"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold text-gray-900 mb-2">Welcome to Market Trybe</Text>
      <Text className="text-gray-600 text-center mb-6 px-4">
        Connecting buyers and sellers seamlessly.
      </Text>

      {/* Buttons */}
      <TouchableOpacity 
        className="bg-blue-600 py-3 px-6 rounded-xl w-full mb-4" 
        onPress={() => navigation.navigate('Signup')}
      >
        <Text className="text-white text-center text-lg font-semibold">Get Started</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="border border-gray-300 py-3 px-6 rounded-xl w-full" 
        onPress={() => navigation.navigate('Login')}
      >
        <Text className="text-gray-700 text-center text-lg font-semibold">Log In</Text>
      </TouchableOpacity>

      {/* Footer Links */}
      <Text className="text-gray-500 text-sm mt-6">
        By continuing, you agree to our <Text className="text-blue-600">Terms & Privacy Policy</Text>.
      </Text>
    </View>
  );
}
