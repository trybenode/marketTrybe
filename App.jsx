import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import KycScreen from './src/screens/KycScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import './global.css';
import SuccessKycScreen from './src/screens/SuccessKycScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import ListingDetailsScreen from './src/screens/ListingDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Favourite"
          component={FavouritesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Market" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Kyc" component={KycScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="SuccessKyc"
          component={SuccessKycScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
