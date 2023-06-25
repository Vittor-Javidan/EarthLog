import React, { useState } from 'react';
import { GestureResponderEvent, Pressable, Text } from 'react-native';
import APPColors from '../../Globals/Colors';

export default function LayoutDrawerButton(props: {
  title: string
  overrideBackgroundColor?: string
  overrideTextColor?: string
  onPress: ((event: GestureResponderEvent) => void)
}): JSX.Element {

  const [pressed, setPressed] = useState<boolean>(false);
  const backgroundColor = props.overrideBackgroundColor ? props.overrideBackgroundColor : APPColors.terciary;
  const textColor = props.overrideTextColor ? props.overrideTextColor : APPColors.onTerciary;

  return (
    <Pressable
      onPressIn={() => { setPressed(true); }}
      onPressOut={() => { setPressed(false); }}
      onPress={(event) => { props?.onPress(event); }}
      style={{
        backgroundColor: pressed ? APPColors.onPressColorPrimary : backgroundColor,
        opacity: pressed ? 0.9 : 1,
        padding: 10,
      }}
    >
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: textColor,
          fontSize: 24,
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  );
}
