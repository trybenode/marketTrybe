import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';

import { listings } from '../data/dummyData';
import ListingCard from './ListingCard';

const ListingCards = memo(() => {
  const navigation = useNavigation();

  return (
    // Listings - 2 Columns
    <View style={{ flexBasis: '52%', paddingBottom: '20' }}>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        numColumns={2} // Ensure two columns
        columnWrapperStyle={{ justifyContent: 'space-between', flexWrap: 'wrap' }} // Add spacing between items
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ListingDetails', item.id)}
            className="mb-4 w-[48%]">
            <ListingCard {...item} />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

export default ListingCards;
