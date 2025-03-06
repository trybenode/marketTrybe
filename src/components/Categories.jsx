import { View, Text, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const dummyCategories = [
  { id: '1', name: 'Electronics', image: '' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Home Appliances' },
];
const Categories = () => {
  const [categories, setCategories] = useState(dummyCategories);
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
