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
const database = firebase.database();

var name = "";

auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log("signed in");
        name = String(firebaseUser.email).substring(0, String(firebaseUser.email).indexOf("@"));
        document.getElementById("welcome_tag").innerHTML = "Welcome " + name + " ";
    }
    else {
        console.log("sign out successful");
        window.location = "../index.html";
    }
});

function signout() {
    console.log("signout being called");
    auth.signOut();
}

function sendData() {
    var type = document.getElementById("exercise_field").value;
    var set = document.getElementById("set_field").value;
    var rep = document.getElementById("rep_field").value;

    var date = new Date();
    var stamp = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear() + " @ " + date.getHours() + ":" + date.getMinutes();

    if (type == "" || set == "" || rep == "") {
        window.alert("Not all of the logs are filled out! Please fill them out!");
    }
    else {
        database.ref('users/' + name + "/" + stamp).set({
            type_of_exercise: type,
            num_of_sets: set,
            num_of_reps: rep
        });
    }
}

function readData() {
    var count = 1;

    firebase.database().ref('/users/' + name).once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            document.getElementById("exercise_label_" + String(count)).innerHTML = (childSnapshot.val().type_of_exercise);
            document.getElementById("set_label_"+ String(count)).innerHTML = (childSnapshot.val().num_of_sets);
            document.getElementById("rep_label_"+ String(count)).innerHTML = (childSnapshot.val().num_of_reps);
            count += 1;
        });
    });
}

