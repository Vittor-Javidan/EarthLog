import { memo, useState } from "react";
import { Pressable } from "react-native";
import { Icon } from "@V1/Icon/index";

export const Button_Map = memo((props: {
  onPress: () => void
}) => {

  const [pressed, setPressed] = useState<boolean>(false);
  const BOTTOM = 170;

  return (
    <Pressable
      onPress={() => props.onPress()}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        position: 'absolute',
        right: 0,
        bottom: BOTTOM,
        zIndex: 21,
        backgroundColor: pressed ? 'red' : 'white',
        height: 60,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
      }}
    >
      <Icon
        iconName="map"
        color={pressed ? "white" : "red"}
        fontSize={30}
      />
    </Pressable>
  );
});
