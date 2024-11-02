import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJhmQYB54QnEaUsNpmFVd7uK5ARZvVz10",
    authDomain: "lms02112025.firebaseapp.com",
    projectId: "lms02112025",
    storageBucket: "lms02112025.firebasestorage.app",
    messagingSenderId: "687572089051",
    appId: "1:687572089051:web:1cd2d3de8756468a69f4fe",
    measurementId: "G-440HZZH4KY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
