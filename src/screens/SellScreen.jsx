import { useNavigation } from '@react-navigation/native';
import { getDocs, collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, ActivityIndicator, Modal, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { auth, db } from '../../firebaseConfig'; // Firebase services
import CategoryDropdown from '../components/CategoryDropdown';
import CheckboxWithLabel from '../components/CheckboxWithLabel';
import OtherInformationSection from '../components/OtherInformationSection';
import ProductDescriptionInput from '../components/ProductDescriptionInput';
import ProductFormInput from '../components/ProductFormInput';
import SubmitButton from '../components/SubmitButton';
import TermsAndConditionsCheckbox from '../components/TermsAndConditionsCheckbox';
import TestHeader from '../components/TestHeader';
import UploadImages from '../components/UploadImages';

export default function SellScreen({ route }) {
  // Form State
  const [productName, setProductName] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]); // This holds the array of image URIs
  const [selectedValue, setSelectedValue] = useState(null);
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [productDescription, setProductDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [year, setYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = route.params?.product !== undefined;
  const product = route.params?.product;
  const navigation = useNavigation();

  // Pre-fill form if in edit mode
  useEffect(() => {
    if (isEditMode && product) {
      setProductName(product.name);
      setSubCategory(product.subcategory);
      setSelectedValue(product.categoryId);
      setIsNegotiable(product.negotiable);
      setProductDescription(product.description);
      setBrand(product.brand);
      setCondition(product.condition);
      setColor(product.color);
      setPrice(product.price);
      setOriginalPrice(product.originalPrice);
      setYear(product.year);
      // setImages(product.images || []);
      setImages(Array.isArray(product.images) ? product.images : []);
    }
  }, [isEditMode, product]);

  // Clears form
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
    setOriginalPrice('');
    setYear('');
    setImages([]);
  };

  //images upload  to Cloudinary
  const uploadImages = async (imageUris) => {
    try {
      if (!imageUris || imageUris.length === 0) {
        throw new Error('No images selected!');
      }
      setIsLoading(true);
      const uploadedImageUrls = [];

      for (const imageUri of imageUris) {
        // Convert the local image URI to a Blob
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const data = new FormData();
        data.append('file', {
          uri: imageUri,
          type: 'image/png', // Change to 'image/jpeg' if needed
          name: `product_${Date.now()}.png`,
        });
        data.append('upload_preset', 'ProductImage'); // Use your actual Cloudinary preset (case-sensitive)
        data.append('cloud_name', 'dj21x4jnt'); // Your Cloudinary cloud name
        data.append('folder', 'market_trybe_products'); // Optional: folder in Cloudinary

        console.log('Uploading image:', imageUri);

        const cloudResponse = await fetch(
          'https://api.cloudinary.com/v1_1/dj21x4jnt/image/upload',
          {
            method: 'POST',
            body: data,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const result = await cloudResponse.json();
        if (!result.secure_url) {
          throw new Error('Cloudinary Upload Failed: ' + JSON.stringify(result.error));
        }
        console.log('Uploaded Image URL:', result.secure_url);
        uploadedImageUrls.push(result.secure_url);
      }
      return uploadedImageUrls;
    } catch (error) {
      console.error('Upload Error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for when images are selected in UploadImages component
  const handleImagesSelected = (selectedImages) => {
    if (!selectedImages || !Array.isArray(selectedImages)) return;
    // selectedImages should be an array of URIs
    // Ensure we only keep valid URIs
    const validImages = selectedImages.filter((uri) => !!uri);
    console.log('Processed Images:', validImages);
    setImages(validImages);
  };

  // product upload
  const handleSubmit = async () => {
    if (
      !productName ||
      !price ||
      !selectedValue ||
      !productDescription ||
      !brand ||
      !condition ||
      !color ||
      !year ||
      images.length === 0
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

      console.log('Uploading images:', images);
      const uploadedImageUrls = await uploadImages(images);

      if (uploadedImageUrls.length === 0) {
        Alert.alert('Error', 'Failed to upload images. Please try again.');
        return;
      }

      const productData = {
        name: productName || '',
        subcategory: subCategory || '',
        categoryId: selectedValue || '',
        negotiable: isNegotiable || false,
        description: productDescription || '',
        brand: brand || '',
        condition: condition || '',
        color: color || '',
        price: price || '',
        originalPrice: originalPrice || '',
        year: year || '',
        images: uploadedImageUrls, // Store Cloudinary URLs
        userId: user.uid,
        ...(isEditMode ? { updatedAt: new Date() } : { createdAt: new Date() }),
      };

      console.log('Final Product Data:', productData);

      setIsLoading(true);

      if (isEditMode) {
        const productRef = doc(db, 'products', product.id);
        await updateDoc(productRef, productData);
        Alert.alert('Success', 'Product updated successfully');
      } else {
        await addDoc(collection(db, 'products'), productData);
        Alert.alert('Success', 'Product uploaded successfully');
      }

      clearForm();
      navigation.navigate('MyShop');
    } catch (error) {
      console.error('Upload Error:', error.message);
      Alert.alert('Error', 'Failed to upload product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // const handleDelete = async () => {
  //   if (isEditMode && product) {
  //     try {
  //       setIsLoading(true);
  //       const productRef = doc(db, 'products', product.id);
  //       await deleteDoc(productRef);
  //       Alert.alert('Success', 'Product deleted successfully');
  //       navigation.navigate('MyShop');
  //     } catch (error) {
  //       console.error('Delete Error:', error.message);
  //       Alert.alert('Error', 'Failed to delete product. Please try again.');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  const handleDelete = async () => {
    if (!isEditMode || !product) return;

    Alert.alert('Confirm Deletion', 'Are you sure you want to delete this product?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            setIsLoading(true);
            const productRef = doc(db, 'products', product.id);
            await deleteDoc(productRef);
            Alert.alert('Deleted', 'Product removed successfully.');
            navigation.navigate('MyShop');
          } catch (error) {
            Alert.alert('Error', 'Failed to delete product.');
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="mb-20 flex-1 bg-white">
      {isLoading && (
  <Modal transparent={true} animationType="fade" visible={isLoading}>
    <View className="absolute inset-0 flex items-center justify-center  bg-opacity-30">
      <ActivityIndicator size="large" color="blue" />
    </View>
  </Modal>
)} 
      <TestHeader screenName="MainTabs" title="Product Information" />


      <ScrollView
        behavior="padding"
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
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
          <UploadImages onImagesSelected={handleImagesSelected} initialImages={images || []} />
        </View>

        <ProductDescriptionInput value={productDescription} onChangeText={setProductDescription} />

        <OtherInformationSection
          {...{
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
          }}
        />

        <TermsAndConditionsCheckbox isAgreed={isAgreed} setIsAgreed={setIsAgreed} />
        <View className="mb-20 flex flex-row items-center justify-evenly">
          {isEditMode && (
            <Button mode="contained" buttonColor="red" onPress={handleDelete}>
              Delete Product
            </Button>
          )}

          <SubmitButton
            disabled={isLoading || isAgreed}
            isEditMode={isEditMode}
            isAgreed={isAgreed}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
      {/* {isLoading && <ActivityIndicator size="large" color="blue" className="mt-4" />} */}
    </SafeAreaView>
  );
}
