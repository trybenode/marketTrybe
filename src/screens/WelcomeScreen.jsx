import { View, Text, Pressable } from 'react-native'
import React from 'react'

export default function WelcomeScreen() {
  return (
    <View>
      <Text>Welcome To MarketTrybe</Text>

      <Pressable oncli>
        <Text>
            Get Started
        </Text>
      </Pressable>

    </View>
  )
}