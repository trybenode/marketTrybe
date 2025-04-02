import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ListingCards from '../components/ListingCards';
import UserProfile from '../components/UserProfile';
import { useFavorites } from '../hooks/FavoritesHook';
import TestHeader from '../components/TestHeader';

export default function FavouritesScreen() {
  const { products, loading, isFetchingMore, fetchFavorites, loadMore } = useFavorites();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader title="Favourites" screenName="Market" extraComponent={<UserProfile />} />
      <View className="flex-1 p-4">
        <ListingCards 
          products={products} 
          isFetchingMore={isFetchingMore}
          loadMoreProducts={loadMore}
        />
      </View>
    </SafeAreaView>
  );
}
