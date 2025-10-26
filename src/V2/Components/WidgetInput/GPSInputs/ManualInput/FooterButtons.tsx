import React, { useState, memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';

import { WidgetTheme } from '@V2/Types/ProjectTypes';
import { HapticsService } from '@V2/Services/HapticsService';

import { Icon } from '@V2/Icon/index';

export const FooterButtons = memo((props: {
  theme: WidgetTheme
  onCancel: () => void
  onSave: () => void
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
      }}
    >
      <FooterButton
        iconName="close"
        iconSize={40}
        theme={props.theme}
        onPress={() => props.onCancel()}
      />
      <FooterButton
        iconName="save"
        iconSize={28}
        onPress={() => props.onSave()}
        theme={props.theme}
      />
    </View>
  );
});

const FooterButton = memo((props: {
  iconName: 'close' | 'save'
  iconSize: number
  theme: WidgetTheme
  onPress: () => void
}) => {

  const [pressed, setPressed] = useState<boolean>(false);
  const backgroundColor = props.iconName === 'close' ? props.theme.wrong : props.theme.confirm;

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
        backgroundColor: pressed ? props.theme.font : backgroundColor,
        flex: 1,
        height: 40,
        paddingHorizontal: 20,
        paddingVertical: props.iconName === 'close' ? 0 : 5,
        borderRadius: 10,
      }}
    >
      <Icon
        fontSize={props.iconSize}
        iconName={props.iconName}
        color={pressed ? backgroundColor : props.theme.font}
      />
    </Pressable>
  );
});
