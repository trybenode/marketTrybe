//rendered categories 
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, memo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { categories } from '../data/dummyData';
import CategoriesListing from './CategoriesListing';

const CategoryList = memo(() => {
  //   const [categories, setCategories] = useState(dummyCategories);
  const navigation = useNavigation();

  //   useEffect(() => {
  //     const fetchCategories = async () => {
  //       try {
  //         const querySnapshot = await getDocs(collection(db, 'categories'));
  //         const categoryList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //         setCategories(categoryList.length > 0 ? categoryList.slice(0, 6) : dummyCategories);
  //       } catch (error) {
  //         console.error('Error fetching categories:', error);
  //       }
  //     };
  //     fetchCategories();
  //   }, []);

  return (
    <View className=" mt-1">
      <View className="mx-1 mb-2 flex flex-row items-center justify-between">
        <Text className="w-1/3 text-xl font-semibold">Categories</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Categories')}
          className="rounded bg-blue-500 px-3 py-2">
          <Text className="font-semibold text-white">See All</Text>
        </TouchableOpacity>
      </View>
      {/* category listing */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories.slice(0, 6)}
        keyExtractor={(item) => item.id}
        className=" p-2"
        renderItem={({ item }) => <CategoriesListing {...item} />}
      />
    </View>
  );
});

export default CategoryList;
