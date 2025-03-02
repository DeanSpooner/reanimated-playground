import React from "react";

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { View, Button, ViewStyle } from "react-native";

export const ColourCircle = () => {
  const randomWidth = useSharedValue(200);
  const randomRed = useSharedValue(255);
  const randomGreen = useSharedValue(255);
  const randomBlue = useSharedValue(255);
  const randomBorderRadius = useSharedValue(12);
  const randomDegrees = useSharedValue(0);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const divStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
      height: withTiming(randomWidth.value, config),
      backgroundColor: withTiming(
        `rgb(${randomRed.value}, ${randomGreen.value}, ${randomBlue.value})`,
        config
      ),
      borderRadius: withTiming(randomBorderRadius.value, config),
    };
  });

  const pageStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        `rgb(${255 - randomRed.value}, ${255 - randomGreen.value}, ${
          255 - randomBlue.value
        })`,
        config
      ),
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(
        `rgb(${255 - randomRed.value}, ${255 - randomGreen.value}, ${
          255 - randomBlue.value
        })`,
        config
      ),
      fontSize: withTiming(randomWidth.value / 10, config),
    };
  });

  const textContainerStyle = useAnimatedStyle(() => {
    const radius = randomWidth.value / 4;

    const rotateValue = withTiming(`${randomDegrees.value}deg`, config);

    const translateX = radius * Math.sin((randomDegrees.value * Math.PI) / 180);
    const translateY =
      -radius * Math.cos((randomDegrees.value * Math.PI) / 180);

    return {
      position: "absolute",
      transform: [
        { translateX: withTiming(translateX, config) },
        { translateY: withTiming(translateY, config) },
        { rotate: rotateValue },
      ] as ViewStyle["transform"],
    };
  });

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        },
        pageStyle,
      ]}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          title="toggle"
          onPress={() => {
            randomWidth.value = 50 + Math.random() * 350;
            randomRed.value = Math.floor(Math.random() * 256);
            randomBlue.value = Math.floor(Math.random() * 256);
            randomGreen.value = Math.floor(Math.random() * 256);
            randomBorderRadius.value = Math.random() * randomWidth.value;
            randomDegrees.value = Math.random() * 360;
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              backgroundColor: "rgb(0, 0, 0)",
              borderWidth: 0,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            },
            divStyle,
          ]}
        >
          <Animated.View style={textContainerStyle}>
            <Animated.Text style={textStyle}>Dean</Animated.Text>
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};
