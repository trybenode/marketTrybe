import React, { memo } from 'react';
import { View, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const ListingCard = ({ image, name, price, seller, btnName}) => {
  return (
    <Card className="m-2 overflow-hidden rounded-xl shadow-md">
      {/* Product Image */}
      <Image source={{ uri: image }} className="h-40 w-full" />

      <Card.Content>
        {/* Title and Price */}
        <Text className="text-base font-bold">{name}</Text>
        <Text className="mt-1 text-base font-bold">#{price}</Text>

        {/* Seller Info */}
        <View className="mt-2 flex-row items-center">
          <Text className="text- font-bold">{seller.name}</Text>
        </View>
      </Card.Content>

      {/* Actions */}
      <View className="flex items-center justify-center py-2">
        <Card.Actions>
          <Button mode="contained" buttonColor="#2563eb">
           {btnName}
          </Button>
        </Card.Actions>
      </View>
    </Card>
  );
};

export default ListingCard;
