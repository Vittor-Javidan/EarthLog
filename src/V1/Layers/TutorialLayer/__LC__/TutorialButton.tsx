import { memo } from "react";
import { Pressable } from "react-native";
import { Text } from "@V1/Text/index";

export const TutorialButton = memo((props: {
  label: string;
  onPress: () => void
}) => {
  return (
    <Pressable
      onPress={() => props.onPress()}
      style={{
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: '#000',
        }}
      >
        {props.label}
      </Text>
    </Pressable>
  );
});
