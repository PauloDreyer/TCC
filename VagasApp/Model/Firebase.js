import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDjtaAZre1gvSC6Ia983gkKycFsEKbCroA",
    authDomain: "vagasapp-85c1b.firebaseapp.com",
    databaseURL: "https://vagasapp-85c1b.firebaseio.com",
    projectId: "vagasapp-85c1b",
    storageBucket: "vagasapp-85c1b.appspot.com",
    messagingSenderId: "129732683975"
};

firebase.initializeApp(config);

export default firebase;