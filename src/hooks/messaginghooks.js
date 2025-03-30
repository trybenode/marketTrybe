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

const checkIfConversationExists = async (senderID, receiverID) => {
  try {
    const collectRef = collection(firestore, 'conversation');
    const docref = query(collectRef, where('participants', 'array-contains', senderID));
    const querySnapshot = await getDocs(docref);
    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      if (data.participants.includes(receiverID)) {
        return doc.id;
      }
    }
    console.log('No Prior Conversation');
    return null;
  } catch (e) {
    console.log('Error Checking If Conversation Exists', e);
  }
};

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

const initiateConversation = async (message, senderID, receiverID) => {
  try {
    // Generate a unique conversation ID combining both user IDs
    const convoID = [senderID, receiverID].sort().join('_');
    
    const messageObj = {
      senderID,
      text: message,
      timestamp: serverTimestamp(),
    };

    // Check if conversation exists
    const priorConvoExists = await checkIfConversationExists(senderID, receiverID);
    
    if (priorConvoExists) {
      // Add message to existing conversation
      await addMessageToConversation(messageObj, priorConvoExists);
      return priorConvoExists;
    } else {
      // Create new conversation with predetermined ID
      await setDoc(doc(firestore, 'conversation', convoID), {
        participants: [senderID, receiverID],
        messages: [messageObj],
        createdAt: serverTimestamp(),
        lastMessage: messageObj,
      });
      return convoID;
    }
  } catch (error) {
    console.error('Error in initiateConversation:', error);
    throw error;
  }
};

const getConversationWithID = async (id, setConversationData) => {
  try {
    const docRef = doc(firestore, 'conversation', id);
    onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setConversationData(docSnap.data());
      } else {
        console.log("Document Doesn't exist");
      }
    });
  } catch (e) {
    console.log('DB util getAllConversationWithID function', e);
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
  checkIfConversationExists,
  addMessageToConversation,
  getUserIdOfSeller
};