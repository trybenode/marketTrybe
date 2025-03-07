import React, { memo } from 'react';
import { View, FlatList } from 'react-native';

import ListingCard from './ListingCard';

const ListingCards = memo(() => {
  // Dummy Listings (Replace with real data)
  const listings = [
    {
      id: '1',
      title: 'Leather Shoes',
      price: '45.00',
      image: 'https://via.placeholder.com/150',
      seller: { name: 'John Doe', avatar: 'https://via.placeholder.com/50' },
    },
    {
      id: '2',
      title: 'Wrist Watch',
      price: '75.00',
      image: 'https://via.placeholder.com/150',
      seller: { name: 'Jane Doe', avatar: 'https://via.placeholder.com/50' },
    },
    {
      id: '3',
      title: 'Backpack',
      price: '50.00',
      image: 'https://via.placeholder.com/150',
      seller: { name: 'Mike Smith', avatar: 'https://via.placeholder.com/50' },
    },
    {
      id: '4',
      title: 'Headphones',
      price: '120.00',
      image: 'https://via.placeholder.com/150',
      seller: { name: 'Alice Brown', avatar: 'https://via.placeholder.com/50' },
    },
  ];
  return (
    // Listings - 2 Columns
    <View className="flex-1">
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        numColumns={2} // Ensure two columns
        columnWrapperStyle={{ justifyContent: 'space-between' }} // Add spacing between items
        renderItem={({ item }) => (
          <View className="mb-4 w-[48%]">
            <ListingCard {...item} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

export default ListingCards;
