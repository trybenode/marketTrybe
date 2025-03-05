import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 ">
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        className="absolute right-5 top-10 px-4 py-5">
        {/* <FontAwesome name="user-circle-o" size={40} className="text-gray-800" /> */}
        <View className="h-16 w-16 items-center justify-center rounded-full bg-gray-300">
          <FontAwesome name="user" size={40} color="black" />
        </View>
      </TouchableOpacity>

      {/* Main Content */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold text-gray-700">Welcome To Market Trybe!</Text>
      </View>
    </SafeAreaView>
  );
}
