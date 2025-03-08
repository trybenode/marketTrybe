import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';

const UserProfile = memo(() => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')} className="flex flex-row">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-gray-300">
        <FontAwesome name="user" size={30} color="black" />
      </View>
    </TouchableOpacity>
  );
});

export default UserProfile;
