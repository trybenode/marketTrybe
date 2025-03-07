import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RadioButton = ({ label, selected, onPress }) => (
  <TouchableOpacity className="mb-6 flex-row items-center" onPress={onPress}>
    <View className="mr-2 h-5 w-5 items-center justify-center rounded-full border-2 border-gray-400">
      {selected && <View className="h-3 w-3 rounded-full bg-black" />}
    </View>
    <Text className="text-lg text-gray-500">{label}</Text>
  </TouchableOpacity>
);

export default RadioButton;
