import React from "react";
import { StyleSheet, View, Dimensions, TextInput } from "react-native";
import { createAppContainer, SafeAreaView } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  ApplicationProvider,
  Layout,
  IconRegistry,
  Icon,
  BottomNavigation,
  BottomNavigationTab,
  Card,
  Input,
  Text,
  Button,
  Select
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as colors } from "../../../custom-theme.json";
import { WaveBackground } from "../../components/wave_background/wave_background";
import * as moment from "moment";
import { database } from "firebase";
import { username } from "../../screens/login_screen/login_screen";
import firebase from "firebase";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

function scrub(str: string) {
  str = str.replace(/\./g, "");
  console.log(str);
  return str;
}

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

let userData = [];
export {userData};

export async function fetchUserData() {
  let fetchedData;
  await firebase
    .database()
    .ref("/users/" + scrub(username))
    .once("value")
    .then(function(snapshot) {
      fetchedData = snapshot.val();
      console.log(fetchedData);
    });
  await wait(500);
  userData = new Array();
  for (var i in fetchedData) {
    if ("p" == i.substring(0, 1)) {
    } else {
      userData.push({
        date: i,
        type: fetchedData[i]["type_of_exercise"],
        sets: fetchedData[i]["num_of_sets"],
        reps: fetchedData[i]["num_of_reps"]
      });
    }
  }
  userData = userData.reverse();
  console.log(userData);
}

async function logData(type, sets: string, reps: string) {
  var now = moment();
  if(type["text"] == undefined || type["text"] == null) {
    alert("please fill out all of the spaces");
    return;
  }
  type = type["text"].toLowerCase();
  if (type == "" || sets == "" || reps == "") {
    alert("please fill out all of the spaces");
    return;
  }
  if (isNaN(sets)) {
    alert("sets is not a number");
    return;
  }
  if (isNaN(reps)) {
    alert("reps is not a number");
    return;
  }
  await firebase
    .database()
    .ref("users/" + scrub(username) + "/" + now.format())
    .set({
      type_of_exercise: type,
      num_of_sets: sets,
      num_of_reps: reps
    });
  await fetchUserData();
  return true;
}

export class QuickLog extends React.Component {
  state = {
    type: -1,
    reps: "",
    sets: "",
  };

  options = [
    {text: "Chest"},
    {text: "Shoulder"},
    {text: "Back"},
    {text: "Triceps"},
    {text: "Bicep"},
    {text: "Quadriceps"},
    {text: "Hamstring"},
    {text: "Calves"},
    {text: "Cardio"}
  ]

  setType = type => {
    this.setState({ type: type });
  };

  setReps = reps => {
    this.setState({ reps: reps });
  };

  setSets = sets => {
    this.setState({ sets: sets });
  };

  async submitData() {
    var check = await logData(
      this.state.type,
      this.state.sets,
      this.state.reps
    );
    if (check) {
      this.setState({ type: "" });
      this.setState({ sets: "" });
      this.setState({ reps: "" });
    }
  }

  render() {
    return (
      <View style={styles.quickBox}>
        <Text category="s1" style={styles.contentText}>
          Quickly log your workout:
        </Text>
        <Select
          placeholder="type of exercise"
          data={this.options}
          onSelect={this.setType}
          selectedOption={this.state.type}
        />
        <Input
          placeholder="# of sets"
          value={this.state.sets}
          onChangeText={this.setSets}
        />
        <Input
          placeholder="# of reps"
          value={this.state.reps}
          onChangeText={this.setReps}
        />
        <Button onPress={() => this.submitData()}>Submit</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center"
  },
  headerBox: {
    margin: 15,
    alignItems: "center",
    width: deviceWidth
  },
  headerText: {
    fontFamily: "Metropolis-Bold",
    fontSize: deviceHeight / 20,
    color: "white"
  },
  quickBox: {
    width: deviceWidth,
    height: deviceHeight / 12,
    backgroundColor: "#FFFFFF70",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  contentText: {
    color: "white",
    fontFamily: "Metropolis-SemiBold",
    textShadowColor: "#00000087",
    textShadowRadius: 10
  }
});
