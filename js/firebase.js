// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAlneSnOrAnwOkVF8bIWLQuXVasgT_iR5w",
  authDomain: "simonsays-73e96.firebaseapp.com",
  databaseURL: "https://simonsays-73e96.firebaseio.com",
  projectId: "simonsays-73e96",
  storageBucket: "",
  messagingSenderId: "697043064534",
  appId: "1:697043064534:web:5deee10981d0694a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var docRef = db.collection("highscore").doc("score");
docRef.get().then(function(doc) {
  doc.exists
    ? document.getElementById("highscore").innerHTML = "Current highscore: " + doc.data().highscore
    : document.getElementById("highscore").innerHTML = "Current highscore: " + 0;
});
