import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const ListingCard = ({ product = {}, btnName = "View Details" }) => {
  // Ensure product is valid before accessing properties
  const imageUri =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : product.image || null;

  return (
    <Card className="m-2 overflow-hidden rounded-xl shadow-md">
      {/* Product Image */}
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          className="h-40 w-full"
          resizeMode="cover"
          progressiveRenderingEnabled
          fadeDuration={300}
        />
      ) : (
        <View className="h-40 w-full items-center justify-center bg-gray-200">
          <Text className="text-lg text-gray-500">No Image</Text>
        </View>
      )}

      <Card.Content>
        {/* Product Name */}
        <Text className="text-lg font-semibold" numberOfLines={1}>
          {product?.name || "Unnamed Product"}
        </Text>

        {/* Original Price */}
        {product.originalPrice ? (
          <Text className="mt-1 text-base font-bold line-through text-blue-600">
            ₦{product.originalPrice.toLocaleString()}
          </Text>
        ) : null}

        {/* Discounted Price */}
        <Text className="mt-1 text-base font-bold text-blue-900">
          ₦{product?.price?.toLocaleString() || "N/A"}
        </Text>
      </Card.Content>

      {/* Action Button */}
      <Card.Actions
        style={{
          marginTop: 8,
          marginHorizontal: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          mode="contained"
          labelStyle={{ fontSize: 16, width: '100%' }}
          buttonColor="#2563eb"
          style={{ width: '100%', paddingHorizontal: 8 }}>
          {btnName}
        </Button>
      </Card.Actions>
    </Card>
  );
};
export default ListingCard;