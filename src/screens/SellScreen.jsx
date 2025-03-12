import React, { useState } from 'react';
import { TouchableOpacity, TextInput, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import DropDownPicker from 'react-native-dropdown-picker';
import UploadImages from '../components/UploadImages';
import { Checkbox } from 'react-native-paper';
import CustomHeader from '../components/CustomHeader';

export default function SellScreen() {
  const [productName, setProductName] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [items, setItems] = useState([
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home_appliances', label: 'Home Appliances' },
    { value: 'hair_accessories', label: 'Hair Accessories' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'body_care', label: 'Body Care' },
    { value: 'snacks', label: 'Snacks' },
    { value: 'footwear', label: 'Foot Wear' },
  ]);

  const [isNegotiable, setIsNegotiable] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [productDescription, setProductDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');

  return (
    <SafeAreaView className="mb-10 flex-1 p-3">
      {/* <BackButton screenName="MainTabs" /> */}
      <CustomHeader screenName="Market" />

      <View className="mt-1 flex-1 px-4">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <Text className="mb-6 text-center text-lg font-bold">Product Information</Text>
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

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Checkbox
                status={isNegotiable ? 'checked' : 'unchecked'}
                onPress={() => setIsNegotiable(!isNegotiable)}
                className="border "
                color="#6200EE"
              />
              <Text className="ml-2 text-lg">Negotiable</Text>
            </View>
            <UploadImages />
          </View>

          <TextInput
            className="mb-4 h-32 rounded border bg-white p-4"
            placeholder="Product Description"
            value={productDescription}
            onChangeText={setProductDescription}
            multiline
            textAlignVertical="top"
          />

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

          <View className="mb-4 flex-row items-center">
            <Checkbox
              status={isAgreed ? 'checked' : 'unchecked'}
              onPress={() => setIsAgreed(!isAgreed)}
              className="border"
              color="#6200EE"
            />
            <Text className="ml-2 text-lg">I accept the Terms & Conditions</Text>
          </View>

          <TouchableOpacity
            disabled={!isAgreed}
            className={`mx-auto mb-24 w-[60%] rounded-lg p-3 ${isAgreed ? 'bg-blue-500' : 'bg-gray-400'}`}>
            <Text className="text-center font-bold text-white">Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
