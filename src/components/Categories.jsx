import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, memo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Button } from 'react-native';

//dummyy data to be replaced
const categories = [
  {
    id: '1',
    name: 'Electronics',
    image:
      'https://images.pexels.com/photos/28771662/pexels-photo-28771662/free-photo-of-vintage-electronics-and-media-shelf-display.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    name: 'Clothing',
    image:
      'https://images.pexels.com/photos/8306370/pexels-photo-8306370.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    name: 'Home Appliances',
    image:
      'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '4',
    name: 'Foot Wear',
    image:
      'https://images.pexels.com/photos/6153367/pexels-photo-6153367.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '5',
    name: 'Jewelry',
    image:
      'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '6',
    name: 'Hair Accessories',
    image:
      'https://images.pexels.com/photos/30988728/pexels-photo-30988728/free-photo-of-elegant-flat-lay-of-beauty-accessories-on-magazine.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '7',
    name: 'Body Care',
    image:
      'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '8',
    name: 'Snacks',
    image:
      'https://images.pexels.com/photos/30957062/pexels-photo-30957062/free-photo-of-stack-of-delicious-homemade-chocolate-cookies.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

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
    <View className="fixed top-0">
      <View className="mx-1 mb-2 mt-14 flex flex-row items-center justify-between">
        <Text className="font-bold">Categories</Text>
        <TouchableOpacity
          onPress={() => console.log('See All Pressed')}
          className="rounded bg-blue-500 px-3 py-2">
          <Text className="font-semibold text-black">See All</Text>
        </TouchableOpacity>
      </View>
      {/* category listing */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories.slice(0, 6)}
        keyExtractor={(item) => item.id}
        className=" p-2"
        renderItem={({ item }) => (
          <TouchableOpacity
            accessible
            accessibilityLabel={`Category: ${item.name}`}
            onPress={() => navigation.navigate('ProductList', { categoryId: item.id })}
            className="items-center pl-2">
            <Image
              source={{ uri: item.image }}
              className="h-24 w-24 rounded-full"
              // onError={(e) => console.log('Image failed to load', e.nativeEvent.error)}
              // defaultSource={require('../assets/fallback-image.png')}
            />
            <Text className="font-light">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
});

export default CategoryList;
