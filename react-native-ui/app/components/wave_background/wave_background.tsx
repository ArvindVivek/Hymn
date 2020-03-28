import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FlareComponent from "flare-react";
import waves from "./waves.flr";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

interface WaveBackgroundProps {
    colors: Array<string>
}

export class WaveBackground extends React.Component<WaveBackgroundProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { colors } = this.props;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={colors}
          style={styles.background}
        >
          <FlareComponent
            width={deviceWidth}
            height={deviceHeight * 1.5}
            animationName="main"
            transparent={true}
            file={waves}
          />
        </LinearGradient>
        <View style={{ position: "absolute" }}>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    height: deviceHeight,
    width: deviceWidth
  }
});
