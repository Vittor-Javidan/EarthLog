import React, { useState, memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';

import HapticsService from '@Services/HapticsService';

import { Icon } from '@Icon/index';
import { GPSInputTheme } from '../ThemeType';

export const FooterButtons = memo((props: {
  theme: GPSInputTheme
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
        theme={props.theme}
        onPress={() => props.onCancel()}
      />
      <FooterButton
        iconName="save"
        onPress={() => props.onSave()}
        theme={props.theme}
      />
    </View>
  );
});

const FooterButton = memo((props: {
  iconName: 'close' | 'save'
  theme: GPSInputTheme
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
        iconName={props.iconName}
        color={pressed ? backgroundColor : props.theme.font}
      />
    </Pressable>
  );
});
