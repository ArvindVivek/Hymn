var legs = 5;
var push = 0;
var pull = 2;
var cardio = 1;
var intensity = 1;
var muscles = [["Legs", legs, 1], ["Push", push, 1], ["Pull", pull, 1], ["Cardio", cardio, 1]];

function identifyAreas() {
    var least = 0;
    for (var i = 0; i < muscles.length; i++) {
        if (muscles[least][1] > muscles[i][1]) {
            least = i;
        }
    }
    return muscles[least][0];
}

function main() {
    if (needRest()) {
        document.getElementById("test").innerHTML = "Rest";
    }
    else if (identifyAreas() == muscles[0][0]) {
        document.getElementById("test").innerHTML = recLegs();
    }
    else if (identifyAreas() == muscles[1][0]) {
        document.getElementById("test").innerHTML = recPush() + "<br>" + recPull();
    }
    else if (identifyAreas() == muscles[2][0]) {
        document.getElementById("test").innerHTML = recPull();
    }
    else if (identifyAreas() == muscles[3][0]) {
        document.getElementById("test").innerHTML = recCardio();
    }
}

function recPush() {
    var ex = "Pushups - " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10);
    if (intensity > 1) {
        ex += " We'd also recommend trying handstand/dive bomber pushups."
    }   
    return ex.link("https://www.google.com");
}

function recPull() {
    var ex = "Insert Pull Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10);
    return ex;
}

function recCardio() {
    var ex = "Insert Cardio Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10);
    return ex;
}

function recLegs() {
    var ex = "Insert Legs Exercise: " + "# of Sets: " + String(Math.round(2*intensity)) + " # of Reps: " + String(10);
    return ex;
}

function needRest() {
    var sum = 0;
    for (var i = 0; i < muscles.length; i++) {
        sum += muscles[i][1];
    }
    return (sum > 14-(2/intensity));
}