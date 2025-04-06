// screen that displays products based on category filter
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, query, where, getDocs, doc, getDoc, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import ListingCards from '../components/ListingCards';
import TestHeader from '../components/TestHeader';
import UserProfile from '../components/UserProfile';

function CategoryProductList() {
  const route = useRoute();
  const { categoryId : initialCategoryId, categoryName: initialCategoryName } = route.params || {};
  const [categoryId, setCategoryId] =useState(initialCategoryId);
  const [categoryName, setCategoryName] = useState(initialCategoryName || '');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Reset state when params change
  useEffect(() => {
    setCategoryId(initialCategoryId);
    setCategoryName(initialCategoryName || '');
    setProducts([]);
    setLoading(true);
    setError(null);
  }, [initialCategoryId, initialCategoryName]);

  // useEffect(() => {
  //   if (initialCategoryName) {
  //     setLoading(false);
  //   } else {
  //     const fetchCategoryName = async () => {
  //       try {
  //         const categoryRef = doc(db, 'categories', categoryId);
  //         const categorySnap = await getDoc(categoryRef);
  //         if (categorySnap.exists()) {
  //           setCategoryName(categorySnap.data().name);
  //         } else {
  //           setError('Category not found');
  //         }
  //       } catch (err) {
  //         setError('Failed to load category');
  //         console.error(err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchCategoryName();
  //   }
  // }, [categoryId, initialCategoryName]);

  useEffect(() => {
    const fetchCategoryName = async () => {
      if (categoryName) return;
      
      try {
        const categoryRef = doc(db, 'categories', categoryId);
        const categorySnap = await getDoc(categoryRef);
        if (categorySnap.exists()) {
          setCategoryName(categorySnap.data().name);
        }
      } catch (err) {
        setError('Failed to load category');
      }
    };
  
    if (categoryId && !categoryName) {
      fetchCategoryName();
    }
  }, [categoryId, categoryName]);
  
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, 'products'),
          where('categoryId', '==', categoryId), // check here
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        const snapshot = await getDocs(q);

        const fetchedProducts = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            product: {
              ...data,
              createdAt: data.createdAt?.toDate() || new Date(), // Ensure it's a JS Date
              updatedAt: data.updatedAt?.toDate() || new Date(),
            },
          };
        });

        setProducts(fetchedProducts);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryProducts();
    }
  }, [categoryId]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader title={categoryName || 'Category'} extraComponent={<UserProfile />} />
      <View className="flex-1 px-4 py-3">
        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : error ? (
          <Text className="mt-4 text-center text-red-500">{error}</Text>
        ) : (
          <ListingCards products={products} />
        )}
      </View>
    </SafeAreaView>
  );
}
export default CategoryProductList;
