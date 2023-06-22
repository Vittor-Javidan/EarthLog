import React, { useState } from 'react';
import { GestureResponderEvent, Pressable, Text } from 'react-native';

export default function DrawerButton(props: {
  onPress: ((event: GestureResponderEvent) => void)
  title: string
}): JSX.Element {

  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <Pressable
      onPressIn={() => { setPressed(true); }}
      onPressOut={() => { setPressed(false); }}
      onPress={(event) => { props?.onPress(event); }}
      style={{
        backgroundColor: pressed ? '#0FF' : '#FFF',
        padding: 8,
      }}
    >
      <Text
        style={{
          fontSize: 24,
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  );
}
