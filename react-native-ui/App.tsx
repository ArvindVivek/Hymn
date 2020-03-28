import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  ApplicationProvider,
  Layout,
  Text,
  IconRegistry,
  Icon,
  BottomNavigation,
  BottomNavigationTab
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping, dark as darkTheme } from "@eva-design/eva";
import { light as lightTheme } from "@eva-design/eva";
import { default as appTheme } from "./custom-theme.json";
import { default as customMapping } from "./custom-mapping.json";
import * as Font from "expo-font";
import * as firebase from 'firebase';

import { HomeScreen } from "./app/screens/home_screen/home_screen";

var theme = { ...lightTheme, ...appTheme };

var firebaseConfig = {
  apiKey: "AIzaSyCNoFTtU6ptY4xMA33oRdPqOnE3RMTO3hg",
  authDomain: "patriotapp-49caf.firebaseapp.com",
  databaseURL: "https://patriotapp-49caf.firebaseio.com",
  projectId: "patriotapp-49caf",
  storageBucket: "patriotapp-49caf.appspot.com",
  messagingSenderId: "86407120548",
  appId: "1:86407120548:web:a786d71211e74d55150831",
  measurementId: "G-N0LH0BYTTN"
};

firebase.initializeApp(firebaseConfig);


export default class App extends React.Component {
  async loadFonts() {
    await Font.loadAsync({
      "Metropolis-Regular": require("./assets/fonts/metropolis/Metropolis-Regular.ttf")
    });
    await Font.loadAsync({
      "Metropolis-Medium": require("./assets/fonts/metropolis/Metropolis-Medium.ttf")
    });
    await Font.loadAsync({
      "Metropolis-SemiBold": require("./assets/fonts/metropolis/Metropolis-SemiBold.ttf")
    });
    await Font.loadAsync({
      "Metropolis-Bold": require("./assets/fonts/metropolis/Metropolis-Bold.ttf")
    });
    await Font.loadAsync({
      "Metropolis-ExtraBold": require("./assets/fonts/metropolis/Metropolis-ExtraBold.ttf")
    });
    await Font.loadAsync({
      "Metropolis-Black": require("./assets/fonts/metropolis/Metropolis-Black.ttf")
    });
    await Font.loadAsync({
      Manrope: require("./assets/fonts/ManropeGX.ttf")
    });
    await Font.loadAsync({
      Inter: require("./assets/fonts/Inter.otf")
    });
  }

  async UNSAFE_componentWillMount() {
    await this.loadFonts();
    await this.forceUpdate();
  }

  render() {
    return (
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          mapping={mapping}
          theme={theme}
          customMapping={customMapping}
        >
          <AppNavigator />
        </ApplicationProvider>
      </React.Fragment>
    );
  }
}

export const StackNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false
    }
  }
});

export const AppNavigator = createAppContainer(StackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
