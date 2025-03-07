import { View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Carousel from 'react-native-reanimated-carousel';
import BackButton from "../components/BackButton";
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
function ListingDetailsScreen({ route }) {
  const ID = route.params;
  const navigation = useNavigation();
  const images = [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300/111",
    "https://via.placeholder.com/300/222",
  ];
  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="flex-row items-center justify-between">
        {/* Back to Homepage */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <BackButton />
        </TouchableOpacity>

        {/* Add to Favourites */}
        <TouchableOpacity className="flex items-center space-y-1">
          <Fontisto name="favorite" size={24} color="black" />
          <Text className="text-lg text-black mt-2">Add to Favourites</Text>
        </TouchableOpacity>
      </View>

      <View>
      {/* <Carousel
        loop
        width={width}
        height={250}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={500}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            resizeMode="cover"
          />
        )}
      /> */}
    </View>
    </SafeAreaView>
  );
}

export default ListingDetailsScreen;
