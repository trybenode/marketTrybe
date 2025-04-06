import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../../firebaseConfig';
import CategoryDropdown from '../components/CategoryDropdown';
import CheckboxWithLabel from '../components/CheckboxWithLabel';
import OtherInformationSection from '../components/OtherInformationSection';
import ProductDescriptionInput from '../components/ProductDescriptionInput';
import ProductFormInput from '../components/ProductFormInput';
import SubmitButton from '../components/SubmitButton';
import TermsAndConditionsCheckbox from '../components/TermsAndConditionsCheckbox';
import UploadImages from '../components/UploadImages';
import Toast from 'react-native-toast-message';
import SellScreenHeader from '../components/SellScreenHeader';

export default function SellScreen({ route }) {
  const [productName, setProductName] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
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

  //prefills form if in edit mode
  useEffect(() => {
    if (isEditMode && product) {
      setProductName(product.name);
      setSelectedValue(product.categoryId);
      setSubCategory(product.subcategory);
      setIsNegotiable(product.negotiable);
      setProductDescription(product.description);
      setBrand(product.brand);
      setCondition(product.condition);
      setColor(product.color);
      setPrice(product.price);
      setOriginalPrice(product.originalPrice);
      setYear(product.year);
      setImages(Array.isArray(product.images) ? product.images : []);
    }
  }, [isEditMode, product]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      clearForm();
    };
  }, []);

  //clears form after leaving page
  const clearForm = useCallback(() => {
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
  });
  const arraysAreEqual = (arr1, arr2) =>
    arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);

  const hasUnsavedChanges = useCallback(() => {
    if (!isEditMode) {
      return (
        productName.trim() !== '' ||
        price.toString().trim() !== '' ||
        selectedValue !== null ||
        productDescription.trim() !== '' ||
        brand.trim() !== '' ||
        condition.trim() !== '' ||
        color.trim() !== '' ||
        year.trim() !== '' ||
        images.length > 0
      );
    }

    // Edit mode logic
    return (
      productName !== (product?.name || '') ||
      Number(price) !== Number(product?.price || '') ||
      selectedValue !== product?.categoryId ||
      subCategory !== product?.subcategory ||
      isNegotiable !== Boolean(product?.negotiable) ||
      productDescription !== (product?.description || '') ||
      brand !== (product?.brand || '') ||
      condition !== (product?.condition || '') ||
      color !== (product?.color || '') ||
      Number(originalPrice) !== Number(product?.originalPrice || '') ||
      year !== (product?.year || '') ||
      !arraysAreEqual(images, product?.images || [])
    );
  }, [
    isEditMode,
    product,
    productName,
    price,
    selectedValue,
    subCategory,
    isNegotiable,
    productDescription,
    brand,
    condition,
    color,
    originalPrice,
    year,
    images,
  ]);

  const isFormValid = () =>
    productName &&
    price &&
    selectedValue &&
    productDescription &&
    brand &&
    condition &&
    color &&
    year &&
    images.length > 0;

  //logic for image upload using cloudinary
  const uploadImages = async (imageUris) => {
    try {
      if (!imageUris.length) throw new Error('No images selected!');
      setIsLoading(true);
      const uploadedImageUrls = [];
      for (const imageUri of imageUris) {
        if (imageUri.startsWith('https://res.cloudinary.com')) {
          uploadedImageUrls.push(imageUri); // is edit mode, use existing URL
          continue;
        }
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const data = new FormData();
        data.append('file', {
          uri: imageUri,
          type: 'image/png',
          name: `product_${Date.now()}.png`,
        });
        data.append('upload_preset', 'ProductImage');
        data.append('cloud_name', 'dj21x4jnt');
        data.append('folder', 'market_trybe_products');
        const cloudResponse = await fetch(
          'https://api.cloudinary.com/v1_1/dj21x4jnt/image/upload',
          { method: 'POST', body: data, headers: { 'Content-Type': 'multipart/form-data' } }
        );
        const result = await cloudResponse.json();
        if (!result.secure_url)
          throw new Error('Cloudinary Upload Failed: ' + JSON.stringify(result.error));
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

  //logic for submitting/uploading product to db
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
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields and upload at least one image',
      });
      return;
    }
    try {
      setIsLoading(true);
      const uploadedImageUrls = await uploadImages(images);

      const productData = {
        name: productName,
        subcategory: subCategory,
        categoryId: selectedValue,
        negotiable: isNegotiable,
        description: productDescription,
        brand,
        condition,
        color,
        price,
        originalPrice,
        year,
        images: uploadedImageUrls,
        userId: auth.currentUser.uid,
        ...(isEditMode ? { updatedAt: new Date() } : { createdAt: new Date() }),
      };
      if (isEditMode) await updateDoc(doc(db, 'products', product.id), productData);
      else await addDoc(collection(db, 'products'), productData);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: isEditMode ? 'Product updated successfully' : 'Product uploaded successfully',
      });
      clearForm();
      navigation.navigate('MyShop');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to upload product.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  //logic for deleting products
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'undefined'}
      style={{ flex: 1 }}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className=" flex-1 bg-white">
          {isLoading && (
            <Modal transparent={true} animationType="fade" visible={isLoading}>
              <View className="absolute inset-0 flex items-center justify-center bg-opacity-30">
                <ActivityIndicator size="large" color="blue" />
              </View>
            </Modal>
          )}
          <SellScreenHeader
            screenName={isEditMode ? 'MyShop' : 'MainTabs'}
            hasUnsavedChanges={hasUnsavedChanges}
            clearForm={clearForm}
            isEditMode={isEditMode}
          />

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            className="px-4 py-8">
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
              dropDownDirection="AUTO"
              listMode="MODAL" // or "SCROLLVIEW", "FLATLIST", "MODAL"
              modalProps={{
                animationType: 'slide',
              }}
            />

            <ProductFormInput
              placeholder="Sub-Category"
              value={subCategory}
              onChangeText={setSubCategory}
            />

            <View className="mx-auto my-4 flex-row items-center justify-between">
              <UploadImages onImagesSelected={setImages} initialImages={images || []} />
            </View>
            <CheckboxWithLabel
              label="Negotiable"
              status={isNegotiable ? 'checked' : 'unchecked'}
              onPress={() => setIsNegotiable(!isNegotiable)}
            />

            <ProductDescriptionInput
              value={productDescription}
              onChangeText={setProductDescription}
            />

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

            {!isEditMode && (
              <TermsAndConditionsCheckbox isAgreed={isAgreed} setIsAgreed={setIsAgreed} />
            )}
            {/*buttons*/}
            <View className="flex flex-row items-center justify-evenly">
              {isEditMode && (
                <Button mode="contained" buttonColor="red" onPress={handleDelete}>
                  Delete Product
                </Button>
              )}

              <SubmitButton
                disabled={
                  isLoading ||
                  (!isEditMode && (!isFormValid() || !isAgreed)) ||
                  !hasUnsavedChanges()
                }
                // disabled={isLoading || !isAgreed || !hasUnsavedChanges()}
                isEditMode={isEditMode}
                isAgreed={isAgreed}
                onPress={handleSubmit}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
