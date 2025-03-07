// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import Fontisto from '@expo/vector-icons/Fontisto';
// import React from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// function NavBar({ navigation }) {
//   const insets = useSafeAreaInsets(); // Fixed missing function call

//   return (
//     <>
//       <View className=" absolute bottom-0 left-0  right-0  flex-row justify-between  bg-gray-800 px-3 py-3 ">
//         {/* Left Side Buttons */}
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Market')}
//           className="items-center justify-center">
//           <FontAwesome name="home" size={24} color="white" />
//           <Text className="text-gray-300">Marketplace</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => navigation.navigate('Favourite')}
//           className=" items-center justify-center">
//           <Fontisto name="favorite" size={24} color="white" />
//           <Text className="text-gray-300">Favourites</Text>
//         </TouchableOpacity>

//         {/* Floating Button in Center */}
//         <View>
//           <TouchableOpacity
//             className=" -top-8 right-1/3  h-16 w-16 items-center justify-center rounded-full bg-gray-800"
//             onPress={() => navigation.navigate('Sell')}>
//             <Text className="text-4xl font-bold text-white">+</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Right Side Buttons */}
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Messages')}
//           className=" items-center justify-center">
//           <FontAwesome name="wechat" size={24} color="white" />
//           <Text className="text-gray-300">Messages</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => navigation.navigate('History')}
//           className="items-center justify-center">
//           <FontAwesome name="history" size={24} color="white" />
//           <Text className="text-gray-300">History</Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// }

// export default NavBar;

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

function NavBar({ navigation }) {
  return (
    <View style={styles.navContainer}>
      {/* Left Side Buttons */}
      <TouchableOpacity onPress={() => navigation.navigate('Market')} style={styles.navItem}>
        <FontAwesome name="home" size={24} color="white" />
        <Text style={styles.navText}>Marketplace</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Favourite')} style={styles.navItem}>
        <Fontisto name="favorite" size={24} color="white" />
        <Text style={styles.navText}>Favourites</Text>
      </TouchableOpacity>

      {/* Floating Button in Center */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('Sell')}>
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Right Side Buttons */}
      <TouchableOpacity onPress={() => navigation.navigate('Messages')} style={styles.navItem}>
        <FontAwesome name="wechat" size={24} color="white" />
        <Text style={styles.navText}>Messages</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('History')} style={styles.navItem}>
        <FontAwesome name="history" size={24} color="white" />
        <Text style={styles.navText}>History</Text>
      </TouchableOpacity>
    </View>
  );
}

// ✅ Normal CSS (StyleSheet)
const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2563eb', // Dark gray background
    paddingHorizontal: 16,
    paddingVertical: 22,
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    color: '#ccc', // Light gray text
    fontSize: 12,
    marginTop: 4,
  },
  floatingButtonContainer: {
    position: 'absolute',
    top: -27, // Moves button upwards
    left: '55%',
    transform: [{ translateX: -27 }], // Centers button
  },
  floatingButton: {
    height: 60,
    width: 60,
    borderRadius: '50%',
    backgroundColor: '#2563ed', // Slightly lighter gray
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 4, // Shadow effect on Android
    // shadowColor: '#000',
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // shadowOffset: { width: 0, height: 2 },
  },
  floatingButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default NavBar;
