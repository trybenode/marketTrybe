import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import NavBar from '../components/NavBar';
import CategoryProductList from '../screens/CategoryProductList';
import EditProfileScreen from '../screens/EditProfileScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import TalentHubScreen from '../screens/TalentHubScreen';
import HomeScreen from '../screens/HomeScreen';
import KycScreen from '../screens/KycScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SellScreen from '../screens/SellScreen';
import SuccessKycScreen from '../screens/SuccessKycScreen';
import MyShopScreen from '../screens/MyShopScreen';



const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => {
      const currentRoute = props.state.routes[props.state.index].name;
      //  Hide NavBar only on SellScreen
      if (currentRoute === 'Sell') return null;
      return <NavBar {...props} />;
    }}>
      <Tab.Screen name="Market" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Favourite" component={FavouritesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Sell" component={SellScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="TalentHub" component={TalentHubScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Tab.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="SuccessKyc" component={SuccessKycScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Kyc" component={KycScreen} options={{ headerShown: false }} />
      <Tab.Screen
        name="ProductList"
        component={CategoryProductList}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="MyShop" component={MyShopScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
