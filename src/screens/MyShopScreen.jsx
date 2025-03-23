// import { useNavigation } from '@react-navigation/native';
// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { auth } from '../../firebaseConfig';

// import CustomHeader from '../components/CustomHeader';
// import ListingCard from '../components/ListingCard';
// import SellerProfileCard from '../components/SellerProfileCard';
// import UserProfile from '../components/UserProfile';
// import { listings } from '../data/dummyData'; // Import your product data

// export default function MyShopScreen() {
//   const navigation = useNavigation();
//   const currentUser = auth.currentUser;

//   const hasProducts = listings.length > 0;
//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <CustomHeader screenName="Profile" title="MyShop" extraComponent={<UserProfile />} />
//       <ScrollView showsVerticalScrollIndicator={false} className="mb-20 flex-1 p-3 pb-20">
//         {hasProducts ? (
//           <>
//             <SellerProfileCard
//               name="Moradeyo Abdullah"
//               yearCreated="2025"
//               location="Room 120 Independence, Boy's Hostel"
//               imageUrl="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
//             />
//             <View className=" mt-4  flex-row flex-wrap justify-between mb-10 px-2">
//               {listings.map((product) => (
//                 <View key={product.id} className="mb-4 w-[48%]">
//                   <TouchableOpacity onPress={() => navigation.navigate('Sell', { product })}>
//                     <ListingCard   userIdFilter={currentUser?.uid} btnName="Edit" />
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </View>
//           </>
//         ) : (
//           <View className=" flex-1 items-center  justify-center px-4 ">
//             <Text className="text-center text-lg text-red-600">
//               You haven't uploaded any products yet.
//             </Text>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('Sell')} // No product for uploading
//               className="mt-4 rounded-lg bg-blue-500 px-6 py-2">
//               <Text className="text-center text-white">Click here to get started</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

import CustomHeader from '../components/CustomHeader';
import ListingCards from '../components/ListingCards'; // Changed to ListingCards component
import SellerProfileCard from '../components/SellerProfileCard';
import UserProfile from '../components/UserProfile';

export default function MyShopScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const currentUser = auth.currentUser;
  const hasProduct = userProducts.length > 0 || userProfile; //change to properly check user detail 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (currentUser) {
          const userDoc = await getDocs(
            query(collection(db, 'users'), where('userId', '==', currentUser.uid))
          );
          if (!userDoc.empty) {
            setUserProfile(userDoc.docs[0].data());
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const fetchUserProducts = async () => {
      try {
        if (currentUser) {
          const productQuery = query(
            collection(db, 'products'),
            where('userId', '==', currentUser.uid)
          );
          const productDocs = await getDocs(productQuery);
          const products = productDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setUserProducts(products);
        }
      } catch (error) {
        console.error('Error fetching user products:', error);
      }
    };
    const fetchData = async () => {
      await fetchUserProfile();
      await fetchUserProducts();
      setLoading(false);
    };
    fetchData();
  }, [currentUser]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader screenName="Profile" title="MyShop" extraComponent={<UserProfile />} />

      <View  className=" flex-1  pb-20 p-3">
        {/* //sellers detail  */}
        {hasProduct ? (
          <>
            {/* {userProfile ? ( */}
            <SellerProfileCard
              // name={userProfile.displayName || 'Add name in profile settings'}
              // yearCreated={new Date(userProfile.metadata.creationTime).getFullYear()}
              // location={userProfile.location || 'Add location in profile settings'}
              // imageUrl={userProfile.photoURL || 'https://via.placeholder.com/150'}
              name={"Wilson's Shop"}
              yearCreated={2025}
              location={'Old Admins Block'}
              imageUrl={'https://via.placeholder.com/150'}
            />
            //{' '}
            <ScrollView showsVerticalScrollIndicator={false} className=" flex-1 mt-2  ">
              <ListingCards products={userProducts} btnName={"edit"} showHeader={false} />
            </ScrollView>
          </>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-center text-lg text-gray-500">
              You haven't uploaded any products yet.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Sell')}
              className="mt-4 rounded-lg bg-blue-500 px-6 py-2">
              <Text className="text-center text-white">Add New Product</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
