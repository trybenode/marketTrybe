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
          <Avatar.Image size={30} source={{ uri: seller.avatar }} />
          <Text className="ml-2 text-sm">{seller.name}</Text>
        </View>
      </Card.Content>

      {/* Actions */}
      <Card.Actions className="flex-row justify-between">
        <Button mode="contained" className="bg-gray-800">View</Button>
        <Button mode="text" className="text-gray-700">Favorite</Button>
      </Card.Actions>
    </Card>
  );
};

export default ListingCard;
