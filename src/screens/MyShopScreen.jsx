import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TestHeader from '../components/TestHeader';
import UserProfile from '../components/UserProfile';

export default function MyShopScreen() {
  return (
    <SafeAreaView>
      <TestHeader title="MyShop" extraComponent={<UserProfile />} />
      <Text>MyShopScreen</Text>
    </SafeAreaView>
  );
}
