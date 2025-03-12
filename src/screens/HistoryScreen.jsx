import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
// import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

const HistoryScreen = () => {
  const [tradeHistory, setTradeHistory] = useState(dummyTradeHistory);
  // const [boughtItems, setBoughtItems] = useState([]);
  // const [soldItems, setSoldItems] = useState([]);
  // const auth = getAuth();
  // const db = getFirestore();

  // useEffect(() => {
  //   fetchTradeHistory();
  // }, []);

  // const fetchTradeHistory = async () => {
  //   try {
  //     const userId = auth.currentUser?.uid;
  //     if (!userId) return;

  //     // Query trades where the user is the buyer
  //     const boughtQuery = query(
  //       collection(db, 'trades'),
  //       where('buyerId', '==', userId),
  //       where('status', '==', 'completed') // Filter completed trades
  //     );

  //     const boughtSnapshot = await getDocs(boughtQuery);
  //     const boughtData = boughtSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     setBoughtItems(boughtData);

  //     // Query trades where the user is the seller
  //     const soldQuery = query(
  //       collection(db, 'trades'),
  //       where('sellerId', '==', userId),
  //       where('status', '==', 'completed')
  //     );

  //     const soldSnapshot = await getDocs(soldQuery);
  //     const soldData = soldSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     setSoldItems(soldData);
  //   } catch (error) {
  //     console.error('Error fetching trade history:', error);
  //   }
  // };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
      <Image
        source={{ uri: item.productImage }}
        style={{ width: 50, height: 50, marginRight: 10 }}
      />
      <View>
        <Text style={{ fontWeight: 'bold' }}>{item.productName}</Text>
        <Text>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Bought Items</Text>
      <FlatList data={boughtItems} renderItem={renderItem} keyExtractor={(item) => item.id} />

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>
        Sold Items
      </Text>
      <FlatList data={soldItems} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

export default HistoryScreen;
