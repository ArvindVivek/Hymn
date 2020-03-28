import React from "react";
import { StyleSheet, View, Dimensions, Text, AsyncStorage } from "react-native";
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

import { user, username, fetchUsername } from "../login_screen/login_screen";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export class LoadingCheck extends React.Component {
  async componentDidMount() {
    const userData = await AsyncStorage.getItem("credentials");
    if(userData) {
        await fetchUsername();
        this.props.navigation.navigate("HomeScreen");
    } else {
        this.props.navigation.navigate("LoginScreen")
    }
  }
  
  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292929",
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
  }
});
