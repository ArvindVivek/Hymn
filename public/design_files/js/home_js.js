var intensity = 3;
var lvl = [["Dive Bomber Pushups", "Decline Pushups"],
["Bodyweight Side Lateral Raises", "Handstand Push-Ups"],
["Inverted Row", "Pull-Ups"],
["Cobra Push-Ups", "Diamond Push-Ups"],
["Chin-Ups", "Pull-Ups"],
["Sprinter Lunges", "Bulgarian Split Squats"],
["Single Leg Glute Bridges", "Slick Floor Bridge Curls"],
["Bodyweight Calf Raises", "Jump Squats"],
["Mountain Climbers", "Russian Twists"]
];
var muscles = [["Chest", 2, 1, recChest()],
["Shoulders", 4, 1, recShoulder()],
["Back", 2, 1, recBack()],
["Triceps", 0, 1, recTriceps()],
["Biceps", 2, 1, recBiceps()],
["Quadriceps", 2, 1, recQuadriceps()],
["Hamstrings", 2, 1, recHamstrings()],
["Calf", 2, 1, recCalf()],
["Cardio", 2, 1, recCardio()]
];
//name, days done, intensity level



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
        //name = String(document.getElementById("user_field").value).substring(0, String(document.getElementById("user_field").value).indexOf(".")) + String(document.getElementById("user_field").value).substring(String(document.getElementById("user_field").value).indexOf(".")+1);

        name = String(firebaseUser.email).substring(0, String(firebaseUser.email).indexOf(".")) + String(firebaseUser.email).substring(String(firebaseUser.email).indexOf(".")+1);
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
    var stamp = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear() + " @ " + date.getHours() + ":" + date.getMinutes();

    if (type == "" || set == "" || rep == "") {
        window.alert("Not all of the logs are filled out! Please fill them out!");
    }
    else {
        database.ref('users/' + name + "/" + stamp).set({
            type_of_exercise: type,
            num_of_sets: set,
            num_of_reps: rep
        });

        var loc = -1;
        for(var i = 0; i < lvl.length; i++) {
            if(lvl[i].indexOf(type) != -1) {
                loc = i;
            }
        }

        if(loc != -1) {
            muscles[loc][1] += 1;
            console.log(muscles);
        }

    }
}

function readData() {
    var count = 1;

    firebase.database().ref('/users/' + name).once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            document.getElementById("exercise_label_" + String(count)).innerHTML = (childSnapshot.val().type_of_exercise);
            document.getElementById("set_label_" + String(count)).innerHTML = (childSnapshot.val().num_of_sets);
            document.getElementById("rep_label_" + String(count)).innerHTML = (childSnapshot.val().num_of_reps);
            count += 1;
        });
    });

    firebase.database().ref('/users/' + name + "/Preferences").once('value').then(function (snapshot) {
        document.getElementById('first').innerHTML = snapshot.val().first_area.exercise_one + ": " + snapshot.val().first_area.intensity_one;
        for(var i = 0; i < muscles.length; i++) {
            if(muscles[i][0] == snapshot.val().first_area.exercise_one) {
                muscles[i][2] = parseInt(snapshot.val().first_area.intensity_one);
            }
        }

        document.getElementById('second').innerHTML = snapshot.val().second_area.exercise_two + ": " + snapshot.val().second_area.intensity_two;
        for(var i = 0; i < muscles.length; i++) {
            if(muscles[i][0] == snapshot.val().second_area.exercise_two) {
                muscles[i][2] = parseInt(snapshot.val().second_area.intensity_two);
            }
        }
        
        document.getElementById('third').innerHTML = snapshot.val().third_area.exercise_three + ": " + snapshot.val().third_area.intensity_three;
        for(var i = 0; i < muscles.length; i++) {
            if(muscles[i][0] == snapshot.val().third_area.exercise_three) {
                muscles[i][2] = parseInt(snapshot.val().third_area.intensity_three);
            }
        }
        
        document.getElementById('fourth').innerHTML = snapshot.val().fourth_area.exercise_four + ": " + snapshot.val().fourth_area.intensity_four;
        for(var i = 0; i < muscles.length; i++) {
            if(muscles[i][0] == snapshot.val().fourth_area.exercise_four) {
                muscles[i][2] = parseInt(snapshot.val().fourth_area.intensity_four);
            }
        }
        
        document.getElementById('fifth').innerHTML = snapshot.val().fifth_area.exercise_five + ": " + snapshot.val().fifth_area.intensity_five;
        for(var i = 0; i < muscles.length; i++) {
            if(muscles[i][0] == snapshot.val().fifth_area.exercise_five) {
                muscles[i][2] = parseInt(snapshot.val().fifth_area.intensity_five);
            }
        }

        console.log(muscles);

    });
}

