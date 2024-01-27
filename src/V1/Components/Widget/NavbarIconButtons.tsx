import React, { useState, memo, useCallback } from 'react';
import { LayoutChangeEvent, Pressable } from 'react-native';

import HapticsService from '@V1/Services/HapticsService';

import { Icon, IconName } from '@V1/Icon/index';
import { Animation } from '@V1/Animation/index';

type ButtonTheme = {
  font: string
  background: string
}

export const NavbarIconButton = memo((props: {
  iconName: IconName
  position: 'right' | 'other' | 'bottom right'
  selected?: boolean
  theme: ButtonTheme
  onPress: () => void
}) => {

  const [pressed        , setPressed       ] = useState<boolean>(false);
  const [startAnimation , setStartAnimation] = useState<boolean>(false);

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('success');
  }, [props.onPress]);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.height > 0) {
      setStartAnimation(true);
    }
  }, []);

  return (
    <Animation.FadeOut
      start={startAnimation}
      duration={300}
      onLayout={event => onLayout(event)}
    >
      <Pressable
        onPressIn={() => onPressIn()}
        onPressOut={() => setPressed(false)}
        onPress={() => onPress()}
        style={{
          flexDirection: 'row',
          backgroundColor: (props.selected || pressed) ? props.theme.font : undefined,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          paddingHorizontal: 5,
          paddingVertical: 5,
          borderTopLeftRadius: props.position === 'bottom right' ? 10 : 0,
          borderTopRightRadius: props.position === 'right' ? 10 : 0,
          borderBottomRightRadius: props.position === 'right' ? 0 : 10,
          borderBottomLeftRadius: props.position === 'bottom right' ? 0 : 10,
        }}
      >
        <Icon
          iconName={props.iconName}
          color={(props.selected || pressed) ? props.theme.background : props.theme.font}
        />
      </Pressable>
    </Animation.FadeOut>
  );
});
