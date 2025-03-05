import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Custom Button to increase reusability
const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="rounded-md bg-white p-3">
      <Text className="text-center font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
