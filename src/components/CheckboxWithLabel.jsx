import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';

const CheckboxWithLabel = ({ label, status, onPress }) => {
  return (
    <View className="flex-row items-center">
      <Checkbox status={status} onPress={onPress} color="#6200EE" />
      <Text className="ml-2 text-lg">{label}</Text>
    </View>
  );
};

export default CheckboxWithLabel;