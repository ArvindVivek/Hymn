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
        window.location = "./home.html";
    }
    else {
    }
});

function signup() {
    var user = document.getElementById("user_field").value;
    var password = document.getElementById("password_field").value;

    if (user == "" || password == "") {
        window.alert("The username and/or password field(s) are empty. Please fill them out.");
    }
    else {
        const promise = auth.createUserWithEmailAndPassword(user, password);
        promise.catch(e => alert(e.message));
    }

    name = String(document.getElementById("user_field").value).substring(0, String(document.getElementById("user_field").value).indexOf(".")) + String(document.getElementById("user_field").value).substring(String(document.getElementById("user_field").value).indexOf(".")+1);

    var exercise_one = document.getElementById("area_1").value;
    var intensity_one = document.getElementById("level_1").value;

    var exercise_two = document.getElementById("area_2").value;
    var intensity_two = document.getElementById("level_2").value;

    var exercise_three = document.getElementById("area_3").value;
    var intensity_three = document.getElementById("level_3").value;

    var exercise_four = document.getElementById("area_4").value;
    var intensity_four = document.getElementById("level_4").value;

    var exercise_five = document.getElementById("area_5").value;
    var intensity_five = document.getElementById("level_5").value;

    database.ref('users/' + name + "/Preferences").set({
        first_area: {exercise_one, intensity_one},
        second_area: {exercise_two, intensity_two},
        third_area: {exercise_three, intensity_three},
        fourth_area: {exercise_four, intensity_four},
        fifth_area: {exercise_five, intensity_five}
    });
}

/*function data() {
    name = String(document.getElementById("user_field").value).substring(0, String(document.getElementById("user_field").value).indexOf("@"));

    var exercise_one = document.getElementById("area_1").value;
    var intensity_one = document.getElementById("level_1").value;

    var exercise_two = document.getElementById("area_2").value;
    var intensity_two = document.getElementById("level_2").value;

    var exercise_three = document.getElementById("area_3").value;
    var intensity_three = document.getElementById("level_3").value;

    var exercise_four = document.getElementById("area_4").value;
    var intensity_four = document.getElementById("level_4").value;

    var exercise_five = document.getElementById("area_5").value;
    var intensity_five = document.getElementById("level_5").value;

    database.ref('users/' + name + "/Preferences").set({
        first_area: {exercise_one, intensity_one},
        second_area: {exercise_two, intensity_two},
        third_area: {exercise_three, intensity_three},
        fourth_area: {exercise_four, intensity_four},
        fifth_area: {exercise_five, intensity_five}
    });

    

}*/

