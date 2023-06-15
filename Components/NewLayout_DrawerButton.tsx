import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';

export default function NewLayout_DrawerButton(): JSX.Element {

  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <Pressable
      onPressIn={() => { setPressed(true); }}
      onPressOut={() => { setPressed(false); }}
      onPress={() => {}}
      style={{
        backgroundColor: pressed ? '#0FF' : '#FFF',
      }}
    >
      <Text>Button</Text>
    </Pressable>
  );
}
