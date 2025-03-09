import React, { useState } from 'react';
import { TouchableOpacity, TextInput, SafeAreaView, View, Text } from 'react-native';
import BackButton from '../components/BackButton';
import DropDownPicker from 'react-native-dropdown-picker';
import UploadImages from '../components/UploadImages';
import { Checkbox } from 'react-native-paper'; // ✅ Use react-native-paper's Checkbox

export default function SellScreen() {
  const [productName, setProductName] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [items, setItems] = useState([
    { value: 'Option 1', label: 'Electronics' },
    { value: 'Option 2', label: 'Clothing' },
    { value: 'Option 3', label: 'Home Appliances' },
    { value: 'Option 4', label: 'Hair Accessories' },
    { value: 'Option 5', label: 'Jewelry' },
    { value: 'Option 6', label: 'Body Care' },
    { value: 'Option 7', label: 'Snacks' },
    { value: 'Option 8', label: 'Foot Wear' },
  ]);

  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView className="flex-1 p-4">
      <BackButton screenName="MainTabs" />
      <View className="px-4">
        <Text className="mb-2 text-center text-lg font-bold">Product Information</Text>
        <TextInput
          className="mb-4 rounded border bg-white p-4"
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />

        <DropDownPicker
          open={open}
          value={selectedValue}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedValue}
          setItems={setItems}
          placeholder="Select Category"
          style={{ marginBottom: 10 }}
        />

        <TextInput
          className="mb-4 rounded border bg-white p-4"
          placeholder="Sub-Category"
          value={subCategory}
          onChangeText={setSubCategory}
        />

        <View className="flex-row items-center">
          <Checkbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(!isChecked)}
            color="#6200EE"
          />
          <Text className="ml-2 text-lg">Accept Terms & Conditions</Text>
        </View>

        <UploadImages />

        <TouchableOpacity className="mt-6 rounded-lg bg-blue-500 p-3">
          <Text className="text-center font-bold text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
