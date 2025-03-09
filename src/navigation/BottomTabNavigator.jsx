import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import NavBar from '../components/NavBar';
import CategoryProductList from '../screens/CategoryProductList';
import CategoryScreen from '../screens/CategoryScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import KycScreen from '../screens/KycScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SellScreen from '../screens/SellScreen';
import SuccessKycScreen from '../screens/SuccessKycScreen';
// import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ShopScreen from '../screens/ShopScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
     tabBar={(props) => <NavBar {...props} />}>
      <Tab.Screen name="Market" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Favourite" component={FavouritesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Sell" component={SellScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      {/* <Tab.Screen
        name="ListingDetails"
        component={ListingDetailsScreen}
        options={{ headerShown: false }}
      /> */}
      <Tab.Screen name="Shop" component={ShopScreen} options={{ headerShown: false }} />
      <Tab.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="SuccessKyc" component={SuccessKycScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Kyc" component={KycScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Categories" component={CategoryScreen} options={{ headerShown: false }} />
      <Tab.Screen
        name="Products"
        component={CategoryProductList}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
