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
import { WaveBackground } from "../../components/wave_background/wave_background";
import { QuickLog } from "../../components/quick_log/quick_log";

import { user, username } from "../login_screen/login_screen";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export class HomeScreen extends React.Component {
  render() {
    return (
      <WaveBackground colors={["#21c5f2", "#0058ab"]}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>
            {"Welcome, " + username.substring(0, username.indexOf("@")) + "!"}
          </Text>
        </View>
        <QuickLog />
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
  },
  quickBox: {
    width: deviceWidth,
    height: deviceHeight/12,
    backgroundColor: "#FFFFFF70",
    flexDirection: "row"
  },
  contentText: {
    color: "black",
  }
});
