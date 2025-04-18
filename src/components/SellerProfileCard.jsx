import React, { memo, useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useRoute } from '@react-navigation/native';

const SellerProfileCard = memo(({ sellerInfo }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const selectedUser = isOnShopScreen ? sellerInfo : user;


  if (!selectedUser) {
    return (
      <Text className="text-center text-gray-600 py-4">User not found</Text>
    );
  }

  return (
    <View className="flex-row gap-2 rounded-lg bg-gray-100 p-4 px-4">
      {/* Seller Profile Image */}
      <View className="h-[140px] w-[120px] overflow-hidden rounded-lg bg-gray-300">
        <Image
          source={{
            uri: selectedUser.profilePicture || 'https://via.placeholder.com/120x140',
          }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>

      <View className="w-full flex-col gap-6 pl-2">
        <View>
          <Text className="text-sm font-bold">
            {selectedUser.fullName}
          </Text>
          <Text className="text-xs text-gray-600">Name</Text>
        </View>
        <View>
          <Text className="mt-2 text-sm font-bold">
            {selectedUser.createdAt
              ? new Date(selectedUser.createdAt).getFullYear()
              : 'N/A'}
          </Text>
          <Text className="text-xs text-gray-600">Year Created</Text>
        </View>
        <View className="flex-col">
          <Text className="mt-2 text-sm font-bold" style={{ width: '50%', flexWrap: 'wrap' }}>
            {selectedUser.address || 'No Address'}
          </Text>
          <Text className="text-xs text-gray-600">Location</Text>
        </View>
      </View>
    </View>
  );
});

export default SellerProfileCard;
