import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { WaveBackground } from "./../../components/wave_background/wave_background";

type Props = {
  name?: string;
};

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export class ChatScreen extends React.Component<Props> {
  state = {
    messages: []
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hey, got any new exercises?",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    return (
      <WaveBackground colors={["#a002eb", "#3f0093"]} styles={styles.waveContainer}>
        <View style={styles.container}>
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>{"Chat"}</Text>
          </View>
          <View style={styles.chatContainer}>
            <GiftedChat
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              user={{
                _id: 1
              }}
            />
          </View>
        </View>
      </WaveBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    color: "white",
    fontSize: deviceHeight / 20,
    alignItems: "center",
    justifyContent: "center"
  },
  chatContainer: {
    width: deviceWidth * 0.3,
    height: deviceHeight * 0.75,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "#FFFFFF30",
    borderRadius: 40
  },
  waveContainer: {
    alignItems: "center",
    justifyContent: "center",

  }
});
