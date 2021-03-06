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

function signup() {
    window.location = "./templates/signup.html";
}

function login() {
    console.log("login being called");
    var user = document.getElementById('user_field').value;
    var password = document.getElementById('password_field').value;

    if (user == "" || password == "") {
        window.alert("The username and/or password field(s) are empty. Please fill them out.");
    }
    else {
        const promise = auth.signInWithEmailAndPassword(user, password);
        promise.catch(e => alert(e.message));
    }
}

function logout() {
    console.log("logout being called");
    auth.signOut();
}


auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log("success login");
        window.location = "./templates/home.html";
    }
    else {
        console.log("logout");
    }
});
