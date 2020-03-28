import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { createAppContainer, SafeAreaView } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  ApplicationProvider,
  Layout,
  Text,
  IconRegistry,
  Icon,
  BottomNavigation,
  BottomNavigationTab,
  Card
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as colors } from "../../../custom-theme.json";
import { LinearGradient } from "expo-linear-gradient";
import FlareComponent from "flare-react";
import waves from "./waves.flr";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#21c5f2", "#0058ab"]}
          style={styles.background}
        >
          <FlareComponent
            width={deviceWidth}
            height={deviceHeight * 1.5}
            animationName="main"
            transparent={true}
            file={waves}
          />
        </LinearGradient>
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
  background: {
    height: deviceHeight,
    width: deviceWidth
  }
});
