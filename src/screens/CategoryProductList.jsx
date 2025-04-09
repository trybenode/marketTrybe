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
  const { categoryId, categoryName: initialCategoryName } = route.params || {};
  const [categoryName, setCategoryName] = useState(initialCategoryName || '');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Reset state when parameters changes (used to fixed stall)
  useEffect(() => {
    setCategoryName(initialCategoryName || '');
    setProducts([]);
    setLoading(true);
    setError(null);
  }, [initialCategoryName]);
  // fetch category name
  useEffect(() => {
    const fetchCategoryName = async () => {
      if (categoryName || !categoryId) return;

      try {
        const categoryRef = doc(db, 'categories', categoryId);
        const categorySnap = await getDoc(categoryRef);
        if (categorySnap.exists()) {
          setCategoryName(categorySnap.data().name);
        } else {
          setError('Category not found');
        }
      } catch (err) {
        setError('Failed to load category');
        console.error(err);
      }
    };

    fetchCategoryName();
  }, [categoryId, categoryName]);

  const fetchProducts = async (isRefresh = false) => {
    try {
      if (!categoryName) return;

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const q = query(
        collection(db, 'products'),
        where('categoryId', '==', categoryName),
        orderBy('createdAt', 'desc'),
        limit(10)
      );

      const snapshot = await getDocs(q);
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        product: {
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        },
      }));

      setProducts(productsData);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  //fetch products
  useEffect(() => {
    fetchProducts();
  }, [categoryName]);

  const onRefresh = () => {
    fetchProducts(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader title={categoryName || 'Category'} extraComponent={<UserProfile />} />
      <View className="flex-1 px-4 py-3">
        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : error ? (
          <Text className="mt-4 text-center text-red-500">{error}</Text>
        ) : products.length === 0 ? (
          <Text className="text-center text-gray-500">No products found in this category</Text>
        ) : (
          <ListingCards products={products} onRefresh={onRefresh} refreshing={refreshing} />
        )}
      </View>
    </SafeAreaView>
  );
}

export default CategoryProductList;
