import useFavoritesStore from '../store/FavouriteStore';
import { db } from '../../firebaseConfig';
import { collection, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useState, useCallback } from 'react';

const fetchDocumentsByIdsBatch = async (collectionName, docIds) => {
  if (!docIds || docIds.length === 0) return [];

  const chunks = [];
  for (let i = 0; i < docIds.length; i += 10) {
    chunks.push(docIds.slice(i, i + 10));
  }

  try {
    const promises = chunks.map(async (chunk) => {
      const q = query(collection(db, collectionName), where('__name__', 'in', chunk));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

    const results = await Promise.all(promises);
    return results.flat();
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};

export const useFavorites = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [products, setProducts] = useState([]);
  const { favoriteIds, toggleFavorite } = useFavoritesStore();

  const fetchFavorites = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        const favoriteProducts = await fetchDocumentsByIdsBatch('products', favoriteIds);
        setProducts(
          favoriteProducts.map((product) => ({
            id: product.id,
            product: {
              ...product,
              createdAt: product.createdAt?.toDate?.() || null,
            },
          }))
        );
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        if (isRefresh) {
          setRefreshing(false);
        } else {
          setLoading(false);
        }
      }
    },
    [favoriteIds]
  );

  const onRefresh = useCallback(() => {
    fetchFavorites(true);
  }, [fetchFavorites]);

  const loadMore = async () => {
    return;
  };

  return {
    products,
    loading,
    refreshing,
    isFetchingMore,
    fetchFavorites,
    onRefresh,
    loadMore,
  };
};
