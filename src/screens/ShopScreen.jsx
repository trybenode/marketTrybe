import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Text, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import TestHeader from '../components/TestHeader';
import ListingCard from '../components/ListingCard';
import SellerProfileCard from '../components/SellerProfileCard';
import UserProfile from '../components/UserProfile';

export default function ShopScreen({ route }) {
  const navigation = useNavigation();
  const { sellerInfo, sellerProducts = [] } = route.params || {};
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log('ShopScreen route params:', route.params);
    if (!route.params?.sellerInfo) {
      console.warn('No sellerInfo in route params');
    }
  }, [route.params]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (!sellerInfo) {
        console.warn('No sellerInfo object found');
        Alert.alert('Error', 'Cannot refresh - missing seller information');
        return;
      }

      const sellerId = sellerInfo.uid;
      if (!sellerId) {
        console.warn('No seller ID found in sellerInfo:', sellerInfo);
        Alert.alert('Error', 'Cannot refresh - invalid seller information');
        return;
      }

      const freshProducts = await fetchSellerProducts(sellerId);
      navigation.setParams({
        ...route.params,
        sellerProducts: freshProducts,
      });
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchSellerProducts = async (sellerId) => {
    try {
      if (!sellerId) {
        console.warn('No sellerId provided');
        Alert.alert('Error', 'Cannot fetch products - missing seller ID');
        return [];
      }

      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('userId', '==', sellerId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Failed to refresh products. Please try again later.', [{ text: 'OK' }]);
      return [];
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader
        title={sellerInfo?.fullName ? `${sellerInfo.fullName}'s shop` : 'Seller Shop'}
        extraComponent={<UserProfile />}
      />

      <FlatList
        className="mb-3 px-1"
        contentContainerStyle={{ padding: 12 }}
        data={sellerProducts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="mb-4">
            <SellerProfileCard
              sellerInfo={sellerInfo}
              name={sellerInfo?.fullName || 'Unknown Seller'}
              yearCreated={sellerInfo?.yearCreated || 'N/A'}
              location={sellerInfo?.address || 'Unknown Location'}
              imageUrl={sellerInfo?.imageUrl || 'https://via.placeholder.com/150'}
            />
          </View>
        }
        renderItem={({ item: product }) => (
          <View className="mb-4 w-[48%]">
            <TouchableOpacity
              onPress={() => {
                if (product) navigation.navigate('ListingDetails', { product });
              }}>
              <ListingCard product={product} btnName="View" />
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListEmptyComponent={
          <Text className="mt-6 text-center text-gray-500">
            No other products found for {sellerInfo?.fullName || 'this seller'}
          </Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2563eb']}
            tintColor="#2563eb"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import TestHeader from '../components/TestHeader';
// import ListingCard from '../components/ListingCard';
// import SellerProfileCard from '../components/SellerProfileCard';
// import UserProfile from '../components/UserProfile';

// export default function ShopScreen({ route }) {
//   const navigation = useNavigation({ route });
//   const { sellerInfo, sellerProducts = [] } = route.params || {};
//   // const sellerProducts = listings.filter((product) => product.userId === sellerInfo.id);

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <TestHeader title={sellerInfo.fullName + "'s shop"} extraComponent={<UserProfile />} />
//       <ScrollView className="mb-3 flex-col p-3" showsVerticalScrollIndicator={false}>
//         {/* Profile Header */}
//         <SellerProfileCard
//           sellerInfo={sellerInfo}
//           name={sellerInfo.fullName || 'Unknown Seller'}
//           yearCreated={sellerInfo.yearCreated || 'N/A'}
//           location={sellerInfo.address || 'Unknown Location'}
//           imageUrl={sellerInfo.imageUrl || 'https://via.placeholder.com/150'}
//         />

//         {/* Product List displaying Only Seller's Products */}
//         {sellerProducts.length > 0 ? (
//           <View className="mt-4 flex-row flex-wrap justify-between px-2">
//             {sellerProducts.map((product) => (
//               <View key={product.id} className="mb-4 w-[48%]">
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('ListingDetails', { product })}>
//                   <ListingCard product={product} btnName="View" />
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </View>
//         ) : (
//           <Text className="mt-6 text-center text-gray-500">
//             No other products found for {sellerInfo.fullName}
//           </Text>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
