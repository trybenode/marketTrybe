import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import ListingCard from './ListingCard';

const ListingCards = memo(
  ({ products = [], isFetchingMore, loadMoreProducts, onRefresh, refreshing, bottomPad = 100 }) => {
    const navigation = useNavigation();

    if (!products.length) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">No products found</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingHorizontal: 3 }}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
          removeClippedSubviews={true}
          columnWrapperStyle={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ListingDetails', {
                  product: {
                    ...item.product,
                    createdAt:
                      item.product.createdAt instanceof Date
                        ? item.product.createdAt.toISOString()
                        : null,
                  },
                  itemId: item.id,
                })
              }
              className="mb-4 w-[48%]">
              <ListingCard product={item.product} btnName="View" />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            isFetchingMore ? <ActivityIndicator size="small" color="#2563eb" /> : null
          }
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={!!refreshing}
                onRefresh={onRefresh}
                colors={['#2563eb']}
                tintColor="#2563eb"
              />
            ) : undefined
          }
        />
      </View>
    );
  }
);

export default ListingCards;
