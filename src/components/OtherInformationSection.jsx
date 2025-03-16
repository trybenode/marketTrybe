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
  year,
  setYear,
}) => {
  return (
    <View className="mb-4">
      <Text className="mb-4 text-center font-semibold">Other Information</Text>
      <TextInput
        className="mb-4 rounded border bg-white p-4"
        placeholder="Brand/Type/Model"
        value={brand}
        onChangeText={setBrand}
      />
      <View className="flex-row justify-between">
        <TextInput
          className="mb-4 w-[48%] rounded border bg-white p-4"
          placeholder="Condition (New/Used)"
          value={condition}
          onChangeText={setCondition}
        />
        <TextInput
          className="mb-4 w-[48%] rounded border bg-white p-4"
          placeholder="Color"
          value={color}
          onChangeText={setColor}
        />
      </View>
      <View className="flex-row justify-between">
        <TextInput
          className="mb-4 w-[48%] rounded border bg-white p-4"
          placeholder="Price (N)"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          className="mb-4 w-[48%] rounded border bg-white p-4"
          placeholder="Year"
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />
      </View>
    </View>
  );
};

export default OtherInformationSection;