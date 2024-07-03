import React, { useMemo, useState, memo, useCallback } from 'react';
import { Pressable } from 'react-native';

import { translations } from '@V1/Translations/index';
import HapticsService from '@V1/Services/HapticsService';
import ConfigService from '@V1/Services/ConfigService';
import FontService from '@V1/Services/FontService';

import { Icon } from '@V1/Icon/index';
import { Text } from '@V1/Text/index';

type ButtonTheme = {
  font: string
  background: string
  confirm: string
  wrong: string
}

export const CancelButton = memo((props: {
  theme: ButtonTheme
  onPress: () => void
}) => {

  const config                = useMemo(() => ConfigService.config, []);
  const R                     = useMemo(() => translations.component.button[config.language], []);
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
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        backgroundColor: pressed ? props.theme.font : props.theme.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 100,
        height: 30,
        borderRadius: 15,
        paddingVertical: 0,
        paddingLeft: 10,
        paddingRight: 6,
      }}
    >
      <Text
        style={{
          fontFamily: FontService.FONT_FAMILY.p,
          fontSize: 200,
          color: pressed ? props.theme.background : props.theme.font,
          paddingVertical: 5,
        }}
      >
        {R['Cancel']}
      </Text>
      <Icon
        iconName="close"
        color={pressed ? props.theme.background : props.theme.font}
      />
    </Pressable>
  );
});
