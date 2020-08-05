import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCRoChLBDB0yAEEurhhAB82j7cne3SNcSk",
  authDomain: "juicer-f375f.firebaseapp.com",
  databaseURL: "https://juicer-f375f.firebaseio.com",
  projectId: "juicer-f375f",
  storageBucket: "juicer-f375f.appspot.com",
  messagingSenderId: "838369614472",
  appId: "1:838369614472:web:e14333d68d31c8c2d7dd3d",
  measurementId: "G-CCZS4ESRM8"
};
const firebaseApp = firebase.initializeApp(config);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true });

// export firestore database
export default firebaseApp.firestore();
