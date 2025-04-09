import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ListingCard from './ListingCard';
import { db } from '../../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const UserDetailsAndRelatedProducts = ({ productId, product }) => {
  
  const navigation = useNavigation();
  const [sellerInfo, setSellerInfo] = useState(null);
  const [sellerProducts, setSellersProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("error fetching related products for:", productId)
    if (!productId || !product) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      if (!productId || !product) {
        setError('Product ID is missing');
        setLoading(false);
        return;
      }

      try {
        setSellerInfo(null);
        setRelatedProducts([]);
        setLoading(true);
        setError(null);

        const productRef = doc(db, 'products', productId);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          throw new Error('Product not found');
        }

        const productData = productSnap.data();
        const { userId, categoryId, subcategory } = productData;

        if (!userId || !categoryId || !subcategory) {
          throw new Error('Incomplete product data');
        }

        const [sellerSnap, categorySnap, subCategorySnap, sellerProductsSnap] = await Promise.all([
          getDoc(doc(db, 'users', userId)),
          getDocs(query(collection(db, 'product'), where ("userId", "==", userId))),
          getDocs(query(collection(db, 'products'), where('categoryId', '==', categoryId))),
          getDocs(query(collection(db, 'products'), where('subcategory', '==', subcategory)))
        ]);

        if (sellerSnap.exists()) {
          setSellerInfo(sellerSnap.data());
        }
        const sellerProductsList = sellerProductsSnap.docs
        .filter((doc) => doc.id !== productId)
        .map((doc) => ({
          id: doc.id,
          product: doc.data(),
        }));
      
      setSellersProducts(sellerProductsList);
      
        const processProducts = (snapshot, excludeId) =>
          snapshot.docs
            .filter((doc) => doc.id !== excludeId)
            .map((doc) => ({
              id: doc.id,
              product: doc.data(),
            }));

        const categoryProducts = processProducts(categorySnap, productId);
        const subcategoryProducts = processProducts(subCategorySnap, productId);

        const merged = [
          ...new Map(
            [...categoryProducts, ...subcategoryProducts].map((item) => [item.id, item])
          ).values(),
        ];

        setRelatedProducts(merged);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, product]); 


  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text className="p-4 text-red-500">{error}</Text>;

  return (
    <View>
      {/* Seller Info Section */}
      {sellerInfo && (
       <View className="rounded-lg bg-gray-100 border-b-hairline border-blue-500 p-4 mt-5">
       <Text className="text-lg font-bold mb-2">Seller Information</Text>
     
       <View className="flex-row justify-between items-center">
         <View>
           <Text>Seller: {sellerInfo.fullName || 'N/A'}</Text>
           <Text>Location: {sellerInfo.address || 'Not specified'}</Text>
         </View>
     
         <TouchableOpacity
           className="ml-4 rounded-lg bg-blue-500 px-4 py-2"
           onPress={() =>
             navigation.navigate('Shop', {
               sellerInfo,
               sellerProducts: sellerProducts.map((p) => p.product),
             })
           }>
           <Text className="font-semibold text-white">View Shop</Text>
         </TouchableOpacity>
       </View>
     </View>
     
      )}

      {/* Related Products */}
      <View className="my-8">
        <Text className="mb-4 text-lg text-center font-bold">Related Products</Text>
        {relatedProducts.length > 0 ? (
          <View className="flex-row flex-wrap justify-between">
            {relatedProducts.slice(0, 4).map((item) => (
              <View key={item.id} className="mb-4 w-[48%]">
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('ListingDetails', {
                      productId:item.id,
                      product:item.product
                    })
                  }>
                  <ListingCard product={item.product} btnName="View" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text className="text-gray-500 text-center">No related products available</Text>
        )}
      </View>
    </View>
  );
};

export default UserDetailsAndRelatedProducts;
