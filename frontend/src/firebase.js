// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { child, get, getDatabase, ref, set } from 'firebase/database';
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { isLoggedIn } from "./session";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBrb0UjPZn57hkhgnYJ1XcKkGkPKuIEt0Y",
  authDomain: "eprescriptionback.firebaseapp.com",
  projectId: "eprescriptionback",
  storageBucket: "eprescriptionback.appspot.com",
  messagingSenderId: "527619253142",
  appId: "1:527619253142:web:e3732f5488707eb59433b7",
  measurementId: "G-VF5YC9TVP1"
};

export const app = initializeApp(firebaseConfig);

export const createUser = async (username, password) => {
    return createUserWithEmailAndPassword(getAuth(app), username, password);
  }
  
export const signInUser = async (username, password) => {
    return signInWithEmailAndPassword(getAuth(app), username, password);
}
export const db = getFirestore(app);

export const saveEmailToFirestore = async (username) => {
  try {
    const docRef = await addDoc(collection(db, "emails"), {
      username: username
    });
    console.log("username added with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding username: ", e);
    throw e;
  }
};

export const savePrescriptionToFirestore = async (prescription) => {
  try {
    const { name, description } = prescription;
    const prescriptionRef = doc(db, "Prescription", name); // Используем значение Name в качестве идентификатора документа
    await setDoc(prescriptionRef, { name, description }); // Установить документ с идентификатором Name и полями name и description
    console.log("Prescription added with name: ", name);
    return prescriptionRef;
  } catch (e) {
    console.error("Error adding prescription: ", e);
    throw e;
  }
};
export const chatDatabase = getDatabase(app);
const chatRef = ref(chatDatabase, 'chats/general');

if (isLoggedIn()) {
  set(chatRef, {
    message: 'Hello, world!'
  });
  
  const userRef = ref(chatDatabase, `users/${localStorage.uid}`);
  const userData = {
    username: `${localStorage.username}`,
    username: `${localStorage.username}`,
  };
  
  set(userRef, userData)
    .then(() => {
      console.log('New node created successfully!');
    })
    .catch((error) => {
      console.error('Error creating new node:', error);
    });
} else {
  console.log("User is not logged in.");
}
const generateChatId = (userId1, userId2) => {
  // Сортируем идентификаторы пользователей лексикографически
  const sortedIds = [userId1, userId2].sort();
  // Объединяем их в одну строку
  return sortedIds.join('_');
};

export const sendMessageToUser = async (recipientId, message) => {
  try {
    const auth = getAuth();
    const senderId = auth.currentUser.uid;
    const chatId = generateChatId(senderId, recipientId);;
    const messagesRef = ref(chatDatabase, `chats/${chatId}`);
    const newMessageRef = child(messagesRef, senderId);
    await set(newMessageRef, { // Используем set для установки сообщения
      content: message,
      senderId: senderId,
      recipientId: recipientId,
      timestamp: new Date().toISOString()
    });
    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const getChats = async () => {
  try {
    const database = getDatabase(app);
    const chatsRef = ref(database, 'chats');
    const snapshot = await get(chatsRef);
    const data = snapshot.val();
    if (data) {
      const chatsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      return chatsArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};
export const getUsers = async () => {
  try {
    const database = getDatabase(app);
    const chatsRef = ref(database, 'users');
    const snapshot = await get(chatsRef);
    const data = snapshot.val();
    if (data) {
      const chatsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      return chatsArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};


