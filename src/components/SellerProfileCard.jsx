import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';

const SellerProfileCard = ({ name, yearCreated, location }) => {
  return (
    <View className="flex-row items-center rounded-xl bg-gray-100 p-4 shadow-md">
      {/* Placeholder for profile image */}
      <View className="h-24 w-24 rounded-xl bg-gray-200" />

      {/* Seller Details */}
      <View className="ml-4">
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="text-gray-500">Year created: {yearCreated}</Text>
        <Text className="text-gray-500">Location: {location}</Text>
      </View>
    </View>
  );
};

export default SellerProfileCard;
