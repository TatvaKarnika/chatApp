import * as firebase from "@react-native-firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCcaeALLDkMvWyVOc2Hxd7dpHNuq70c-_4",
  authDomain: "chatapp-4401c.firebaseapp.com",
  databaseURL: "https://chatapp-4401c.firebaseio.com",
  projectId: "chatapp-4401c",
  storageBucket: "chatapp-4401c.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "1:280176214630:android:5f399080aafe63c64f63a7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
const auth = firebase.auth();

export { auth, database };
