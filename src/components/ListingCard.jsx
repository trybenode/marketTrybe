//content of listing card
import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const ListingCard = ({ image, name, price, seller, btnName }) => {
  return (
    <Card className="m-2 overflow-hidden rounded-xl shadow-md">
      {/* Product Image */}
      {/* <Image source={{ uri: image }} className="h-40 w-full" /> */}
    
      {/* Product Image - Show first image or placeholder */}
      {/* {images?.length > 0 ? (
        <Image source={{ uri: images[0] }} className="h-40 w-full" />
      ) : (
        <View className="h-40 w-full bg-gray-200 items-center justify-center">
          <Text>No Image Available</Text>
        </View>
      )} */}
      {image ? (
        <Image source={{ uri: image }} className="h-40 w-full" resizeMode="cover" />
      ) : (
        <View className="h-40 w-full bg-gray-200 items-center justify-center">
          <Text className="text-gray-500">No Image</Text>
        </View>
      )}


      <Card.Content>
        {/* Title and Price */}
        <Text className="text-base font-bold" numberOfLines={1}>{name}</Text>
        <Text className="mt-1 text-base font-bold">#{price?.toLocaleString}</Text>

        {/* Seller Info */}
        <View className="mt-2 flex-row items-center">
          <Text className="text- font-bold">{seller.name}</Text>
        </View>
      </Card.Content>

      {/* Actions */}
      <View className="flex items-center justify-center">
        <Card.Actions>
          <Button
            mode="contained"
            labelStyle={{ fontSize: 16, width: '40%' }}
            buttonColor="#2563eb"
            className="px-2 w-full">
            {btnName}
          </Button>
        </Card.Actions>
      </View>
    </Card>
  );
};

export default ListingCard;
