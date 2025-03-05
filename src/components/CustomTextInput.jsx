import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Custom Text Input to increase reusability
export default function CustomTextInput({ placeholder, secureTextEntry, ...props }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  return (
    <View className="mb-3 flex-row items-center rounded-md border border-gray-300 bg-white px-3">
      {/* Input Field */}
      <TextInput
        placeholder={placeholder}
        secureTextEntry={isPasswordVisible}
        className="flex-1 text-base"
        {...props}
      />

      {/* Eye Icon for Password Visibility */}
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={18} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
}
