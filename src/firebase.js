import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA1iTTy-yUyd6qA1lf2jD6O6hMYWr4c2EM",
    authDomain: "todo-app-cfe6d.firebaseapp.com",
    projectId: "todo-app-cfe6d",
    storageBucket: "todo-app-cfe6d.appspot.com",
    messagingSenderId: "520483322510",
    appId: "1:520483322510:web:0843c22fcdb543fee727df",
    measurementId: "G-1TW1X5MBSL"
});
const db = firebaseApp.firestore();

export default db;


