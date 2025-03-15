// import { useNavigation } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';
// import React, { memo } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const CustomHeader = memo(({ screenName, title, extraComponent }) => {
//   const navigation = useNavigation();

//   return (
//     <View className="relative h-20 flex-row items-center bg-white px-3">
//       <StatusBar />

//       {/* Left - Back Button */}
//       <View className="flex-1">
//         <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
//           <Ionicons name="arrow-back" size={30} color="black" />
//         </TouchableOpacity>
//       </View>

//       {/* Center - Title */}
//       <View className="flex-shrink">
//         <Text className="text-xl font-extrabold text-center">{title}</Text>
//       </View>

//       {/* Right - Extra component or placeholder */}
//       <View className="flex-1 items-end">
//         {typeof extraComponent === 'string' ? (
//           <Text>{extraComponent}</Text>
//         ) : extraComponent ? (
//           extraComponent
//         ) : (
//           <View style={{ width: 30 }} /> // Placeholder to balance layout
//         )}
//       </View>

//       {/* Bottom Shadow */}
//       <View style={styles.bottomShadow} />
//     </View>
//   );
// });

// export default CustomHeader;

// const styles = StyleSheet.create({
//   bottomShadow: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 3,
//     backgroundColor: '#0A0A0A',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 4,
//     zIndex: -1,
//   },
// });

import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomHeader = memo(({ screenName, title, extraComponent }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      <View className="relative h-16 flex-row items-center bg-white px-3">
        {/* Left - Back Button */}
        <View className="flex-1">
          <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {/* Center - Title */}
        <View className="flex-shrink">
          <Text className="text-xl font-extrabold text-center">{title}</Text>
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
    </SafeAreaView>
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