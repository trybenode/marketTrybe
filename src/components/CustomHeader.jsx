import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomHeader = memo(({ screenName, title, extraComponent }) => {
  const navigation = useNavigation();

  return (
    <View className="relative h-20 flex-row items-center justify-between px-3">
      <StatusBar />
      {/* Left - Back Button */}
      <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      {/* Center - Title */}
      <Text className="absolute left-1/2 -translate-x-1/2 text-xl font-extrabold">{title}</Text>

      {/* Right - Extra component or placeholder */}
      <View>
        {typeof extraComponent === 'string' ? (
          <Text>{extraComponent}</Text> // wrap strings properly
        ) : extraComponent ? (
          extraComponent
        ) : (
          <View style={{ width: 30 }} /> // Placeholder to balance layout
        )}
      </View>
    </View>
  );
});

export default CustomHeader;
