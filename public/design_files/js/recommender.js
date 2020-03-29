var intensity = 3;
var lvl =   [ ["Dive Bomber Pushups", "Decline Pushups"], 
            ["Bodyweight Side Lateral Raises", "Handstand Push-Ups"], 
            ["Inverted Row","Pull-Ups"], 
            ["Cobra Push-Ups", "Diamond Push-Ups"],
            ["Chin-Ups","Pull-Ups"],
            ["Sprinter Lunges", "Bulgarian Split Squats"],
            ["Single Leg Glute Bridges", "Slick Floor Bridge Curls"],
            ["Bodyweight Calf Raises", "Jump Squats"],
            ["Mountain Climbers", "Russian Twists"]
            ];
var muscles = [ ["Chest", 2, 1, recChest()], 
                ["Shoulder", 4, 4, recShoulder()], 
                ["Back", 2, 1, recBack()], 
                ["Triceps", 0, 1, recTriceps()],
                ["Biceps", 2, 1, recBiceps()],
                ["Quadriceps", 2, 1, recQuadriceps()],
                ["Hamstrings", 2, 1, recHamstrings()],
                ["Calf", 2, 1, recCalf()],
                ["Cardio", 2, 1, recCardio()]
                ];
                //name, days done, intensity level
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
    //return ex.link("https://www.google.com");
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