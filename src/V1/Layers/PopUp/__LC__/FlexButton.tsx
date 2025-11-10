import React, { memo, useMemo, useState, useCallback } from 'react';
import  { Pressable, View } from 'react-native';

import { ThemeService } from '@V1/Services_Core/ThemeService';
import { HapticsService } from '@V1/Services/HapticsService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Text } from '@V1/Text/index';

export const FlexButton = memo((props: {
  title: string
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const [pressed, setPressed] = useState<boolean>(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('success');
  }, [props.onPress]);

  return (
    <View>
      <Pressable
        onPressIn={() => onPressIn()}
        onPressOut={() => setPressed(false)}
        onPress={() => onPress()}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
          backgroundColor: pressed ? theme.background_active : theme.background_Button,
        }}
      >
        <Text h3
          style={{
            color: pressed ? theme.font_active : theme.font_button,
            textAlign: 'center',
          }}
        >
          {props.title}
        </Text>
      </Pressable>
    </View>
  );
});