function applyPreferences() {
    for (var i = 0; i < muscles.length; i++) {
        muscles[i][1] /= muscles[i][2];
        Math.floor(muscles[i][1]);
    }
}

function identifyAreas() {
    var least = 0;
    var arr = [];
    var save = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < muscles.length; j++) {
            if (muscles[least][1] > muscles[j][1]) {
                least = j;
            }
        }
        arr[i] = least;
        save[i] = muscles[least][1];
        muscles[least][1] = 14;
    }
    for (var i = 0; i < arr.length; i++) {
        muscles[arr[i]][1] = save[i]
    }
    return arr;
}


function recChest() {
    var ex = "Pushups - # of Sets: " + String(Math.round(2+intensity)) + " # of Reps: " + String(10) + "<br>";
    if (intensity > 1) {
        ex += "For your intensity level, we'd also like to suggest trying " + lvl[0][intensity-2] + "<br>";
    }
    return ex.link("https://www.google.com");
}

function recShoulder() {
    var ex = "Plank Tuck Jumps - # of Sets: " + String(Math.round(2+intensity)) + " # of Reps: " + String(10) + "<br>";
    if (intensity > 1) {
        ex += "For your intensity level, we'd also like to suggest trying " + lvl[1][intensity-2] + "<br>";
    }
    return ex;
}

function recBack() {
    var ex = "Superman - # of Sets: " + String(Math.round(2+intensity)) + " # of Seconds: " + String(30) + "<br>";
    if (intensity > 1) {
        ex += "For your intensity level, we'd also like to suggest trying " + lvl[2][intensity-2] + "<br>";
    }
    return ex;
}

function recTriceps() {
    var ex = "Knee Cobra Pushups - # of Sets: " + String(Math.round(2+intensity)) + " # of Reps: " + String(10) + "<br>";
    if (intensity > 1) {
       ex += "For your intensity level, we'd also like to suggest trying " + lvl[3][intensity-2] + "<br>";
    }
    return ex;
}

function recBiceps() {
    var ex = "Curls - # of Sets: " + String(Math.round(2+intensity)) + " # of Reps: " + String(10) + "<br>";
    if (intensity > 1) {
       ex += "For your intensity level, we'd also like to suggest trying " + lvl[4][intensity-2] + "<br>";
    }
    return ex;
}

function recQuadriceps() {
    var ex = "Lunges - # of Sets: " + String(Math.round(2+intensity)) + " # of Reps: " + String(10) + "<br>";
    if (intensity > 1) {
       ex += "For your intensity level, we'd also like to suggest trying " + lvl[5][intensity-2] + "<br>";
    }
    return ex;
}

function recHamstrings() {
    var ex = "Hip Raises - # of Sets: " + String(Math.round(2+intensity)) + " # of Reps: " + String(10) + "<br>";
    if (intensity > 1) {
       ex += "For your intensity level, we'd also like to suggest trying " + lvl[6][intensity-2] + "<br>";
    }
    return ex;
}

function recCalf() {
    var ex = "High Knees - # of Sets: " + String(Math.round(2+intensity)) + " # of Seconds: " + String(30) + "<br>";
    if (intensity > 1) {
       ex += "For your intensity level, we'd also like to suggest trying " + lvl[7][intensity-2] + "<br>";
    }
    return ex;
}

function recCardio() {
    var ex = "Jumping Jacks - # of Sets: " + String(Math.round(2+intensity)) + " # of Reps: " + String(15) + "<br>"; 
    if (intensity > 1) {
       ex += "For your intensity level, we'd also like to suggest trying " + lvl[8][intensity-2] + "<br>";
    }
    return ex;
}

function needRest() {
    var sum = 0;
    for (var i = 0; i < muscles.length; i++) {
        sum += muscles[i][1];
    }
    return ((sum/3) > 7-Math.round(2/intensity));
}

function main() {
    applyPreferences();
    var msg = "";
    var arr = identifyAreas();
    if (needRest()) {
        msg += "Rest for Today";
        for(var i = 0; i < muscles.length; i++) {
            muscles[i][1] = 0;
        }
    }
    else {
        for (var i = 0; i < muscles.length; i++) {
            for (var j = 0; j < arr.length; j++) {
                if (arr[j] == i) { 
                    msg += muscles[i][3];
                }
            }
        }
    }
    document.getElementById("rec_exercise").innerHTML = msg;
}
