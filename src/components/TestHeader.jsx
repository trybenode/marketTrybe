import { useNavigation } from '@react-navigation/native'; // ✅ Correct way
import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TestHeader = ({title, extraComponent}) => {
  const navigation = useNavigation(); // ✅
 
   return (
     <View className="mb-2 flex-row items-center justify-between p-2">
       <TouchableOpacity onPress={() => navigation.goBack()}>
         <Ionicons name="arrow-back" size={30} color="black" />
       </TouchableOpacity>
       <Text className="text-xl font-extrabold">{title}</Text>
       {extraComponent || <View />}
     </View>
   );
}

export default TestHeader