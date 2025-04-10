import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TestHeader from '../components/TestHeader';
import { Ionicons } from '@expo/vector-icons';

const TalentHubScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <TestHeader title="TalentHub" />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4F46E5" />
        </View>
      </SafeAreaView>
    );
  }
  const handlePress = () => {
    Linking.openURL('https://trybenode.space/about');
  };

  const openWaitlist = () => {
    // Linking.openURL('add google form link');
  };

  const contactSupport = () => {
    Linking.openURL('mailto:trybe@bookingagentreservation.com');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader title="TalentHub" />
      <ScrollView>
        <View className="flex-1 justify-center self-center px-8">
          {/* Hero Image/Icon */}
          <View className="my-6 items-center">
            <Ionicons name="rocket" size={20} color="#4F46E5" />
          </View>

          <Text className="mb-4 text-center text-2xl font-bold text-gray-900">
            Exciting Updates Coming Soon!
          </Text>

          <Text className="mb-6 text-center text-base leading-relaxed text-gray-600">
            We're revolutionizing how artisans and service providers connect with clients. Our team
            is working hard building a new features for this purpose Our next release will include:
          </Text>

          {/* Feature List */}
          <View className="mb-8">
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text className="ml-2 text-gray-700">Portfolio showcase for creatives</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text className="ml-2 text-gray-700">Real-time booking system</Text>
            </View>
          </View>

          {/* CTA Card */}
          <View className="mb-6 w-full rounded-xl bg-indigo-50 p-5">
            <Text className="mb-3 text-center text-lg font-semibold text-indigo-800">
              Join our exclusive waitlist!
            </Text>
            <Text className="mb-4 text-center text-sm text-indigo-600">
              Stay tuned for our next release - we can't wait to show you what we've been working
              on! Be the first to access new features and get special early-bird perks.
            </Text>
            <TouchableOpacity
              onPress={openWaitlist}
              className="items-center rounded-lg bg-indigo-600 px-6 py-3">
              <Text className="font-medium text-white">Reserve My Spot</Text>
            </TouchableOpacity>
          </View>

          {/* Additional Links */}
          <View className="mb-8  flex-row justify-around">
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.linkText}>
                <Ionicons name="globe" size={16} color="#3B82F6" /> Website
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={contactSupport}>
              <Text style={styles.linkText}>
                <Ionicons name="mail" size={16} color="#3B82F6" /> Contact Us
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="mt-2 text-center text-sm text-gray-400">
            Market Trybe - Your Personal Pocket Marketplace
          </Text>
          {/* <Text className="mt-1 text-center text-xs text-gray-400">
          Version 1.0.0 • Coming Summer 2025
        </Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  linkText: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
  },
});

export default TalentHubScreen;
