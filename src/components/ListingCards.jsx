//rendered product listing item
import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Alert, Text, ActivityIndicator } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

import ListingCard from './ListingCard';

const ListingCards = memo(({ data, buttomPad = 100, }) => {
  const navigation = useNavigation();
  const [listingFetched, setListingFetched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductListings = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc')); //query to get products from firestore with optionaal sorting
        const querySnapshot = await getDocs(q); //get documents from firestore
        // const unsubscribe = onSnapshot(q, (querySnapshot) => { test with real-time listner also
        const productListingData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), //spread operator to get all data from firestore mapping document with their id and data
        }));

        setListingFetched(productListingData); //set fetched data to state
      } catch (error) {
        setError(error.message); //set error to state
        Alert.alert('An error occurred while fetching product listings');
      } finally {
        setIsLoading(false); //set loading to false
      }
      // unsubscribe in cleanup
      //return () => unsubscribe();
    };
    fetchProductListings(); //call fetchProductListings function
  }, []);

  if (isLoading) {
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#2563eb" />
    </View>;
  }
  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    // Listings - 2 Columns
    <View style={{ flex: 1, paddingBottom: buttomPad, paddingHorizontal: '3px' }}>
      <FlatList
        // data={data}
        data={listingFetched}
        keyExtractor={(item) => item.id}
        numColumns={2} // Ensure two columns
        columnWrapperStyle={{
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }} // Add spacing between items
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ListingDetails', { itemId: item.id })}
            className="mb-4 w-[48%]">
            <ListingCard
              // {...item}
              images={item.images?.[0]}
              name={item.name}
              price={item.price}
              btnName="view"
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

export default ListingCards;
