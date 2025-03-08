import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';

function ListingDetailsScreen({ route }) {
  const ID = route.params;
  const navigation = useNavigation();

  const images = [
    { id: '1', url: 'https://via.placeholder.com/300' },
    { id: '2', url: 'https://via.placeholder.com/300/111' },
    { id: '3', url: 'https://via.placeholder.com/300/222' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="flex-row items-center justify-between">
        {/* Back to Homepage */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <BackButton screenName="MainTabs" />
        </TouchableOpacity>

        {/* Add to Favourites */}
        <TouchableOpacity className="flex items-center space-y-1">
          <Fontisto name="favorite" size={24} color="black" />
          <Text className="mt-2 text-lg text-black">Add to Favourites</Text>
        </TouchableOpacity>
      </View>

      {/* Image Carousel */}
      <View className="mt-4">
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.url }}
              style={{ width: 300, height: 300, borderRadius: 10, marginRight: 10 }}
              resizeMode="cover"
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default ListingDetailsScreen;
