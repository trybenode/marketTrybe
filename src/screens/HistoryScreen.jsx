import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomHeader from '../components/CustomHeader';
import { dummyTradeHistory } from '../data/dummyData';
import TestHeader from '../components/TestHeader';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [tradeHistory, setTradeHistory] = useState(dummyTradeHistory);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row items-center justify-between border-b border-gray-200 p-4"
      onPress={() => navigation.navigate('HistoryDetial', { item })}>
      {/* Image Section */}
      <View className="w-20">
        <Image source={{ uri: item.productImage }} className="h-12 w-12 rounded" />
      </View>

      {/* Product Details Section */}
      <View className="mx-4 flex-1">
        <Text className="text-base font-bold">{item.productName}</Text>
        <Text className="text-sm text-gray-500">Completed on: {item.date}</Text>
        {/* <Text className="text-gray-600">${item.price}</Text> */}
      </View>

      {/* Status Section */}
      <View className="w-32">
        <Text
          className={`font-semibold ${
            item.status === 'Bought' ? 'text-green-500' : 'text-red-500'
          }`}>
          {item.status}
        </Text>
        <Text className="text-gray-600">
          {item.status === 'Bought' ? `from: ${item.tradedWith}` : `to: ${item.tradedWith}`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader title="Trade History" screenName="Market" />
      <FlatList
        data={tradeHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="p-3"
      />
    </SafeAreaView>
  );
};
export default HistoryScreen;
