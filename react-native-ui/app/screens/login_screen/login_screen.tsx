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
  Card,
  Button,
  CheckBox,
  Input
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as colors } from "../../../custom-theme.json";
import { WaveBackground } from "./../../components/WaveBackground";
import * as firebase from "firebase";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let user;
let username = "";
export { user, username };

export async function fetchUsername() {
    username = await AsyncStorage.getItem("name");
}

export class LoginScreen extends React.Component {
  async signUp(email: string, password: string) {
    if (email == null || email.length == 0) {
      alert("please enter your email");
      return;
    }
    if (password == null || password.length == 0) {
      alert("please enter your password");
      return;
    }
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    email = email.toLowerCase();
    if (!regex.test(String(email))) {
      alert("email not correctly formatted");
      return;
    }
    if (password.length < 6) {
      alert("password must be at least 6 characters");
      return;
    }

    let signupOutput = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(e => alert(e.message));
    console.log(signupOutput);
    if(signupOutput) {
        username = email.substring(0, email.indexOf("@"));
        user = signupOutput;
        this.props.navigation.navigate("HomeScreen");
    }

    await this.saveCookies();
  }

  async login(email: string, password: string) {
    if (email == null || email.length == 0) {
      alert("please enter your email");
      return;
    }
    if (password == null || password.length == 0) {
      alert("please enter your password");
      return;
    }
    email = email.toLowerCase();

    let loginOutput = await firebase.auth().signInWithEmailAndPassword(email, password).catch(e => alert(e.message));
    console.log(loginOutput);
    if(loginOutput) {
        username = email.substring(0, email.indexOf("@"));
        user = loginOutput;
        this.props.navigation.navigate("HomeScreen");
    }

    await this.saveCookies();
  }

  async saveCookies() {
    if(this.state.checked == true) {
        await AsyncStorage.setItem("credentials", JSON.stringify(user));
        await AsyncStorage.setItem("name", username);
    }
  }

  state = {
    email: "",
    password: "",
    checked: false
  };

  setEmail = email => {
    this.setState({ email });
  };

  setPassword = password => {
    this.setState({ password });
  };

  setChecked = () => {
    if (this.state.checked == false) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
  };

  render() {
    return (
      <WaveBackground colors={["#00eea2", "#009378"]}>
        <View style={styles.container}>
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>{"Login or Sign Up"}</Text>
          </View>

          <View style={styles.rowContainer} />

          <Input
            placeholder="Email"
            value={this.state.email}
            onChangeText={this.setEmail}
            style={styles.input}
            autoCompleteType="email"
          />

          <View style={styles.rowContainer}>
            <Input
              placeholder="Password"
              value={this.state.password}
              onChangeText={this.setPassword}
              style={styles.input}
              autoCompleteType="password"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.rowContainer} />

          <View style={styles.rowContainer}>
            <Button
              onPress={() => this.login(this.state.email, this.state.password)}
            >
              Login
            </Button>
            <View style={{ width: 20 }} />
            <Button
              onPress={() => this.signUp(this.state.email, this.state.password)}
            >
              Sign Up
            </Button>
          </View>

          <View style={styles.rowContainer}>
            <CheckBox
              text="Stay logged in?"
              checked={this.state.checked}
              onChange={this.setChecked}
              textStyle={{ color: "white" }}
            />
          </View>
        </View>
      </WaveBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
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
    color: "white"
  },
  rowContainer: {
    height: deviceHeight / 20,
    width: deviceWidth / 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: deviceWidth / 2
  }
});
