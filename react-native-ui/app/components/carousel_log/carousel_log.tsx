import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { createAppContainer, SafeAreaView } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  ApplicationProvider,
  Layout,
  IconRegistry,
  Icon,
  BottomNavigation,
  BottomNavigationTab,
  Card
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as colors } from "../../../custom-theme.json";
import Carousel from "react-native-snap-carousel";

import { user, username } from "../../screens/login_screen/login_screen";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export class CarouselLog extends React.Component {
  render() {
    return <View style={styles.container}></View>; //types of exercise: chest, shoulder, back, tricep, bicep, quadriceps, hamstring, calves
  }
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight / 2,
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
    flexDirection: "row"
  },
  contentText: {
    color: "black"
  }
});
