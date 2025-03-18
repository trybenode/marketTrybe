import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { auth, db } from '../../firebaseConfig'; // imported firebse services
import CategoryDropdown from '../components/CategoryDropdown';
import CheckboxWithLabel from '../components/CheckboxWithLabel';
import OtherInformationSection from '../components/OtherInformationSection';
import ProductDescriptionInput from '../components/ProductDescriptionInput';
import ProductFormInput from '../components/ProductFormInput';
import SubmitButton from '../components/SubmitButton';
import TermsAndConditionsCheckbox from '../components/TermsAndConditionsCheckbox';
import TestHeader from '../components/TestHeader';
import UploadImages from '../components/UploadImages';
import { create } from 'twrnc';

export default function SellScreen({ route }) {
  const [productName, setProductName] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
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

  const handleImagesSelected = (selectedImages) => {
    setImages(selectedImages);
  };

  // Prefill form if product exists 
 // remodify to get daata from firestore
  useEffect(() => {
    if (isEditMode && product) {
      setProductName(product.name);
      setSubCategory(product.subcategory);
      setSelectedValue(product.selectedValue);
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
      setImages(product.images || []);
    }
  }, [isEditMode, product]);

  // Clear form fields
  const clearForm = () => {
    setProductName('');
    setSubCategory('');
    setSelectedValue(null);
    setIsNegotiable(false);
    setProductDescription('');
    setBrand('');
    setCondition('');
    setColor('');
    setPrice('');
    setYear('');
    setImages([]);
  };

  // Handle form submission
  const handleSubmit = async () => {
    // const uploadImages = async () => {
    //   try {
    //     const imageUrls = await Promise.all(
    //       images.map(async (image, index) => {
    //         const response = await fetch(image); // Fetch local image
    //         const blob = await response.blob(); // Convert to blob

    //         const storageRef = ref(storage, `products/${Date.now()}_${index}.jpg`);
    //         await uploadBytes(storageRef, blob);

    //         return await getDownloadURL(storageRef); // Get public URL
    //       })
    //     );

    //     return imageUrls;
    //   } catch (error) {
    //     console.error('Error uploading images:', error);
    //     throw error;
    //   }
    // };

    if (
      !productName ||
      !price ||
      !selectedValue ||
      !productDescription ||
      !brand ||
      !condition ||
      !color ||
      !year 
      // ||

      // images.length === 0
    ) {
      Alert.alert('Error', 'Please fill in all fields and upload at least one image');
      return;
    }
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'You must be logged in to upload a product');
        return;
      }

      // const imageUrls = await uploadImages();

      const productData = {
        name: productName,
        subcategory: subCategory,
        category: selectedValue,
        negotiable: isNegotiable,
        description: productDescription,
        brand,
        condition,
        color,
        price,
        year,
        // images: imageUrls,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      };

      if (isEditMode) {
        // update/edit existing product
        const productRef = doc(db, 'products', product.id);
        await updateDoc(productRef, productData);
        Alert.alert('Success', 'Product updated successfully');
      } else {
        // add new product
        await addDoc(collection(db, 'products'), productData);
        Alert.alert('Success', 'Product uploaded successfully');
      }

      clearForm();
      navigation.navigate('MyShop');
    } catch (error) {
      console.error('Upload Error:', error.message);
      Alert.alert('Error', 'Failed to upload product. Please try again.');
    }
  };
  const handleDelete = async () => {
    if (isEditMode && product) {
      try {
        const productRef = doc(db, 'products', product.id);
        await deleteDoc(productRef);

        Alert.alert('Success', 'Product deleted successfully');
        navigation.navigate('MyShop');
      } catch (error) {
        console.error('Delete Error:', error.message);
        Alert.alert('Error', 'Failed to delete product. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView className="mb-20 flex-1 bg-white">
      <TestHeader screenName="MainTabs" title="Product Information" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="px-4 pb-8">
        <ProductFormInput
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <CategoryDropdown
          open={open}
          setOpen={setOpen}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          category={category}
          setCategory={setCategory}
        />
        <ProductFormInput
          placeholder="Sub-Category"
          value={subCategory}
          onChangeText={setSubCategory}
        />
        <View className="flex-row items-center justify-between">
          <CheckboxWithLabel
            label="Negotiable"
            status={isNegotiable ? 'checked' : 'unchecked'}
            onPress={() => setIsNegotiable(!isNegotiable)}
          />
          <UploadImages onImagesSelected={handleImagesSelected} />
        </View>
        <ProductDescriptionInput value={productDescription} onChangeText={setProductDescription} />
        <OtherInformationSection
          brand={brand}
          setBrand={setBrand}
          condition={condition}
          setCondition={setCondition}
          color={color}
          setColor={setColor}
          price={price}
          setPrice={setPrice}
          year={year}
          setYear={setYear}
        />
        <TermsAndConditionsCheckbox isAgreed={isAgreed} setIsAgreed={setIsAgreed} />
        {isEditMode && (
          <Button
            mode="contained"
            buttonColor="red"
            labelStyle={{ fontSize: 16, textAlign: 'center', width: '40%' }}
            onPress={handleDelete}>
            Delete Product
          </Button>
        )}
        <SubmitButton isEditMode={isEditMode} isAgreed={isAgreed} onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}
