import React from 'react';
import { View, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

const SellerProfileCard = ({ name, yearCreated, location, imageUrl }) => {
  return (
    <View className="flex-row items-center justify-between rounded-lg bg-gray-100 p-4 px-1">
      {/* Seller Profile Image */}
      <View className="overflow-hidden rounded-lg">
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 130, height: 130 }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <View className="w-full flex-col gap-6 pl-2">
        <View>
          <Text className="text-sm font-bold">{name}</Text>
          <Text className="text-xs text-gray-600">Name</Text>
        </View>
        <View>
          <Text className="mt-2 text-sm font-bold">{yearCreated}</Text>
          <Text className="text-xs text-gray-600">Year Created</Text>
        </View>
        <View className="flex-col">
          <Text className="mt-2 text-sm font-bold" style={{ width: '60%' }}>
            {location}
          </Text>
          <Text className="text-xs text-gray-600">Location</Text>
        </View>
      </View>
    </View>
  );
};

export default SellerProfileCard;
