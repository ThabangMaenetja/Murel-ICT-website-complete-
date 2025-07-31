// Import Firebase modules from CDN (v9 modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Your Firebase config from your project (replace placeholders with actual keys)
const firebaseConfig = {
  apiKey: "AIzaSyBk2CyrFBbs6QkfeTI2rTcwdv8B8qerZic",
  authDomain: "murel-ict-backend.firebaseapp.com",
  projectId: "murel-ict-backend",
  storageBucket: "murel-ict-backend.firebasestorage.app",
  messagingSenderId: "294033312796",
  appId: "1:294033312796:web:6410227cc6f045b121a3d9",
  measurementId: "G-HY0581T3HQ"
};

// Initialize Firebase app and Firestore database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to handle form submission, exposed globally
window.submitContactForm = async function (event) {
  event.preventDefault(); // prevent form from reloading the page

  // Get values from form inputs
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill all fields.");
    return;
  }

  try {
    // Add a new document to 'contactForms' collection with a timestamp
    await addDoc(collection(db, "contactForms"), {
      name,
      email,
      message,
      timestamp: serverTimestamp()
    });
    alert("Message sent successfully!");
    
    // Optional: reset form fields after successful submission
    event.target.reset();
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Failed to send message. Please try again.");
  }
};
