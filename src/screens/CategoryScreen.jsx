import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

import CategoriesListing from '../components/CategoriesListing';
import CustomHeader from '../components/CustomHeader';

export default function CategoryScreen() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoryData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = async (categoryID, categoryName) => {
    try {
      setLoading(true);
      const productsQuery = query(collection(db, 'products'), where('categoryId', '==', `categories/${categoryID}`));
      const querySnapshot = await getDocs(productsQuery);

      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      navigation.navigate('ProductList', { categoryID, categoryName, products });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader screenName="MainTabs" title="All Available Categories" />

      <FlatList
        data={categories}
        showsHorizontalScrollIndicator={false}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 20 }}
        keyExtractor={(item) => item.id}
        className="mb-2 px-3 py-4"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleCategorySelect(item.id, item.name)}>
            <CategoriesListing {...item} name={item.name} icon={item.image} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
