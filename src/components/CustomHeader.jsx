// import { useNavigation } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';
// import React, { memo } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const CustomHeader = memo(({ screenName, title, extraComponent }) => {
//   const navigation = useNavigation();

//   return (
//     <View className="relative h-20 flex-row items-center justify-between px-3">
//       <StatusBar />
//       {/* Left - Back Button */}
//       <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
//         <Ionicons name="arrow-back" size={30} color="black" />
//       </TouchableOpacity>

//       {/* Center - Title */}
//       <Text className="absolute left-1/2 -translate-x-1/2 text-xl font-extrabold">{title}</Text>

//       {/* Right - Extra component or placeholder */}
//       <View>
//         {typeof extraComponent === 'string' ? (
//           <Text>{extraComponent}</Text> // wrap strings properly
//         ) : extraComponent ? (
//           extraComponent
//         ) : (
//           <View style={{ width: 30 }} /> // Placeholder to balance layout
//         )}
//       </View>
//     </View>
//   );
// });

// export default CustomHeader;

import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomHeader = memo(({ screenName, title, extraComponent }) => {
  const navigation = useNavigation();

  return (
    <View className="relative h-20 flex-row items-center justify-between bg-white px-3">
      <StatusBar />

      {/* Left - Back Button */}
      <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      {/* Center - Title */}
      <Text className="absolute left-1/2 -translate-x-1/2 text-xl font-extrabold">{title}</Text>

      {/* Right - Extra component or placeholder */}
      <View>
        {typeof extraComponent === 'string' ? (
          <Text>{extraComponent}</Text>
        ) : extraComponent ? (
          extraComponent
        ) : (
          <View style={{ width: 30 }} /> // Placeholder to balance layout
        )}
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
    height: 3, // Small height to make the shadow appear like a line
    backgroundColor: '#0A0A0A',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 }, // Shadow only downwards
    shadowOpacity: 0.1,
    shadowRadius: 3,

    elevation: 4,
    zIndex: -1, // Ensure it stays behind content if needed
  },
});
