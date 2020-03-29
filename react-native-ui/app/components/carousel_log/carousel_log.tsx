import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
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
  Text as TextUIK
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as colors } from "../../../custom-theme.json";
import Carousel from "react-native-sideswipe";
import firebase from "firebase";
import { Pagination } from "react-native-snap-carousel";
import * as moment from "moment";
import { user, username } from "../../screens/login_screen/login_screen";
import { images } from "./images";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let userData = [];

function scrub(str: string) {
  str = str.replace(/\./g, "");
  console.log(str);
  return str;
}

async function fetchUserData() {
  let fetchedData;
  await firebase
    .database()
    .ref("/users/" + scrub(username))
    .once("value")
    .then(function(snapshot) {
      fetchedData = snapshot.val();
      console.log(fetchedData);
    });
  userData = new Array<Object>();
  for (var i in fetchedData) {
    if (isNaN(i.substring(0, 1))) {
    } else {
      userData.push({
        date: i,
        type: fetchedData[i]["type_of_exercise"],
        sets: fetchedData[i]["num_of_sets"],
        reps: fetchedData[i]["num_of_reps"]
      });
    }
  }
  userData = userData.reverse();
  console.log(userData);
}

function selectLevel(item) {
  let sets = Number.parseInt(item["sets"]);
  if (sets <= 3) {
    return "level_1";
  } else if (sets == 4) {
    return "level_2";
  } else {
    return "level_3";
  }
}

function selectImage(item) {
  // return images[item["type"]];
  return require("../../../assets/img/exercises/" +
    selectLevel(item) +
    "/" +
    item["type"] +
    ".png");
}

function renderHeader(item) {
  var header = () => (
    <Image
      style={styles.headerImage}
      source={{
        uri: selectImage(item)
      }}
      resizeMode="contain"
    />
  );
  return header;
}

export class CarouselLog extends React.Component {
  state = {
    slider1ActiveSlide: 0
  };

  async componentDidMount() {
    await fetchUserData();
    this.forceUpdate();
  }

  renderItem({ item, index }) {
    return (
      <View>
        <View style={{ position: "absolute" }}>
          <Text>Test</Text>
        </View>
      </View>
    );
  }

  handleBackPress() {
    let current = this.state.slider1ActiveSlide;
    let newVal = current - 1;
    if (newVal < 0) {
      newVal = userData.length - 1;
    }
    this.setState({ slider1ActiveSlide: newVal });
  }

  handleForwardPress() {
    let current = this.state.slider1ActiveSlide;
    let newVal = current + 1;
    if (newVal >= userData.length) {
      newVal = 0;
    }
    this.setState({ slider1ActiveSlide: newVal });
  }

  render() {
    return (
      <View style={styles.trueContainer}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.handleBackPress()}>
            <View style={styles.button}>
              <Icon
                name="arrow-ios-back-outline"
                height={deviceWidth / 16}
                width={deviceWidth / 16}
                fill="white"
              />
            </View>
          </TouchableOpacity>

          <View style={styles.box}>
            <Carousel
              index={this.state.slider1ActiveSlide}
              contentOffset={deviceWidth / 8 + deviceHeight / 16}
              data={userData}
              renderItem={({
                itemIndex,
                currentIndex,
                item,
                animatedValue
              }) => (
                <Card header={renderHeader(item)} style={styles.card}>
                  <TextUIK appearance="hint">
                    {moment(item["date"]).calendar()}
                  </TextUIK>
                  <TextUIK category="h2" style={styles.cardTitle}>
                    {item["type"] +
                      " exercise; " +
                      item["sets"] +
                      " sets, " +
                      item["reps"] +
                      " reps"}
                  </TextUIK>
                </Card>
              )}
              itemWidth={(2 * deviceWidth) / 3}
              style={{
                width: deviceWidth - 30,
                maxHeight: deviceHeight / 2 - 15
              }}
              onIndexChange={index =>
                this.setState(() => ({ currentIndex: index }))
              }
            />
          </View>
          <TouchableOpacity onPress={() => this.handleForwardPress()}>
            <View style={styles.button}>
              <Icon
                name="arrow-ios-forward-outline"
                height={deviceWidth / 16}
                width={deviceWidth / 16}
                fill="white"
              />
            </View>
          </TouchableOpacity>
        </View>
        <Pagination
          activeDotIndex={this.state.slider1ActiveSlide}
          dotsLength={userData.length}
        />
      </View>
    ); //types of exercise: chest, shoulder, back, tricep, bicep, quadriceps, hamstring, calves
  }
}

const styles = StyleSheet.create({
  trueContainer: {
    width: deviceWidth,
    alignItems: "center"
  },
  container: {
    width: deviceWidth,
    height: deviceHeight / 2,
    backgroundColor: "#00000025",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  box: {
    width: (2 * deviceWidth) / 3,
    height: deviceHeight / 2,
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "center",
    overflow: "hidden",
    flexDirection: "row"
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
  card: {
    height: deviceHeight / 2,
    width: (2 * deviceWidth) / 3,
    justifyContent: "center"
  },
  button: {
    height: deviceHeight / 2,
    width: deviceWidth / 6,
    alignItems: "center",
    justifyContent: "center"
  },
  headerImage: {
    height: deviceHeight / 2 - deviceHeight / 8,
    width: (2 * deviceWidth) / 3
  },
  cardTitle: {
    fontFamily: "Metropolis-SemiBold"
  }
});
