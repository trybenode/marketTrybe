import React from 'react';
import { TextInput } from 'react-native';

const AuthInput = ({ placeholder, keyboardType = 'default', secureTextEntry = false }) => {
  return (
    <TextInput
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      className="mb-3 rounded-md bg-white p-3"
    />
  );
};

export default AuthInput;
