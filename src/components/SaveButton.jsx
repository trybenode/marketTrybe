import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';

const SaveButton = memo(({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    className="mt-6 w-1/3 items-center self-center rounded-md bg-[#2563eb] p-3">
    <Text className="text-xl font-bold text-white">{title}</Text>
  </TouchableOpacity>
));

export default SaveButton;
