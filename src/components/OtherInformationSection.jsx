// other information section for sell page
import React from 'react';
import { View, Text, TextInput } from 'react-native';

const OtherInformationSection = ({
  brand,
  setBrand,
  condition,
  setCondition,
  color,
  setColor,
  price,
  setPrice,
  originalPrice,
  setOriginalPrice,
  year,
  setYear,
}) => {
  return (
    <View className="mb-4">
      <Text className="mb-4 text-center font-semibold">Other Information</Text>
      <View className="flex-row justify-between">
      <TextInput
        className="mb-4 w-[48%] rounded border bg-white p-4"
        placeholder="Brand/Type/Model"
        value={brand}
        onChangeText={setBrand}
      />
        <TextInput
          className="mb-4 w-[48%] rounded border bg-white p-4"
          placeholder="Condition (New/Used)"
          value={condition}
          onChangeText={setCondition}
        />
        </View>
      <View className="flex-row justify-between">
        <TextInput
          className="mb-4 w-[48%] rounded border bg-white p-4"
          placeholder="Color"
          value={color}
          onChangeText={setColor}
        />
            <TextInput
          className="mb-4 w-[48%] rounded border bg-white p-4"
          placeholder="Year"
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />
      </View>
      <View className="flex-row justify-between">
        <TextInput
          className="mb-4 w-[48%] rounded border bg-white p-4"
          placeholder="Price (N)"
          keyboardType="numeric"
          value={originalPrice}
          onChangeText={setOriginalPrice}
        />
        <TextInput
          className="mb-4 w-[48%] rounded border bg-white p-4"
          placeholder="Discount Price (N)"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
    
      </View>
    </View>
  );
};

export default OtherInformationSection;