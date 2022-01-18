import * as firebase from "firebase";
import "firebase/firestore";

const configuration= {
     apiKey: "AIzaSyBlAzg0NQnu7xeNRWFwtdebH2f86ojd2bo",
     authDomain: "usefirestoredemo.firebaseapp.com",
     projectId: "usefirestoredemo",
     storageBucket: "usefirestoredemo.appspot.com",
     messagingSenderId: "244147343006",
     appId: "1:244147343006:web:dc2687ec67e67896ba358f",
     measurementId: "G-3YYKHGHDBX"
};

firebase.initializeApp(configuration)

const db = firebase.firestore();

export default db;
