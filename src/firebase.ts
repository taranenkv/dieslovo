import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAOWkRgrGvtTNzWdenbIwIqYMc8azjvcEU",
    authDomain: "tse-dieslovo.firebaseapp.com",
    projectId: "tse-dieslovo",
    storageBucket: "tse-dieslovo.firebasestorage.app",
    messagingSenderId: "1090763225414",
    appId: "1:1090763225414:web:74a17ae61b22aa99e14d47",
    measurementId: "G-DBMCHY1D7C"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

