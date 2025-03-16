//Button used on login and signup page
import React, { memo } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

const CustomButton = memo(
  ({ title, onPress, backgroundColor = '#1976D2', textColor = '#ffffff', width = '50%' }) => {
    return (
      <View className="mb-2 mt-2 w-full items-center">
        <TouchableOpacity
          onPress={onPress}
          className="rounded-md p-3 "
          style={{
            backgroundColor,
            width,
          }}>
          <Text className="text-center font-semibold" style={{ color: textColor }}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
);

export default CustomButton;
