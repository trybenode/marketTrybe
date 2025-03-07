import React, { memo } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

const CustomButton = memo(({ title, onPress }) => {
  return (
    <View className="mb-2 mt-2 w-full items-center">
      <TouchableOpacity onPress={onPress} className="w-1/3 rounded-md bg-white p-3">
        <Text className="text-center font-semibold">{title}</Text>
      </TouchableOpacity>
    </View>
  );
});

export default CustomButton;
