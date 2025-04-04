import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import ListingCard from './ListingCard';
import { db } from '../../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const UserDetailsAndRelatedProducts = ({ productId }) => {
  const navigation = useNavigation();
  const [sellerInfo, setSellerInfo] = useState(null);
  const [sellerProducts, setSellersProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!productId) {
      console.error('Error: productId is undefined or null.');
      return;
    }

    const fetchData = async () => {
      try {
        console.log('Fetching data for product ID:', productId);

        //  Fetch the selected product details based on product id
        const productRef = doc(db, 'products', productId);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          console.error('Error: Product not found.');
          return;
        }

        const productData = productSnap.data();
        console.log('Product Data:', productData);

        const { userId, categoryId } = productData;
        if (!userId || !categoryId) {
          console.error('Error: Missing userId or categoryId in product data.');
          return;
        }

        //  Fetch seller (user) details
        console.log('Fetching seller details for User ID:', userId);
        const sellerRef = doc(db, 'users', userId);
        const sellerSnap = await getDoc(sellerRef);

        console.log('Seller Snapshot Exists:', sellerSnap.exists());

        if (sellerSnap.exists()) {
          const sellerData = sellerSnap.data();
          console.log('Seller Data:', sellerData);
          setSellerInfo(sellerData); 
        } else {
          console.error('Error: Seller not found.');
        }

        //  Query for the seller's other products
        const sellerProductsQuery = query(
          collection(db, 'products'),
          where('userId', '==', userId)
        );
        const sellerProductsSnap = await getDocs(sellerProductsQuery);
        const sellerProducts = sellerProductsSnap.docs
          .filter(docSnapshot => docSnapshot.id !== productId)
          .map(docSnapshot => ({ id: docSnapshot.id, ...docSnapshot.data() }));
        setSellersProducts(sellerProducts)
        
        // Query  products in the same category
        const categoryProductsQuery = query(
          collection(db, 'products'),
          where('categoryId', '==', categoryId)
        );
        const categoryProductsSnap = await getDocs(categoryProductsQuery);
        const categoryProducts = categoryProductsSnap.docs
          .filter(docSnapshot => docSnapshot.id !== productId)
          .map(docSnapshot => ({ id: docSnapshot.id, ...docSnapshot.data() }));

        //  Merged results and remove duplicates
        const mergedProducts = [
          ...new Map([...sellerProducts, ...categoryProducts].map(prod => [prod.id, prod])).values()
        ];

        console.log('Merged related products:', mergedProducts);
        setRelatedProducts(mergedProducts);
      } catch (error) {
        console.error('Error fetching product details or related products:', error);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <View>
      {/* Seller Information Section */}
      <View>
        <Text className="p-2 text-lg font-bold">Seller Information:</Text>
        
          <TouchableOpacity className='bg-blue-500 rounded-lg p-2 ' onPress={() => navigation.navigate('Shop', {sellerInfo, sellerProducts})}>
          <Text className="mb-2 text-sm text-white font-thin text-center">Tap to view seller's shop</Text>
            <Text className="font-bold text-white">
             Name: {sellerInfo ? sellerInfo.fullName : 'Loading...'}
            </Text>
             <Text className="mb-4 text-lg text-white">Address: {sellerInfo ? sellerInfo.address : 'N/A'}</Text>
          </TouchableOpacity>
    
      </View>

      {/* Related Products Section */}
      <View className="p-2">
        <Text className="my-7 text-center text-lg font-semibold">Related Items</Text>

        <View className="mt-4 flex flex-row flex-wrap justify-between">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((product) => (
              <View key={product.id} className="mb-4 w-[48%]">
                <ListingCard product={product} btnName="View" />
              </View>
            ))
          ) : (
            <Text className="text-center text-gray-500">No related products found</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default UserDetailsAndRelatedProducts;
