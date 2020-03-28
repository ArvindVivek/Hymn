var firebaseConfig = {
    apiKey: "AIzaSyBkGmqg0xyAPT7yuru-SdBpMXucpeUIwEI",
    authDomain: "lahacks2020-aedfb.firebaseapp.com",
    databaseURL: "https://lahacks2020-aedfb.firebaseio.com",
    projectId: "lahacks2020-aedfb",
    storageBucket: "lahacks2020-aedfb.appspot.com",
    messagingSenderId: "817369168992",
    appId: "1:817369168992:web:804654ce3e747cdf7ed705",
    measurementId: "G-V62EZTESV5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const auth = firebase.auth();

  function signout() {
      auth.signOut();
  }

  auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {

      }
      else {
          window.location = "./index.html";
      }
  });