import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import {
  createAppContainer,
  SafeAreaView,
  withNavigation
} from "react-navigation";
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
  Modal,
  Select,
  Text as TextUIK
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as colors } from "../../../custom-theme.json";
import { WaveBackground } from "../../components/wave_background/wave_background";
import { QuickLog } from "../../components/quick_log/quick_log";
import { user, username } from "../login_screen/login_screen";
import { CarouselLog } from "../../components/carousel_log/carousel_log";
import { FAB } from "react-native-paper";
import firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const renderSettingsIcon = style => {
  return (
    <Icon
      name="settings-2-outline"
      {...style}
      fill="white"
      onPress={() => this.setVisible()}
    />
  );
};

const intensityOptions = [{ text: "1" }, { text: "2" }, { text: "3" }];

function scrub(str: string) {
  str = str.replace(/\./g, "");
  console.log(str);
  return str;
}

let preferences;

async function fetchPreferences() {
  let fetchedData;
  await firebase
    .database()
    .ref("/users/" + scrub(username) + "/preferences")
    .once("value")
    .then(function(snapshot) {
      fetchedData = snapshot.val();
      console.log(fetchedData);
    });
  preferences = fetchedData;
  console.log(preferences);
}

class SettingsModal extends React.Component {
  state = {
    chest: null,
    shoulder: null,
    back: null,
    triceps: null,
    bicep: null,
    quadriceps: null,
    hamstring: null,
    calves: null,
    cardio: null
  };

  setPreferenceToState(type: string) {
    if (preferences[type] == undefined || preferences[type] == null) {
      this.setState({ [type]: intensityOptions[0] });
    } else {
      this.setState({
        [type]: intensityOptions[Number.parseInt(preferences[type]) - 1]
      });
    }
  }

  async componentDidMount() {
    await fetchPreferences();
    this.setPreferenceToState("chest");
    this.setPreferenceToState("shoulder");
    this.setPreferenceToState("back");
    this.setPreferenceToState("triceps");
    this.setPreferenceToState("bicep");
    this.setPreferenceToState("quadriceps");
    this.setPreferenceToState("hamstring");
    this.setPreferenceToState("calves");
    this.setPreferenceToState("cardio");
    this.forceUpdate();
  }

  componentWillUnmount() {
    preferences = {
      chest: this.state.chest["text"],
      shoulder: this.state.shoulder["text"],
      back: this.state.back["text"],
      triceps: this.state.triceps["text"],
      bicep: this.state.bicep["text"],
      quadriceps: this.state.quadriceps["text"],
      hamstring: this.state.hamstring["text"],
      calves: this.state.calves["text"],
      cardio: this.state.cardio["text"]
    };
  }

