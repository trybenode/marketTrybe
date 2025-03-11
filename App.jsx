import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { UserProvider } from './src/context/UserContext';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import CategoryProductList from './src/screens/CategoryProductList';
import CategoryScreen from './src/screens/CategoryScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';
import HomeScreen from './src/screens/HomeScreen';
import KycScreen from './src/screens/KycScreen';
import ListingDetailsScreen from './src/screens/ListingDetailsScreen';
import LoginScreen from './src/screens/LoginScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ShopScreen from './src/screens/ShopScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SuccessKycScreen from './src/screens/SuccessKycScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ChatScreen from './src/screens/ChatScreen';

import './global.css';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Market" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Kyc" component={KycScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SuccessKyc" component={SuccessKycScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Shop" component={ShopScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProductList" component={CategoryProductList} options={{ headerShown: false }} />
          <Stack.Screen name="Categories" component={CategoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Favourite" component={FavouritesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
