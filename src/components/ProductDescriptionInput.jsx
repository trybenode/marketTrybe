import React from 'react';
import { TextInput } from 'react-native';

const ProductDescriptionInput = ({ value, onChangeText }) => {
  return (
    <TextInput
      className="mb-4 h-32 rounded border bg-white p-4"
      placeholder="Product Description"
      value={value}
      onChangeText={onChangeText}
      multiline
      textAlignVertical="top"
    />
  );
};

export default ProductDescriptionInput;