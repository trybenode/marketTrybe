// import { useNavigation } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import CustomHeader from '../components/CustomHeader';
// import { dummyTradeHistory } from '../data/dummyData';
// import TestHeader from '../components/TestHeader';

// const HistoryScreen = () => {
//   const navigation = useNavigation();
//   const [tradeHistory, setTradeHistory] = useState(dummyTradeHistory);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       className="flex-row items-center justify-between border-b border-gray-200 p-4"
//       onPress={() => navigation.navigate('HistoryDetial', { item })}>
//       {/* Image Section */}
//       <View className="w-20">
//         <Image source={{ uri: item.productImage }} className="h-12 w-12 rounded" />
//       </View>

//       {/* Product Details Section */}
//       <View className="mx-4 flex-1">
//         <Text className="text-base font-bold">{item.productName}</Text>
//         <Text className="text-sm text-gray-500">Completed on: {item.date}</Text>
//         {/* <Text className="text-gray-600">${item.price}</Text> */}
//       </View>

//       {/* Status Section */}
//       <View className="w-32">
//         <Text
//           className={`font-semibold ${
//             item.status === 'Bought' ? 'text-green-500' : 'text-red-500'
//           }`}>
//           {item.status}
//         </Text>
//         <Text className="text-gray-600">
//           {item.status === 'Bought' ? `from: ${item.tradedWith}` : `to: ${item.tradedWith}`}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <TestHeader title="Trade History" screenName="Market" />
//       <FlatList
//         data={tradeHistory}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         className="p-3"
//       />
//     </SafeAreaView>
//   );
// };
// export default HistoryScreen;

import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TestHeader from '../components/TestHeader';

const HistoryScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader title="Coming Soon" />

      <View className="flex-1 justify-center self-center px-8">
        {/* <Image
          source={require('../assets/logo.png')}
          className="mb-8 h-32 w-32"
          resizeMode="contain"
        /> */}

        <Text className="mb-4 text-center text-2xl font-bold text-gray-800">
          Exciting Updates Coming Soon!
        </Text>

        <Text className="mb-6 text-center text-base leading-relaxed text-gray-600">
          We're working hard to bring you an enhanced experience. Our team is building powerful new
          features to better serve artisans and service providers.
        </Text>

        <View className="w-full rounded-lg bg-blue-50 p-4">
          <Text className="text-center font-medium text-blue-800">
            Stay tuned for our next release - we can't wait to show you what we've been working on!
          </Text>
        </View>

        <Text className="mt-8 text-center text-sm text-gray-400">
          Market Trybe - Your Pocket friendly Market Place
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;
