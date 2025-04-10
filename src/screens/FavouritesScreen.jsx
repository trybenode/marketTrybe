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
      <TestHeader title="Favourites" extraComponent={<UserProfile />} />
      <View edges={['bottom']} className="flex-1 px-4 pt-2">
        <ListingCards
          products={products}
          isFetchingMore={isFetchingMore}
          loadMoreProducts={loadMore}
        />
      </View>
    </SafeAreaView>
  );
}
