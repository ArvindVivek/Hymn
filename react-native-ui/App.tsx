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
import { LoginScreen } from "./app/screens/login_screen/login_screen";
import { LoadingCheck } from "./app/screens/loading_check/loading_check"
import { ChatScreen } from "./app/screens/chat_screen/chat_screen";
import { RecommendationScreen } from "./app/screens/recommendation_screen/recommendation_screen";
import { inStatus } from "./app/screens/home_screen/home_screen"

var theme = { ...lightTheme, ...appTheme };

const firebaseConfig = {
  apiKey: "AIzaSyBkGmqg0xyAPT7yuru-SdBpMXucpeUIwEI",
  authDomain: "lahacks2020-aedfb.firebaseapp.com",
  databaseURL: "https://lahacks2020-aedfb.firebaseio.com",
  projectId: "lahacks2020-aedfb",
  storageBucket: "lahacks2020-aedfb.appspot.com",
  messagingSenderId: "817369168992",
  appId: "1:817369168992:web:804654ce3e747cdf7ed705",
  measurementId: "G-V62EZTESV5"
};

firebase.initializeApp(firebaseConfig);

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

let inStatusCache = 0;

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

  beginPolling() {
    let _this = this;
    inStatusCache = inStatus;
    setInterval(function() {
      if(inStatusCache != inStatus) {
        _this.forceUpdate();
        inStatusCache = inStatus;
      }
    }, 1000);
  }

  async UNSAFE_componentWillMount() {
    await this.loadFonts();
    await wait(2000);
    await this.forceUpdate();
  }

  componentDidMount() {
    this.beginPolling();
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
  LoadingCheck: {
    screen: LoadingCheck,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false
    }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false
    }
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false
    }
  },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      gestureEnabled: false
    }
  },
  RecommendationScreen: {
    screen: RecommendationScreen,
    navigationOptions: {
      gestureEnabled: false
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
