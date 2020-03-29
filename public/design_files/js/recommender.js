var intensity = 1;
var muscles = [ ["Chest", 2, 1, recChest()], 
                ["Shoulder", 0, 1, recShoulder()], 
                ["Back", 1, 1, recBack()], 
                ["Triceps", 1, 1, recTriceps()],
                ["Biceps", 1, 1, recBiceps()],
                ["Quadriceps", 2, 1, recQuadriceps()],
                ["Hamstrings", 2, 1, recHamstrings()],
                ["Calf", 2, 1, recCalf()]
                ];
                //name, days done, intensity level

function identifyAreas() {
    var least = 0;
    for (var i = 0; i < muscles.length; i++) {
        if (muscles[least][1] > muscles[i][1]) {
            least = i;
        }
    }
    return muscles[least];
}

function main() {
    if (needRest()) {
        document.getElementById("rec_exercise").innerHTML = "Rest";
    }
    else {
        for (var i = 0; i < muscles.length; i++) {
            if (identifyAreas() == muscles[i]) {
                document.getElementById("rec_exercise").innerHTML = muscles[i][3];
            }
        }
    }

    //else if (identifyAreas() == muscles[3][0]) {
        //document.getElementById("test").innerHTML = recCardio();
    //}
}

function recChest() {
    var ex = "Insert Chest Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10);
    return ex.link("https://www.google.com");
}

function recShoulder() {
    var ex = "Insert Shoulder Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10);
    return ex;
}

function recBack() {
    var ex = "Insert Back Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10);
    return ex;
}

function recTriceps() {
    var ex = "Insert Triceps Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10);
    return ex;
}

function recBiceps() {
    var ex = "Insert Biceps Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10);
    return ex;
}

function recQuadriceps() {
    var ex = "Insert Quadriceps Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10);
    return ex;
}

function recHamstrings() {
    var ex = "Insert Hamstrings Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10);
    return ex;
}

function recCalf() {
    var ex = "Insert Calf Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10);
    return ex;
}

function needRest() {
    var sum = 0;
    for (var i = 0; i < muscles.length; i++) {
        sum += muscles[i][1];
    }
    return (sum > 14-(2/intensity));
}