import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text, Avatar, Button } from 'react-native-paper';

const ListingCard = ({ image, title, price, seller, onPress }) => {
  return (
    <Card className="m-2 rounded-xl overflow-hidden shadow-md" onPress={onPress}>
      {/* Product Image */}
      <Image source={{ uri: image }} className="w-full h-40" />

      <Card.Content>
        {/* Title and Price */}
        <Text className="text-lg font-semibold">{title}</Text>
        <Text className="text-teal-600 font-bold mt-1">${price}</Text>

        {/* Seller Info */}
        <View className="flex-row items-center mt-2">
          <Text className="text-lg font-bold">{seller.name}</Text>
        </View>
      </Card.Content>

      {/* Actions */}
      <Card.Actions className="flex-col items-center">
      <Button mode="contained" buttonColor="#2563eb">View Product</Button>
      </Card.Actions>
    </Card>
  );
};

export default ListingCard;
