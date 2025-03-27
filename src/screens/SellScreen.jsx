import { useNavigation } from '@react-navigation/native';
import { getDocs, collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, ActivityIndicator } from 'react-native';
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

//cloudnary setup import statements for image uplaod
// import cld from './cloudinaryConfig';
// import { AdvancedImage } from '@cloudinary/react';
// import { fill } from '@cloudinary/url-gen/actions/resize';

export default function SellScreen({ route }) {
  const [productName, setProductName] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [category, setCategory] = useState([
    // { value: 'electronics', label: 'Electronics' },
    // { value: 'clothing', label: 'Clothing' },
    // { value: 'home_appliances', label: 'Home Appliances' },
    // { value: 'hair_accessories', label: 'Hair Accessories' },
    // { value: 'jewelry', label: 'Jewelry' },
    // { value: 'body_care', label: 'Body Care' },
    // { value: 'snacks', label: 'Snacks' },
    // { value: 'footwear', label: 'Foot Wear' },
  ]);

  const [isNegotiable, setIsNegotiable] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [productDescription, setProductDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [year, setYear] = useState('');

  const isEditMode = route.params?.product !== undefined;
  const product = route.params?.product;
  const navigation = useNavigation();
  // const [isLoading, setIsLoading] = useState(false)

  const handleImagesSelected = (selectedImages) => {
    setImages(selectedImages);
  };

  //logic to fetch category from firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoryData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCategory(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Prefill form if product exists in firestore
  useEffect(() => {
    if (isEditMode && product) {
      setProductName(product.name);
      setSubCategory(product.subcategory);
      setSelectedValue(product.categoryId);
      // if (Array.isArray(product.categoryId)) {
      //   setCategory(product.categoryId);
      // }
      setIsNegotiable(product.negotiable);
      setProductDescription(product.description);
      setBrand(product.brand);
      setCondition(product.condition);
      setColor(product.color);
      setPrice(product.price);
      setOriginalPrice(product.originalPrice);
      setYear(product.year);
      setImages(product.images || []);
    }
  }, [isEditMode, product]);

  // Clear form fields
  const clearForm = () => {
    setProductName('');
    setSubCategory(['']);
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

  // Handle form submission
  const handleSubmit = async () => {
    const uploadImages = async () => {
      try {
        const uploadedImageUrls = await Promise.all(
          images.map(async (image) => {
            const data = new FormData();
            data.append('file', {
              uri: image, //local image uri
              type: 'image/jpeg',
              name: `product_${Date.now()}.jpg`,
            });
            data.append('upload_preset', 'ProductImage'); //sets cloudinary presets
            data.append('cloud_name', 'dj21x4jnt');

            const response = await fetch('https://api.cloudinary.com/v1_1/dj21x4jnt/image/upload', {
              method: 'POST',
              body: data,
            });

            const result = await response.json();
            return result.secure_url; //returns image address to be uploaded to firestore
          })
        );
        console.log('uploaded Image URLs:', uploadedImageUrls); // for test purpose
        return uploadedImageUrls;
      } catch (error) {
        console.error('Error uploading images to Cloudinary:', error);
        throw error;
      }
    };

    // return <AdvancedImage cldImg={img} />;

    if (
      !productName ||
      !price ||
      !selectedValue ||
      !productDescription ||
      !brand ||
      !condition ||
      !color ||
      !year ||
      (!isEditMode && images.length === 0) //  check only for new listings
      // images.length === 0 remove this after testing
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

      let imageUrls = [];
      if (images.length > 0) {
        //uploads image if new one's are added
        imageUrls = await uploadImages();
      }

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
        images: imageUrls,
        userId: auth.currentUser.uid,
        //userId: user.uid, test which uid works better
        ...(isEditMode ? { updatedAt: new Date() } : { createdAt: new Date() }), //adds created date only for new listings
      };

      // add images if we have new ones
      // if (imageUrls.length > 0) {
      // productData.images = imageUrls; }

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
          originalPrice={originalPrice}
          setOriginalPrice={setOriginalPrice}
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
