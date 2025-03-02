import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ColourCircle } from "./ColourCircle";

export default function App() {
  const [currentFiddle, setCurrentFiddle] = useState("colourCircle");

  const config = {
    duration: 350,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const buttonStyle = (isActive) => {
    return useAnimatedStyle(() => {
      return {
        backgroundColor: withTiming(isActive ? "orange" : "blue", config),
        flex: 1,
      };
    });
  };

  const buttonTextStyle = (isActive) => {
    return useAnimatedStyle(() => {
      return {
        color: withTiming(isActive ? "blue" : "orange", config),
        fontWeight: 700,
      };
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <Animated.View style={[buttonStyle(currentFiddle === "colourCircle")]}>
          <TouchableOpacity
            style={[
              { padding: 20 },
              buttonStyle(currentFiddle === "colourCircle"),
            ]}
            onPress={() => setCurrentFiddle("colourCircle")}
          >
            <Animated.Text
              style={buttonTextStyle(currentFiddle === "colourCircle")}
            >
              Colour Circle
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[buttonStyle(currentFiddle === "off")]}>
          <TouchableOpacity
            style={[{ padding: 20 }, buttonStyle(currentFiddle === "off")]}
            onPress={() => setCurrentFiddle("off")}
          >
            <Animated.Text style={buttonTextStyle(currentFiddle === "off")}>
              Off
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      {currentFiddle === "colourCircle" && <ColourCircle />}
      {currentFiddle === "off" && (
        <View style={{ flex: 1, backgroundColor: "black" }} />
      )}
    </View>
  );
}
