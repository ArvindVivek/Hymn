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
import { WaveBackground } from "./../../components/WaveBackground"

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const name = "twoad";

export class HomeScreen extends React.Component {
  render() {
    return (
      <WaveBackground>
        <Layout>
          <Text category="h1">
            {"Welcome, " + name + "!"}
          </Text>
        </Layout>
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
  background: {
    height: deviceHeight,
    width: deviceWidth
  }
});
