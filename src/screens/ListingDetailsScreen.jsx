import { View, Text } from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';

function ListingDetailsScreen({ route }) {
  const ID = route.params;

  return (
    <SafeAreaView>
      <View className="flex-1 justify-center">
        <Text className="text-center"> Na Allen Shop be this {ID}</Text>
      </View>
    </SafeAreaView>
  );
}

export default ListingDetailsScreen;
