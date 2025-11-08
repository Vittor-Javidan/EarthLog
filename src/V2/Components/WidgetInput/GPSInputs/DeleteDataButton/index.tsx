import React, { useState, memo, useCallback } from 'react';
import { Pressable } from 'react-native';

import { WidgetTheme } from '@V2/Types/ProjectTypes';
import { HapticsService } from '@V2/Services/HapticsService';

import { Icon } from '@V2/Icon/index';

export const DeleteDataButton = memo((props: {
  theme: WidgetTheme
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: props.theme.font,
        borderRadius: 10,
        backgroundColor: pressed ? props.theme.background : props.theme.wrong,
      }}
    >
      <Icon
        fontSize={24}
        iconName="trash-outline"
        color={pressed ? props.theme.wrong : props.theme.background}
      />
    </Pressable>
  );
});
