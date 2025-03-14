import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useUser } from '../context/UserContext'; 
const UserProfile = memo(() => {
  const navigation = useNavigation();
  const { currentUser } = useUser(); 

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })}
      className="flex flex-row">
      
      <View className="h-12 w-12 items-center justify-center rounded-full bg-gray-300 overflow-hidden">
        {currentUser?.profilePicture ? (
          <Image
            source={{ uri: currentUser.profilePicture }}
            className="h-full w-full"
            resizeMode="cover"
          />
        ) : (
          <FontAwesome name="user" size={30} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );
});

export default UserProfile;

