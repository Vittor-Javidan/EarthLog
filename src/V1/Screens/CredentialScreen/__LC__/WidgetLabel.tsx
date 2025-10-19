import React, { memo, useCallback, useMemo, useState } from 'react';
import { TextInput, View } from 'react-native';

import { WidgetTheme } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import HapticsService from '@V1/Services/HapticsService';
import ConfigService from '@V1/Services/ConfigService';
import FontService from '@V1/Services/FontService';

export const WidgetLabel = memo((props: {
  label: string
  theme: WidgetTheme
  onLabelChange: (label: string) => void
}) => {

  const config                = useMemo(() => ConfigService.config, []);
  const R                     = useMemo(() => translations.component.layout.pseudoWidget[config.language], []);
  const [focused, setFocused] = useState<boolean>(false);

  const onFocus = useCallback(() => {
    setFocused(true);
    HapticsService.vibrate('success');
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        paddingHorizontal: 5,
        width: '100%',
      }}
    >
      <TextInput
        style={{
          textAlign: 'center',
          color: focused ? props.theme.background : props.theme.font,
          backgroundColor: focused ? props.theme.font : undefined,
          fontSize: 20,
          fontFamily: FontService.FONT_FAMILY.h2,
          borderRadius: 5,
          paddingHorizontal: 5,
          minHeight: 34,
          width: '90%',
        }}
        placeholder={R['Server name']}
        placeholderTextColor={focused ? props.theme.background : props.theme.font_placeholder}
        value={props.label}
        onChangeText={(text) => props.onLabelChange(text)}
        onBlur={() => setFocused(false)}
        onFocus={() => onFocus()}
        multiline
      />
    </View>
  );
});
