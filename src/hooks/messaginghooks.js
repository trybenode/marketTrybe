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
    const collectRef = collection(firestore, 'Conversation');
    const docref = query(collectRef, where('participants', 'array-contains', senderID));
    const querySnapshot = await getDocs(docref);
    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      if (data.participants.includes(receiverID)) {
        return doc.id;
      }
    }
    // using forEach
    // querySnapshot.docs.forEach((doc) => {
    //   const data = doc.data()
    //   if (data.participants.includes(receiverID)) return doc.id
    // })

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

const initiateConversation = async (message, senderID, recieverID) => {
  let conversationID = null;
  const messageObj = {
    senderID,
    text: message,
    timestamp: new Date(),
  };
  // Query db if any conversation exists with both sender and reciever ID...
  try {
    const priorConvoID = await checkIfConversationExists(senderID, recieverID);
    // If YES => add message to conversation and go back to that conversation
    if (priorConvoID) {
      try {
        await addMessageToConversation(messageObj, priorConvoID);
      } catch (e) {
        console.log('Failed to add message from init convo function: ', e);
      }
      conversationID = priorConvoID;
      return conversationID;
    }
    // if NO => start a new conversation
    else {
      try {
        const newDocRef = await addDoc(collection(firestore, 'Conversation'), {
          participants: [senderID, recieverID],
          messages: [messageObj],
        });

        conversationID = newDocRef.id;
        return conversationID;
      } catch (error) {
        console.error('Error initiating conversation:', error);
        throw error;
      }
    }
  } catch (e) {
    console.log('Error calling check function in init convo function', e);
  }
};

const getConversationWithID = async (id, setConversationData) => {
  try {
    const docRef = doc(firestore, 'Conversation', id);
    // const docSnap = await getDoc(docRef);
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
  const conversationRef = doc(firestore, 'Conversation', conversationID);

  try {
    await updateDoc(conversationRef, {
      messages: arrayUnion(messageObj),
    });
    console.log('Message added successfully!');
  } catch (error) {
    console.error('Error adding message:', error);
  }
};


export {
  initiateConversation,
  getConversationWithID,
  checkIfConversationExists,
  addMessageToConversation,
  getUserIdOfSeller
};