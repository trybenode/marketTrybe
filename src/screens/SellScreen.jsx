import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, View, Text, ScrollView, Alert, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomHeader from '../components/CustomHeader';
import UploadImages from '../components/UploadImages';

export default function SellScreen({ route }) {
  const [productName, setProductName] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [category, setCategory] = useState([
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

  const isEditMode = route.params?.product !== undefined;
  const product = route.params?.product;
  const navigation = useNavigation();

  // Prefill form if product exists
  useEffect(() => {
    if (isEditMode && product) {
      setProductName(product.name);
      setSubCategory(product.subcategory);
      setSelectedValue(product.selectedValue);
      // Ensure category is always an array
      if (Array.isArray(product.category)) {
        setCategory(product.category);
      }
      setIsNegotiable(product.negotiable);
      setProductDescription(product.description);
      setBrand(product.brand);
      setCondition(product.condition);
      setColor(product.color);
      setPrice(product.price);
      setYear(product.year);
    }
  }, [isEditMode, product]);

  const handleSubmit = () => {
    if (
      !productName ||
      !price ||
      !selectedValue ||
      !productDescription ||
      !brand ||
      !condition ||
      !color ||
      !year
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const productData = {
      name: productName,
      subcategory: subCategory,
      selectedValue,
      category,
      negotiable: isNegotiable,
      description: productDescription,
      brand,
      condition,
      color,
      price,
      year,
    };

    if (isEditMode) {
      // Handle product update logic
      console.log('Updating Product:', productData);
      Alert.alert('Success', 'Product updated successfully');
    } else {
      // Handle product upload logic
      console.log('Uploading Product:', productData);
      Alert.alert('Success', 'Product uploaded successfully');
    }

    // Navigate back after submission
    navigation.goBack();
  };

  return (
    <SafeAreaView className="mb-20 flex-1 bg-white">
      <CustomHeader screenName="MainTabs" title="Product Information" />

      <View className="mt-1 flex-1 px-4">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="px-2">
          <TextInput
            className="mb-4 rounded border bg-white p-4"
            placeholder="Product Name"
            value={productName}
            onChangeText={setProductName}
          />
          <DropDownPicker
            open={open}
            value={selectedValue}
            items={category}
            setOpen={setOpen}
            setValue={setSelectedValue}
            setItems={setCategory}
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
              color="#6200EE"
            />
            <Text className="ml-2 text-lg">I accept the Terms & Conditions</Text>
          </View>

          <Button
            disabled={!isAgreed}
            title={isEditMode ? 'Update Product' : 'Upload Product'}
            onPress={handleSubmit}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}