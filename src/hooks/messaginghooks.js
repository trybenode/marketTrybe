import { db as firestore } from '../../firebaseConfig';
import {
  arrayUnion,
  serverTimestamp,
  addDoc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  doc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';

const getUserIdOfSeller = async(productID) => {
  try {
    if (!productID) {
      throw new Error('Product ID is required');
    }
    console.log("Fetching seller for product:", productID);
    const docSnap = await getDoc(doc(firestore, 'products', productID));
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Product data:", data);
      return data.userId;
    } else {
      console.log("No product found with ID:", productID);
      return null;
    }
  } catch (error) {
    console.error("Error in getUserIdOfSeller:", error);
    throw error;
  }
};

const initiateConversation = async (message, senderID, receiverID, productDetails) => {
  try {
    const convoID = `${senderID}_${receiverID}`;
    
    const messageObj = {
      senderID,
      text: message,
      timestamp: Date.now(),
    };

    const conversationRef = doc(firestore, 'conversation', convoID);
    const conversationSnap = await getDoc(conversationRef);

    if (conversationSnap.exists()) {
      await updateDoc(conversationRef, {
        messages: arrayUnion(messageObj),
        lastMessage: messageObj,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(conversationRef, {
        participants: [senderID, receiverID],
        messages: [messageObj],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastMessage: messageObj,
        product: {
          name: productDetails.name,
          imageUrl: productDetails.imageUrl,
          id: productDetails.id
        }
      });
    }
    return convoID;
  } catch (error) {
    console.error('Error in initiateConversation:', error);
    throw error;
  }
};

const getConversationWithID = (id, setConversationData) => {
  try {
    const docRef = doc(firestore, 'conversation', id);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Sort messages by timestamp
        const sortedMessages = [...data.messages].sort((a, b) => 
          b.timestamp?.seconds - a.timestamp?.seconds
        );
        setConversationData({ ...data, messages: sortedMessages });
      } else {
        console.log("Conversation doesn't exist");
        setConversationData(null);
      }
    });
  } catch (e) {
    console.error('Error in getConversationWithID:', e);
    return () => {};
  }
};

const addMessageToConversation = async (messageObj, conversationID) => {
  const conversationRef = doc(firestore, 'conversation', conversationID);

  try {
    await updateDoc(conversationRef, {
      messages: arrayUnion(messageObj),
      lastMessage: messageObj,
    });
    console.log('Message added successfully!');
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
};

const getAllConversations = async (userID, setConversations) => {
  try {
    const collectRef = collection(firestore, 'conversation');
    const docref = query(collectRef, where('participants', 'array-contains', userID));
    const unsubscribe = onSnapshot(docref, (querySnapshot) => {
      const conversations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConversations(conversations);
    });
    return unsubscribe; // Return the unsubscribe function
  } catch (e) {
    console.log('Error fetching conversations:', e);
  }
}


export {
  initiateConversation,
  getConversationWithID,
  addMessageToConversation,
  getUserIdOfSeller,
  getAllConversations
};