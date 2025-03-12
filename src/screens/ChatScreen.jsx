import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../components/CustomHeader'
import Options from '../components/Options'

export default function ChatScreen() {
  return (
   <SafeAreaView className='flex-1 bg-white p-2'>
    <CustomHeader title="Chat" screenName="Messages" extraComponent={<Options />} />
        <View className=''>
            <Text className='text-2xl font-bold'>Chat Screen</Text>
        </ View>

   </SafeAreaView>
  )
}

