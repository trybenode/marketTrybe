import React, { memo, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
const CustomTextInput = memo(({ placeholder, secureTextEntry, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  return (
    <View style={tw`mb-5 flex-row items-center rounded-lg border border-gray-300 bg-white px-3`}>
      {/* Input Field */}
      <TextInput
        placeholder={placeholder}
        secureTextEntry={isPasswordVisible}
        style={tw`flex-1 text-sm py-4`}
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
});

export default CustomTextInput;
