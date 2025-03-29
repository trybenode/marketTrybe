// custom header used on pages
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomHeader = memo(({ title, extraComponent }) => {
  const navigation = useNavigation();

  return (
    <View className="pt-2">
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      <View className="relative h-16 flex-row items-center bg-white px-3">
        {/* Left - Back Button */}
        <View className="flex-1">
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {/* Center - Title */}
        <View className="flex-shrink">
          <Text className="text-center text-xl font-extrabold">{title}</Text>
        </View>

        {/* Right - Extra component or placeholder */}
        <View className="flex-1 items-end">
          {typeof extraComponent === 'string' ? (
            <Text>{extraComponent}</Text>
          ) : extraComponent ? (
            extraComponent
          ) : (
            <View style={{ width: 30 }} /> // Placeholder to balance layout
          )}
        </View>
      </View>
      {/* Bottom Shadow */}
      <View style={styles.bottomShadow} />
    </View>
  );
});

export default CustomHeader;

const styles = StyleSheet.create({
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#0A0A0A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    zIndex: -1,
  },
});
