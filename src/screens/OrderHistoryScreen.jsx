import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TestHeader from '../components/TestHeader';
import UserProfile from '../components/UserProfile';
const OrderHistoryScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <SafeAreaView className=" flex-1 bg-white">
      <TestHeader title="History Detail" extraComponent={<UserProfile />} />

      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold">{item.productName}</Text>
        <Text className="text-sm text-gray-500">Completed on: {item.date}</Text>
        <Text className="mt-2 text-lg">Status: {item.status}</Text>
        <Text className="text-lg">
          {item.status === 'Bought' ? `From: ${item.tradedWith}` : `To: ${item.tradedWith}`}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;
