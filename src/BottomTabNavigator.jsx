import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import NavBar from './components/NavBar';
import FavouritesScreen  from './screens/FavouritesScreen';
import HistoryScreen from './screens/HistoryScreen';
import HomeScreen from './screens/HomeScreen';
import MessagesScreen from './screens/MessagesScreen';
import SellScreen from './screens/SellScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <NavBar {...props} />}>
      <Tab.Screen name="Market" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Favourite" component={FavouritesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Sell" component={SellScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
