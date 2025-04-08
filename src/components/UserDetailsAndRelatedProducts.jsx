import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ListingCard from './ListingCard';
import { db } from '../../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const UserDetailsAndRelatedProducts = ({ productId, product }) => {
  
  const navigation = useNavigation();
  const [sellerInfo, setSellerInfo] = useState(null);
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

        const [sellerSnap, categorySnap, subCategorySnap] = await Promise.all([
          getDoc(doc(db, 'users', userId)),
          getDocs(query(collection(db, 'products'), where('categoryId', '==', categoryId))),
          getDocs(query(collection(db, 'products'), where('subcategory', '==', subcategory)))
        ]);

        if (sellerSnap.exists()) {
          setSellerInfo(sellerSnap.data());
        }

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
        <View className=" rounded-lg bg-gray-100 border-b-hairline border-blue-500 ">
          <Text className="p-2 mt-5 text-lg font-bold">Seller Information</Text>
          <TouchableOpacity
            className="rounded-lg p-4"
            onPress={() =>
              navigation.navigate('Shop', {
                sellerInfo,
                sellerProducts: sellerProducts.map((p) => p.product),
              })
            }>
            <Text >Seller: {sellerInfo.fullName || 'N/A'}</Text>
            <Text >Location: {sellerInfo.address || 'Not specified'}</Text>
          </TouchableOpacity>
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
