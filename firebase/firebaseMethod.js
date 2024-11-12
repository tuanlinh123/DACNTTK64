import db from "./firebase.js";
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
    collection,
    doc,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
const auth = getAuth();

/**
 * Hàm đăng nhập với Google
 */
export const signInWithGoogle = async () => {
    try {
        const ggProvider = new GoogleAuthProvider(auth);
        let result = await signInWithPopup(auth, ggProvider);
        console.log(result);
        console.log("Login successfully");
    } catch (error) {
        console.error(error);
    }
};
/**
 * Đăng ký Firebase Authentication Email/Password
 * @param {*} email
 * @param {*} password
 */
export const signUp = async (email, password) => {
    try {
        let userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        console.log(userCredential);
        console.log(user);
        // Send email verification
        sendEmailVerification(user)
            .then(() => {
                console.log("Email verification sent!");
                // Show a message to the user to check their email for verification
            })
            .catch((error) => {
                console.error("Error sending email verification:", error);
                // Handle errors, like network issues
            });
        console.log("Register successfully");
        // return user;
    } catch (error) {
        console.error(error);
        console.error("Register failed");
    }
};

/**
 * Đăng nhập Firebase Authentication Email/Password
 * @param {*} email
 * @param {*} password
 */
export const logIn = async (email, password, callback) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successfully");
        callback();
    } catch (error) {
        console.error(error);
        console.error("Login failed");
    }
};

/**
 * Get data from Firebase
 */
export async function getData(collectionName) {
    const dataCol = collection(db, collectionName);
    const dataSnapshot = await getDocs(dataCol);
    const dataList = dataSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
    return dataList;
}
/**
 * Thêm dữ liệu
 */
export async function addData(collectionName, newData) {
    // Create a reference to the data collection
    const dataCollection = collection(db, collectionName);
    // Add a new document to the data collection
    try {
        await addDoc(dataCollection, newData);
        console.log("User added successfully!");
    } catch (error) {
        console.error("Error adding user:", error);
    }
}
/**
 * Cập nhật data
 */
export async function updateData(collectionName, IDData, newData) {
    try {
        const dataRef = doc(db, collectionName, IDData); // Replace 'IDData' with the actual data ID
        // Update fields in document 'IDData' in collection
        await updateDoc(dataRef, newData);
        console.log("User data updated successfully!");
    } catch (error) {
        console.error("Error updating user data:", error);
    }
}

/**
 * Xóa data
 */
export async function deleteData(collectionName, IDData) {
    try {
        const dataRef = doc(db, collectionName, IDData); // Replace dataID with the actual data ID
        // delete fields in document 'dataID' in collection
        await deleteDoc(dataRef);
        console.log("User data removed successfully!");
    } catch (error) {
        console.error("Error removing user data:", error);
    }
}
