import { preferences } from "./home_screen";

//var intensity = 3;
var lvl = [
  ["Dive Bomber Pushups", "Decline Pushups"],
  ["Bodyweight Side Lateral Raises", "Handstand Push-Ups"],
  ["Inverted Row", "Pull-Ups"],
  ["Cobra Push-Ups", "Diamond Push-Ups"],
  ["Chin-Ups", "Pull-Ups"],
  ["Sprinter Lunges", "Bulgarian Split Squats"],
  ["Single Leg Glute Bridges", "Slick Floor Bridge Curls"],
  ["Bodyweight Calf Raises", "Jump Squats"],
  ["Mountain Climbers", "Russian Twists"]
];
var muscles;

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
    muscles[arr[i]][1] = save[i];
  }
  return arr;
}

function recChest() {
  var intensity = Number.parseInt(preferences["chest"]);
  var ex =
    "Pushups - # of Sets: " +
    String(Math.round(2 + intensity)) +
    " # of Reps: " +
    String(10) +
    "\n";
  if (intensity > 1) {
    ex +=
      "For your intensity level, we'd also like to suggest trying " +
      lvl[0][intensity - 2] +
      "\n";
  }
  return ex;
}

function recShoulder() {
  var intensity = Number.parseInt(preferences["shoulder"]);
  var ex =
    "Plank Tuck Jumps - # of Sets: " +
    String(Math.round(2 + intensity)) +
    " # of Reps: " +
    String(10) +
    "\n";
  if (intensity > 1) {
    ex +=
      "For your intensity level, we'd also like to suggest trying " +
      lvl[1][intensity - 2] +
      "\n";
  }
  return ex;
}

function recBack() {
  var intensity = Number.parseInt(preferences["back"]);
  var ex =
    "Superman - # of Sets: " +
    String(Math.round(2 + intensity)) +
    " # of Seconds: " +
    String(30) +
    "\n";
  if (intensity > 1) {
    ex +=
      "For your intensity level, we'd also like to suggest trying " +
      lvl[2][intensity - 2] +
      "\n";
  }
  return ex;
}

function recTriceps() {
  var intensity = Number.parseInt(preferences["triceps"]);
  var ex =
    "Knee Cobra Pushups - # of Sets: " +
    String(Math.round(2 + intensity)) +
    " # of Reps: " +
    String(10) +
    "\n";
  if (intensity > 1) {
    ex +=
      "For your intensity level, we'd also like to suggest trying " +
      lvl[3][intensity - 2] +
      "\n";
  }
  return ex;
}

function recBiceps() {
  var intensity = Number.parseInt(preferences["bicep"]);
  var ex =
    "Curls - # of Sets: " +
    String(Math.round(2 + intensity)) +
    " # of Reps: " +
    String(10) +
    "\n";
  if (intensity > 1) {
    ex +=
      "For your intensity level, we'd also like to suggest trying " +
      lvl[4][intensity - 2] +
      "\n";
  }
  return ex;
}

function recQuadriceps() {
  var intensity = Number.parseInt(preferences["quadriceps"]);
  var ex =
    "Lunges - # of Sets: " +
    String(Math.round(2 + intensity)) +
    " # of Reps: " +
    String(10) +
    "\n";
  if (intensity > 1) {
    ex +=
      "For your intensity level, we'd also like to suggest trying " +
      lvl[5][intensity - 2] +
      "\n";
  }
  return ex;
}

function recHamstrings() {
  var intensity = Number.parseInt(preferences["hamstring"]);
  var ex =
    "Hip Raises - # of Sets: " +
    String(Math.round(2 + intensity)) +
    " # of Reps: " +
    String(10) +
    "\n";
  if (intensity > 1) {
    ex +=
      "For your intensity level, we'd also like to suggest trying " +
      lvl[6][intensity - 2] +
      "\n";
  }
  return ex;
}

function recCalf() {
  var intensity = Number.parseInt(preferences["calf"]);
  var ex =
    "High Knees - # of Sets: " +
    String(Math.round(2 + intensity)) +
    " # of Seconds: " +
    String(30) +
    "\n";
  if (intensity > 1) {
    ex +=
      "For your intensity level, we'd also like to suggest trying " +
      lvl[7][intensity - 2] +
      "\n";
  }
  return ex;
}

function recCardio() {
  var intensity = Number.parseInt(preferences["cardio"]);
  var ex =
    "Jumping Jacks - # of Sets: " +
    String(Math.round(2 + intensity)) +
    " # of Reps: " +
    String(15) +
    "\n";
  if (intensity > 1) {
    ex +=
      "For your intensity level, we'd also like to suggest trying " +
      lvl[8][intensity - 2] +
      "\n";
  }
  return ex;
}

function needRest() {
  var intensity =
    (Number.parseInt(preferences["chest"]) +
    Number.parseInt(preferences["shoulder"]) +
    Number.parseInt(preferences["back"]) +
    Number.parseInt(preferences["triceps"]) +
    Number.parseInt(preferences["bicep"]) +
    Number.parseInt(preferences["quadriceps"]) +
    Number.parseInt(preferences["hamstring"]) +
    Number.parseInt(preferences["calves"]) +
    Number.parseInt(preferences["cardio"])) /
    9;
  var sum = 0;
  for (var i = 0; i < muscles.length; i++) {
    sum += muscles[i][1];
  }
  return sum / 3 > 7 - Math.round(2 / intensity);
}

export function main() {
  muscles = [
    ["Chest", 0, 1, recChest()],
    ["Shoulders", 0, 1, recShoulder()],
    ["Back", 0, 1, recBack()],
    ["Triceps", 0, 1, recTriceps()],
    ["Biceps", 0, 1, recBiceps()],
    ["Quadriceps", 0, 1, recQuadriceps()],
    ["Hamstrings", 0, 1, recHamstrings()],
    ["Calf", 0, 1, recCalf()],
    ["Cardio", 0, 1, recCardio()]
  ];
  applyPreferences();
  var msg = "";
  var arr = identifyAreas();
  if (needRest()) {
    msg += "Rest for Today";
    for (var i = 0; i < muscles.length; i++) {
      muscles[i][1] = 0;
    }
  } else {
    for (var i = 0; i < muscles.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (arr[j] == i) {
          msg += muscles[i][3];
        }
      }
    }
  }
  return msg;
}
