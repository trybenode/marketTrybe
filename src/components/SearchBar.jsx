//search bar used on homepage

import React, { useState, useEffect, memo } from 'react';
import { View, TextInput, StyleSheet,Keyboard, Activi } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDebounce } from '../utils/useDebounce';
import {collection, doc, getDocs} from 'firebase/firestore'
import { db } from '../../firebaseConfig';

const SearchBar = ({ onResults}) => {

  const [products, setProducts] = useState([]);
  const [filtered,setFiltered] =useState([]);
  const [searchQuery, setSearchQuery]=useState('');
  const [loading, setLoading] = useState(true)
  
  const debounceQuery = useDebounce(searchQuery, 500)
  
  //product fetch
  useEffect(()=>{
    const fetchProducts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'products'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        product: {
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        },
      }));
      setProducts(data);
      setFiltered(data);
      setLoading(false);
    };

    fetchProducts();
  },[])

  //search query 
  useEffect(() => {
    if (!debounceQuery.trim()) {

      onResults([], false); // Send empty array and search inactive
      setFiltered(products);
    
      return;
    }
  
    const filteredData = products.filter(prod =>
      prod.product.name.toLowerCase().includes(debounceQuery.toLowerCase()) ||
      prod.product.categoryId.toLowerCase().includes(debounceQuery.toLowerCase()) ||
      prod.product.brand.toLowerCase().includes(debounceQuery.toLowerCase()) ||
      prod.product.subcategory.toLowerCase().includes(debounceQuery.toLowerCase()) ||
      (prod.product.tags && prod.product.tags.some(tag => tag.toLowerCase().includes(debounceQuery.toLowerCase())))
    );
  
    onResults(filteredData, true);
    setFiltered(filteredData);
  }, [debounceQuery, products]);
  


  const handleClearSearch = () =>{
    setSearchQuery('');
    Keyboard.dismiss();
  }
 
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="blue" />
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

{searchQuery.length > 0 && (
  <View className="flex-row items-center">
    {loading ? (
      <ActivityIndicator color="blue" style={{ marginRight: 8 }}  />
    ) : (
      <Ionicons 
        name="close-circle"
        size={30}
        color="blue"
        onPress={handleClearSearch}
      />
    )}
  </View>
)}
    </View>
  );
};

export default memo(SearchBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
});
