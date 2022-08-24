// Import the functions you need from the SDKs you need
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
  apiKey: "AIzaSyDSn95i8ba09ZoPfY9DDJaJmcbbBCCKPk8",
  authDomain: "traininglog-22569.firebaseapp.com",
  projectId: "traininglog-22569",
  storageBucket: "traininglog-22569.appspot.com",
  messagingSenderId: "245973559795",
  appId: "1:245973559795:web:c3c9750cee149b7554ca86",
  measurementId: "G-0XQJ29YQZZ"
});

const messaging = firebase.messaging()