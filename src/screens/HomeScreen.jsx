import React from 'react';
import { View, Text } from 'react-native';

import NavBar from '../components/NavBar';
// import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold text-blue-500">
        Welcome to Market Trybe!
        {/* <NavBar /> */}
      </Text>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });}
