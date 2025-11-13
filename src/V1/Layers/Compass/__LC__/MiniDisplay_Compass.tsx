import { AssetManager } from "@AssetManager";
import { memo, useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleProp, ViewStyle } from "react-native";

export const MiniDisplay_Compass = memo((props: {
  heading: number,
  style?: StyleProp<ViewStyle>
  onPress: () => void,
}) => {

  const { heading } = props
  const rotation = useRef(new Animated.Value(0)).current;
  const rotate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "-360deg"],
  });
  
  useEffect(() => {
    Animated.timing(rotation, {
      toValue: heading,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [heading]);

  return (
    <Pressable
      onPressIn={() => props.onPress()}
      style={props.style}
    >
      <Animated.Image
        key={'default_compass_mini'}
        source={{ uri: AssetManager.getCompassImage('COMPASS_BG_MINI') }}
        style={{
          height: 100,
          width: 100,
          justifyContent: "center",
          alignItems: "center",
          resizeMode: "contain",
          transform: [{ rotate }],
        }}
      />
    </Pressable>
  );
});