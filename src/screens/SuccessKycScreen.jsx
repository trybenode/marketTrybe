import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SuccessKycScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white p-3">
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        className="absolute right-3 top-10 px-2 py-3">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-gray-300">
          <FontAwesome name="user" size={30} color="black" />
        </View>
      </TouchableOpacity>

      {/* Main Content */}
      <View className="flex-1 items-center justify-center">
        <Animatable.View animation="bounceIn" duration={1000}>
          <Icon name="check-circle" size={200} color="green" />
        </Animatable.View>
        <Text className="text-center text-xl">
          Verification pending, Please wait for confirmation
        </Text>
      </View>
    </SafeAreaView>
  );
}
