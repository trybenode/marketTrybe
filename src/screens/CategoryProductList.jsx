import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import ListingCards from '../components/ListingCards';
import TestHeader from '../components/TestHeader';
import UserProfile from '../components/UserProfile';

function CategoryProductList() {
  const route = useRoute();
  // const { categoryID, categoryName: passedCategoryName } = route.params || {};
const {categoryId} = route.params || {};
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      // if (!categoryID || categoryName) return; // Skip if already set
    
      // try {
      //   console.log("🔍 Fetching category name for ID:", categoryID);
      //   const categoryRef = doc(db, 'categories', categoryID);
      //   const categorySnap = await getDoc(categoryRef);
    
      //   if (categorySnap.exists()) {
      //     setCategoryName(categorySnap.data().name);
      //   } else {
      //     console.warn("⚠️ No category found for ID:", categoryID);
      //   }
      // } catch (error) {
      //   console.error("❌ Error fetching category name:", error);
      // }

      if(!categoryId){
        setLoading(false);
        return;
      }
      try {
        //fetch category name
        const categoryRef = doc(db, 'categories', categoryId);
        const categorySnap = await getDoc(categoryRef);
        if (!categorySnap.exists()) {
          console.warn(`⚠️ No category found for ID: ${categoryId}`);
          return;
        }

        const fetchCategoryName = categorySnap.data().name;
        setCategoryName(fetchCategoryName);
        console.log(`✅ Category name fetched for ${categoryId}:`, fetchCategoryName);

        //Query products where 'categoryId' in products matches 'name' in categories

        const productQuery = query(
          collection(db, 'products'),
          where('categoryId', '==', fetchCategoryName)
        );
        const querySnapshot = await getDocs(productQuery);
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
        console.log(`✅ Products fetched for ${categoryName}:`, fetchedProducts.length);
      }catch (error){
        console.log(' Error fetching products:', error);
      }finally {
        setLoading(false);
      }
    };
    fetchCategoryAndProducts();
    // if (categoryId) {
    //   fetchProducts();
    // } else {
    //   setLoading(false);
    // }
  }, [categoryId]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       console.log("🔄 Fetching products for categoryID:", categoryID);

  //       const productQuery = query(
  //         collection(db, 'products'),
  //         where('categoryId', '==', categoryID)
  //       );
  //       const querySnapshot = await getDocs(productQuery);

  //       const fetchedProducts = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       setProducts(fetchedProducts);
  //       console.log("✅ Products fetched:", fetchedProducts.length);
  //     } catch (error) {
  //       console.error('❌ Error fetching products:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (categoryID) {
  //     fetchProducts();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [categoryID]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader title={categoryName|| "Category"} extraComponent={<UserProfile />} />
      <View className="flex-1 px-4 py-3">
        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : products.length === 0 ? (
          <Text className="mt-4 text-center text-gray-500">
            No products found in {categoryName}
          </Text>
        ) : (
          <ListingCards key={categoryId} categoryFilter={categoryName} 
          products={products} 
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default CategoryProductList;
