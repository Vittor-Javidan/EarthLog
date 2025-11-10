import React, { useState, memo, useCallback } from 'react';
import { Pressable } from 'react-native';

import { HapticsService } from '@V2/Services/HapticsService';

import { Icon, IconName } from '@V2/Icon/index';
import { Text } from '@V2/Text/index';

type ButtonTheme = {
  font: string
  font_active: string
  background: string
  background_active: string
}

export const RoundedIconButton = memo((props: {
  iconName: IconName
  showPlusSign: boolean
  buttonDiameter: number
  theme: ButtonTheme
  onPress: () => void
}) => {

  const [pressed, setPressed] = useState<boolean>(false);

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('success');
  }, [props.onPress]);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pressed ? props.theme.background_active : props.theme.background,
        borderColor: props.theme.background_active,
        height: props.buttonDiameter,
        width: props.buttonDiameter,
        borderRadius: props.buttonDiameter,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 3,
        elevation: 3,
      }}
    >
      {props.showPlusSign && (
        <Text
          style={{
            color: pressed ? props.theme.font_active : props.theme.font,
            fontSize: 25,
          }}
        >
          +
        </Text>
      )}
      <Icon
        iconName={props.iconName}
        color={pressed ? props.theme.font_active : props.theme.font}
        fontSize={20}
      />
    </Pressable>
  );
});
