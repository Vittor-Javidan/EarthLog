import React, { useState, memo, useCallback } from 'react';
import { LayoutChangeEvent, Pressable } from 'react-native';

import HapticsService from '@V1/Services/HapticsService';

import { Icon, IconName } from '@V1/Icon/index';
import { Animation } from '@V1/Animation/index';

type InputTheme = {
  font: string
  background: string
}

export const NavbarIconButton = memo((props: {
  iconName: IconName
  selected?: boolean
  theme: InputTheme
  onPress: () => void
}) => {

  const [pressed       , setPressed       ] = useState<boolean>(false);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

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
          backgroundColor: (props.selected || pressed) ? props.theme.font : props.theme.background,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          paddingHorizontal: 2,
          paddingVertical: 0,
          borderRadius: 10,
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
