//seller profile card used in myshop and shop screen
import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

const SellerProfileCard = memo(({ name, yearCreated, location, imageUrl }) => {
  return (
    <View className="flex-row rounded-lg bg-gray-100 gap-2 p-4 px-4">
      {/* Seller Profile Image */}
      <View className="overflow-hidden rounded-lg w-[120px] h-[140px]">
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode={FastImage.resizeMode.cover} 
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
          <Text className="mt-2 text-sm font-bold" style={{ width: '50%', flexWrap: 'wrap' }}>
            {location}
          </Text>
          <Text className="text-xs text-gray-600">Location</Text>
        </View>
      </View>
    </View>
  );
});

export default SellerProfileCard;
