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
import { recommendation } from "../home_screen/home_screen";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export class RecommendationScreen extends React.Component {
  render() {
    return (
      <WaveBackground colors={["#ebc702", "#b58100"]}>
        <View style={styles.container}>
          <Text style={styles.headerText}>{"Recommendations"}</Text>
          <View style={{height: deviceHeight/16}} />
          <Text style={styles.contentText}>{recommendation}</Text>
        </View>
      </WaveBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
    alignItems: "center",
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
    color: "white",
    textShadowColor: "#00000087",
    textShadowRadius: 10,
    margin: 15
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
