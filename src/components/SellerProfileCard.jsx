import React, { memo, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import FastImage from 'react-native-fast-image';
import { auth, db } from '../../firebaseConfig';
import { useRoute } from '@react-navigation/native';

const SellerProfileCard = memo(({ sellerInfo }) => {
  const [user, setUser] = useState(null);
  const route = useRoute();

  const isOnShopScreen = route.name === 'Shop';

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const q = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUser(userData);
        } else {
          console.warn('No user found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserDetails();
  }, []);

  // const selleryearCreated = user.createdAt ? new Date(user.createdAt).getFullYear() : 'N/A';
  // const shopYearCreated = sellerInfo.createdAt ? new Date(sellerInfo.createdAt).getFullYear() : 'N/A';
  // const shopYear = isOnShopScreen ? shopYearCreated : selleryearCreated;

  if (!user) {
    return <Text className="text-center text-gray-600">User not found</Text>;
  }

  return (
    <View className="flex-row gap-2 rounded-lg bg-gray-100 p-4 px-4">
      {/* Seller Profile Image */}
      <View className="h-[140px] w-[120px] overflow-hidden rounded-lg">
        <Image
          source={
            isOnShopScreen
              ? { uri: sellerInfo.imageUrl || 'https://via.placeholder.com/120x140' }
              : { uri: user.profilePicture || 'https://via.placeholder.com/120x140' }
          }
          style={{ width: '100%', height: '100%' }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      <View className="w-full flex-col gap-6 pl-2">
        <View>
          <Text className="text-sm font-bold">
            {isOnShopScreen ? sellerInfo.fullName : user.fullName}
          </Text>
          <Text className="text-xs text-gray-600">Name</Text>
        </View>
        <View>
          <Text className="mt-2 text-sm font-bold">
            {isOnShopScreen
              ? sellerInfo.createdAt
                ? new Date(user.createdAt).getFullYear()
                : 'N/A'
              : user.createdAt
                ? new Date(user.createdAt).getFullYear()
                : 'N/A'}
          </Text>
          <Text className="text-xs text-gray-600">Year Created</Text>
        </View>
        <View className="flex-col">
          <Text className="mt-2 text-sm font-bold" style={{ width: '50%', flexWrap: 'wrap' }}>
            {isOnShopScreen ? sellerInfo.address || 'No Address' : user.address || 'No Address'}
          </Text>
          <Text className="text-xs text-gray-600">Location</Text>
        </View>
      </View>
    </View>
  );
});

export default SellerProfileCard;

