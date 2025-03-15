import React from 'react';
import { TextInput, View, Text } from 'react-native';

const ProductFormInput = ({ placeholder, value, onChangeText, multiline, numberOfLines }) => {
  return (
    <TextInput
      className="mb-4 rounded border bg-white p-4"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  );
};

export default ProductFormInput;