  render() {
    return (
      <Layout style={styles.modal}>
        <ScrollView>
          <TextUIK
            category="h2"
            style={{ fontFamily: "Metropolis-Bold", margin: 16 }}
          >
            Intensity Preferences
          </TextUIK>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: 12
            }}
          >
            <TextUIK style={{ marginRight: 16 }}>Chest:</TextUIK>
            <Select
              data={intensityOptions}
              selectedOption={this.state.chest}
              onSelect={input => this.setState({ chest: input })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: 12
            }}
          >
            <TextUIK style={{ marginRight: 16 }}>Shoulder:</TextUIK>
            <Select
              data={intensityOptions}
              selectedOption={this.state.shoulder}
              onSelect={input => this.setState({ shoulder: input })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: 12
            }}
          >
            <TextUIK style={{ marginRight: 16 }}>Back:</TextUIK>
            <Select
              data={intensityOptions}
              selectedOption={this.state.back}
              onSelect={input => this.setState({ back: input })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: 12
            }}
          >
            <TextUIK style={{ marginRight: 16 }}>Triceps:</TextUIK>
            <Select
              data={intensityOptions}
              selectedOption={this.state.triceps}
              onSelect={input => this.setState({ triceps: input })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: 12
            }}
          >
            <TextUIK style={{ marginRight: 16 }}>Bicep:</TextUIK>
            <Select
              data={intensityOptions}
              selectedOption={this.state.bicep}
              onSelect={input => this.setState({ bicep: input })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: 12
            }}
          >
            <TextUIK style={{ marginRight: 16 }}>Quadriceps:</TextUIK>
            <Select
              data={intensityOptions}
              selectedOption={this.state.quadriceps}
              onSelect={input => this.setState({ quadriceps: input })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: 12
            }}
          >
            <TextUIK style={{ marginRight: 16 }}>Hamstring:</TextUIK>
            <Select
              data={intensityOptions}
              selectedOption={this.state.hamstring}
              onSelect={input => this.setState({ hamstring: input })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: 12
            }}
          >
            <TextUIK style={{ marginRight: 16 }}>Calves:</TextUIK>
            <Select
              data={intensityOptions}
              selectedOption={this.state.calves}
              onSelect={input => this.setState({ calves: input })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: 12
            }}
          >
            <TextUIK style={{ marginRight: 16 }}>Cardio:</TextUIK>
            <Select
              data={intensityOptions}
              selectedOption={this.state.cardio}
              onSelect={input => this.setState({ cardio: input })}
            />
          </View>
          <View style={{ height: deviceHeight / 16 }} />
        </ScrollView>
      </Layout>
    );
  }
}

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export class HomeScreen extends React.Component {
  state = {
    isVisible: false
  };

  setVisible() {
    this.setState({ isVisible: !this.state.isVisible });
  }

  goToChat = () => {
    this.props.navigation.navigate("ChatScreen", { name: username });
  };

  async savePreferences() {
    this.setVisible();
    await wait(500);
    await firebase
      .database()
      .ref("users/" + scrub(username))
      .set({
        preferences: {
          "chest": preferences["chest"],
          "shoulder": preferences["shoulder"],
          "back": preferences["back"],
          "triceps": preferences["triceps"],
          "bicep": preferences["bicep"],
          "quadriceps": preferences["quadriceps"],
          "hamstring": preferences["hamstring"],
          "calves": preferences["calves"],
          "cardio": preferences["cardio"]
        }
      });
    console.log(preferences);
    console.log(preferences["cardio"])
  }

  render() {
    return (
      <WaveBackground colors={["#21c5f2", "#0058ab"]}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>
            {"Welcome, " + username.substring(0, username.indexOf("@")) + "!"}
          </Text>
        </View>
        <QuickLog />
        <View style={{ height: deviceHeight / 12 }} />
        <Text style={styles.subText}>Recently logged:</Text>
        <CarouselLog />
        <FAB
          icon="chat"
          label="CHAT"
          style={styles.fab}
          onPress={() => this.goToChat()}
        />
        <Button
          icon={renderSettingsIcon}
          style={styles.settingsIcon}
          onPress={() => this.setVisible()}
        />
        <Modal
          backdropStyle={styles.modalBg}
          onBackdropPress={() => this.savePreferences()}
          visible={this.state.isVisible}
          style={{ alignSelf: "center" }}
        >
          <SettingsModal />
        </Modal>
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
  },
  subText: {
    fontFamily: "Metropolis-SemiBold",
    fontSize: deviceHeight / 40,
    color: "white",
    marginBottom: 12,
    marginLeft: 50
  },
  fab: {
    position: "absolute",
    bottom: -60,
    right: 50
  },
  settingsIcon: {
    height: deviceHeight / 32,
    width: deviceHeight / 32,
    position: "absolute",
    bottom: -65,
    left: 25
  },
  modal: {
    alignItems: "center",
    width: deviceWidth / 2,
    height: (7 * deviceHeight) / 8,
    backgroundColor: "white"
  },
  modalBg: {
    backgroundColor: "#00000080"
  }
});
