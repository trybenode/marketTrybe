import { Link } from 'expo-router';
import PropTypes from 'prop-types'; // Optional for type checking
import React from 'react';
import { Text, View, Pressable } from 'react-native';

export const ScreenContent = ({ title, path, children }) => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>Welcome to Market Trybe</Text>

      {/* Properly handle navigation */}
      <Link href="/login">
        <Pressable>
          <Text className="text-blue-500">Login</Text>
        </Pressable>
      </Link>

      <View className={styles.separator} />
      {children}
    </View>
  );
};

// Optional: Add PropTypes for validation
ScreenContent.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.node,
};

// Tailwind (NativeWind) styles
const styles = {
  container: 'items-center flex-1 justify-center',
  separator: 'h-[1px] my-7 w-4/5 bg-gray-200',
  title: 'text-xl font-bold',
};

export default ScreenContent;
