// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrb0UjPZn57hkhgnYJ1XcKkGkPKuIEt0Y",
  authDomain: "eprescriptionback.firebaseapp.com",
  projectId: "eprescriptionback",
  storageBucket: "eprescriptionback.appspot.com",
  messagingSenderId: "527619253142",
  appId: "1:527619253142:web:e3732f5488707eb59433b7",
  measurementId: "G-VF5YC9TVP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(getAuth(app), email, password);
  }
  
export const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(getAuth(app), email, password);
}
export const db = getFirestore(app);

export const saveEmailToFirestore = async (email) => {
  try {
    const docRef = await addDoc(collection(db, "emails"), {
      email: email
    });
    console.log("Email added with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding email: ", e);
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