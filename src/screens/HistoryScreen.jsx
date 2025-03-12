import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dummyTradeHistory } from '../data/dummyData';
import TestHeader from '../components/TestHeader';
import { useNavigation } from '@react-navigation/native';
// import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [tradeHistory, setTradeHistory] = useState(dummyTradeHistory);
  // const [boughtItems, setBoughtItems] = useState([]);
  // const [soldItems, setSoldItems] = useState([]);
  // const auth = getAuth();
  // const db = getFirestore();

  // useEffect(() => {
  //   fetchTradeHistory();
  // }, []);

  // const fetchTradeHistory = async () => {
  //   try {
  //     const userId = auth.currentUser?.uid;
  //     if (!userId) return;

  //     // Query trades where the user is the buyer
  //     const boughtQuery = query(
  //       collection(db, 'trades'),
  //       where('buyerId', '==', userId),
  //       where('status', '==', 'completed') // Filter completed trades
  //     );

  //     const boughtSnapshot = await getDocs(boughtQuery);
  //     const boughtData = boughtSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     setBoughtItems(boughtData);

  //     // Query trades where the user is the seller
  //     const soldQuery = query(
  //       collection(db, 'trades'),
  //       where('sellerId', '==', userId),
  //       where('status', '==', 'completed')
  //     );

  //     const soldSnapshot = await getDocs(soldQuery);
  //     const soldData = soldSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     setSoldItems(soldData);
  //   } catch (error) {
  //     console.error('Error fetching trade history:', error);
  //   }
  // };

  const renderItem = ({ item }) => (
    <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-200 p-4"
    onPress={() => navigation.navigate('Chat', { user: item.user, product: item.product })}>
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
    <SafeAreaView className="flex-1 p-3">
      <TestHeader title="Trade History" />
      <FlatList data={tradeHistory} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  );
};
export default HistoryScreen;
