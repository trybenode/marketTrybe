import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const SaveButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="mt-8 w-1/3 items-center rounded-md bg-[#2563eb] p-3">
    <Text className="text-xl font-bold text-white">Save</Text>
  </TouchableOpacity>
);

export default SaveButton;
