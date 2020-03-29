var intensity = 1;
var muscles = [ ["Chest", 0, 1, recChest()], 
                ["Shoulder", 0, 1, recShoulder()], 
                ["Back", 1, 1, recBack()], 
                ["Triceps", 0, 1, recTriceps()],
                ["Biceps", 2, 1, recBiceps()],
                ["Quadriceps", 2, 1, recQuadriceps()],
                ["Hamstrings", 2, 1, recHamstrings()],
                ["Calf", 2, 1, recCalf()]
                ];
                //name, days done, intensity level

function identifyAreas() {
    var copy = muscles;
    var least = 0;
    var arr = [];
    var save = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < copy.length; j++) {
            if (copy[least][1] > copy[j][1]) {
                least = j;
            }
        }
        arr[i] = least;
        save[i] = copy[least][1];
        copy[least][1] = 14;
    }
    for (var i = 0; i < arr.length; i++) {
        copy[arr[i]][1] = save[i]
    }
    return arr;
}



function main() {
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
    document.getElementById("test").innerHTML = msg;

    //else if (identifyAreas() == muscles[3][0]) {
        //document.getElementById("test").innerHTML = recCardio();
    //}
}

function recChest() {
    var ex = "Insert Chest Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10) + "<br>";
    return ex.link("https://www.google.com");
}

function recShoulder() {
    var ex = "Insert Shoulder Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10) + "<br>";
    return ex;
}

function recBack() {
    var ex = "Insert Back Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10) + "<br>";
    return ex;
}

function recTriceps() {
    var ex = "Insert Triceps Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10) + "<br>";
    return ex;
}

function recBiceps() {
    var ex = "Insert Biceps Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10) + "<br>";
    return ex;
}

function recQuadriceps() {
    var ex = "Insert Quadriceps Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10) + "<br>";
    return ex;
}

function recHamstrings() {
    var ex = "Insert Hamstrings Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10) + "<br>";
    return ex;
}

function recCalf() {
    var ex = "Insert Calf Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10) + "<br>";
    return ex;
}

function needRest() {
    var sum = 0;
    for (var i = 0; i < muscles.length; i++) {
        sum += muscles[i][1];
    }
    return ((sum/3) > 14-(2/intensity));
}