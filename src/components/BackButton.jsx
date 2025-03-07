import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';

const BackButton = memo(() => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')} className="mb-4">
      <Ionicons name="arrow-back" size={30} color="black" />
    </TouchableOpacity>
  );
});

export default BackButton;
