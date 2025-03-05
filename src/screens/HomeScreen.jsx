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
          className="absolute right-5 top-10 p-2">
          <FontAwesome name="user-circle-o" size={30} color="blue" />
        </TouchableOpacity>

        {/* Main Content */}
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg font-bold text-blue-500">Welcome to Market Trybe!</Text>
        </View>
      </SafeAreaView>
    
  );
}
