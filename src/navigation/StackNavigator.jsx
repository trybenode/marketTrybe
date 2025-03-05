// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React from 'react';
// import { TouchableOpacity } from 'react-native';

// import BottomTabNavigator from './BottomTabNavigator';
// import ProfileScreen from '../screens/ProfileScreen';
// import SellScreen from '../screens/SellScreen';

// const Stack = createNativeStackNavigator();
// // 
// export default function StackNavigator() {
//   return (
//     <Stack.Navigator>
//       {/* Main Tab Screens */}
//       <Stack.Screen
//         name="MainTabs"
//         component={BottomTabNavigator}
//         options={({ navigation }) => ({
//           headerShown: false,
//           headerRight: () => (
//             <TouchableOpacity
//               onPress={() => navigation.navigate('Profile')}
//               style={{ marginRight: 15 }}>
//               <FontAwesome name="user-circle-o" size={24} color="black" />
//             </TouchableOpacity>
//           ),
//         })}
//       />

//       {/* Non-Tab Screens */}
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//       <Stack.Screen name="Sell" component={SellScreen} />
//     </Stack.Navigator>
//   );
// }
