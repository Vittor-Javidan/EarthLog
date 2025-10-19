import React, { useMemo, useState, memo, useCallback } from 'react';
import { Pressable } from 'react-native';

import { translations } from '@V2/Translations/index';
import HapticsService from '@V2/Services/HapticsService';
import ConfigService from '@V2/Services/ConfigService';
import FontService from '@V2/Services/FontService';

import { Icon } from '@V2/Icon/index';
import { Text } from '@V2/Text/index';

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
          color: pressed ? props.theme.background : props.theme.font,
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
