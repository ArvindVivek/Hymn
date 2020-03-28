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
import { WaveBackground } from "./../../components/WaveBackground";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const name = "twoad";

export class HomeScreen extends React.Component {
  render() {
    return (
      <WaveBackground colors={["#21c5f2", "#0058ab"]}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>
            {"Welcome, " + name + "!"}
          </Text>
        </View>
      </WaveBackground>
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
    fontSize: deviceHeight/20,
    color: "white"
  }
});
