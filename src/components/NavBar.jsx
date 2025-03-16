//bottom navigation bar
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
    backgroundColor: '#292D34', // Dark gray background ECE8EF
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
    backgroundColor: '#ECE8EF', // Slightly lighter gray
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3, // Correct way to set border width
    borderColor: '#292D34', // Correct way to set border color
    borderStyle: 'solid', // Optional, default is solid
  },
  floatingButtonText: {
    fontSize: 45,
    marginBottom: 3,
    fontWeight: 'bold',
    color: '#292D34 ',
  },
});

export default NavBar;
