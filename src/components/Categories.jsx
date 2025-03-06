import { View, Text, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

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
    image: 'https://www.pexels.com/photo/low-angle-view-of-shoes-322207/',
  },
  {
    id: '3',
    name: 'Home Appliances',
    image:
      'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '4',
    name: 'Foot Wear ',
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
    name: 'Hair Accesories ',
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

// useEffect(() => {
//   const fetchCategories = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'categories'));
//       const categoryList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setCategories(categoryList.length > 0 ? categoryList.slice(0, 6) : dummyCategories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };
//   fetchCategories();
// }, []);
const Categories = () => {
  //   const [categories, setCategories] = useState(dummyCategories);
  const navigation = useNavigation();
  return (
    <View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Categories</Text>
        <Button> see all </Button>
      </View>
      <FlatList
        data={categories.slice(0, 6)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductList', { categoryId: item.id })}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
            <Text style={{ padding: 10, fontSize: 18 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;
