import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text, Avatar, Button } from 'react-native-paper';

const ListingCard = ({ image, title, price, seller, onPress }) => {
  return (
    <Card className="m-2 overflow-hidden rounded-xl shadow-md" onPress={() => navigation.navigate('ProductDetails')}>
      {/* Product Image */}
      <Image source={{ uri: image }} className="h-40 w-full" />

      <Card.Content>
        {/* Title and Price */}
        <Text className="text-lg font-semibold">{title}</Text>
        <Text className="mt-2 text-lg font-bold">#{price}</Text>

        {/* Seller Info */}
        <View className="mt-2 flex-row items-center">
          <Text className="text-lg font-bold">{seller.name}</Text>
        </View>
      </Card.Content>

      {/* Actions */}
      <View className="flex items-center justify-center py-2">
        <Card.Actions>
          <Button mode="contained" buttonColor="#2563eb">
            View Product
          </Button>
        </Card.Actions>
      </View>
    </Card>
  );
};

export default ListingCard;
