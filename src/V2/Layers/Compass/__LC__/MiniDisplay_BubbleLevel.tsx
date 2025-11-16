import { memo, useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleProp, ViewStyle } from "react-native";
import { AssetManager } from "@AssetManager";
import { Text } from "@V2/Text/index";

export const MiniDisplay_BubbleLevel = memo((props: {
  pitch: number,
  roll: number,
  style?: StyleProp<ViewStyle>
  onPress: () => void,
}) => {

  const { pitch, roll } = props;
  const rotation = useRef(new Animated.Value(0)).current;
  const rotate = rotation.interpolate({
    inputRange: [-360, 360],
    outputRange: ["360deg", "-360deg"],
  });

  useEffect(() => { 
    Animated.timing(rotation, {
      toValue: roll < 0 ? -(90 - pitch) : (90 - pitch),
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [pitch]);

  return (
    <Pressable
      onPressIn={() => props.onPress()}
      style={[{
        backgroundColor: '#000',
        borderRadius: 50,
      }, props.style]}
    >
      <Animated.Image
        key={'bubble_level_compass_mini'}
        source={{ uri: AssetManager.getCompassImage('COMPASS_BUBBLE_LEVEL_MINI') }}
        style={{
          height: 100,
          width: 100,
          justifyContent: "center",
          alignItems: "center",
          resizeMode: "contain",
          transform: [{ rotate }],
        }}
      />
      <Animated.View
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ rotate }],
          paddingTop: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24 }}>{`${Math.abs(pitch).toFixed(2)}°`}</Text>
      </Animated.View>
    </Pressable>
  )
});