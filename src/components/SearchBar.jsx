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
  
  useEffect(()=>{
    const fetchProducts = async ()=>{
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'products'));
      const data = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
      setProducts(data);
      setFiltered(data);
      setLoading(false);
    }

    fetchProducts();
  },[])

  useEffect(() =>{
    if (!debounceQuery.trim() ){
      setFiltered(products);
      return;
    }

    const filteredData = products.filter(product => 
      product.name.toLowerCase().includes(debounceQuery.toLowerCase()) ||
      product.categoryId.toLowerCase().includes(debounceQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(debounceQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(debounceQuery.toLowerCase()) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(debounceQuery.toLowerCase())))

    ).map((prod) => ({
      id: prod.id,
      product: {
        ...prod,
        createdAt: prod.createdAt,
        updatedAt: prod.updatedAt,
      },
    }));
  onResults(filteredData, false)
    setFiltered(filteredData);
  }, [debounceQuery,products])

  useEffect(() => {
    if (onResults) {
      onResults(filtered, loading);
    }
  }, [filtered, loading]);

  const handleClearSearch = () =>{
    setSearchQuery('');
    Keyboard.dismiss();
    onResults([], false);
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
          <Ionicons 
          name="close-circle"
          size={30}
          color="blue"
          onPress={handleClearSearch} // Clear search
        />

        )
      }
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
