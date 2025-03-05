// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import LoginScreen from './src/screens/LoginScreen';
// import SignUpScreen from './src/screens/SignUpScreen';
// import HomeScreen from './src/screens/HomeScreen';
// import CustomDrawer from './src/screens/CustomDrawer';
// import './global.css';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// // 🎯 Drawer Navigator (For Main App)
// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawer {...props} />}
//       screenOptions={{ headerShown: false }}>
//       <Drawer.Screen name="Home" component={HomeScreen} />
//     </Drawer.Navigator>
//   );
// }

// // 🎯 Main App (Handles Login/Signup before showing Drawer)
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="Drawer" component={DrawerNavigator} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import LoginScreen from './src/screens/LoginScreen';
// import SignUpScreen from './src/screens/SignUpScreen';
// import HomeScreen from './src/screens/HomeScreen';
// import CustomDrawer from './src/screens/CustomDrawer';
// import './global.css';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// // 🎯 Drawer Navigator (For Main App)
// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawer {...props} />}
//       screenOptions={{ headerShown: false }}>
//       <Drawer.Screen name="Home" component={HomeScreen} />
//     </Drawer.Navigator>
//   );
// }

// // 🎯 Main App (Handles Login/Signup before showing Drawer)
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="Drawer" component={DrawerNavigator} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
