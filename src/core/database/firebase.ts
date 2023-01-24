import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// export const firebaseConfig = {
//     apiKey: process.env.REACT_APP_APIKEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID
// };

export const firebaseConfig = {
  apiKey: "AIzaSyARu8Jz-tELjI_nolITPpZoNw3OmynbUfc",
  authDomain: "mini-paint-33987.firebaseapp.com",
  projectId: "mini-paint-33987",
  storageBucket: "mini-paint-33987.appspot.com",
  messagingSenderId: "220555995307",
  appId: "1:220555995307:web:cef3836b8bd8f507bcefee",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
