import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function NavBar({ navigation }) {
  const insets = useSafeAreaInsets(); // Fixed missing function call

  return (
    <>
      <View className="bottom-0 left-0  right-0  flex-row justify-between  bg-gray-800 px-2 py-3 ">
        {/* Left Side Buttons */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Market')}
          className="items-center justify-center">
          <FontAwesome name="home" size={24} color="white" />
          <Text className="text-gray-300">Marketplace</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Favourite')}
          className=" items-center justify-center">
          <Fontisto name="favorite" size={24} color="white" />
          <Text className="text-gray-300">Favourites</Text>
        </TouchableOpacity>

        {/* Floating Button in Center */}
        <View className=" ">
          <TouchableOpacity
            className=" -top-8 right-1/3  h-16 w-16 items-center justify-center rounded-full bg-gray-800"
            onPress={() => navigation.navigate('Sell')}>
            <Text className="text-4xl font-bold text-white">+</Text>
          </TouchableOpacity>
        </View>

        {/* Right Side Buttons */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Messages')}
          className=" items-center justify-center">
          <FontAwesome name="wechat" size={24} color="white" />
          <Text className="text-gray-300">Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          className="items-center justify-center">
          <FontAwesome name="history" size={24} color="white" />
          <Text className="text-gray-300">History</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default NavBar;
