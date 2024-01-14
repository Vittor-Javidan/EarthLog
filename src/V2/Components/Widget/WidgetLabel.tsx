import React, { memo, useCallback, useMemo, useState } from 'react';
import { TextInput, View } from 'react-native';

import { WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import HapticsService from '@V2/Services/HapticsService';
import ConfigService from '@V2/Services/ConfigService';
import FontService from '@V2/Services/FontService';

export const WidgetLabel = memo((props: {
  label: string
  allowWidgetNameChange: boolean | undefined
  theme: WidgetTheme
  onLabelChange: (label: string) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widget.Root[config.language], []);
  const [focused, setFocused] = useState<boolean>(false);

  const onFocus = useCallback(() => {
    setFocused(true);
    HapticsService.vibrate('success');
  }, []);

  const isLabelEmpty = props.label === '';

  return (
    <View
      style={{
        alignItems: 'flex-start',
        alignSelf: 'center',
        paddingHorizontal: 5,
      }}
    >
      <TextInput
        editable={props.allowWidgetNameChange ?? false}
        style={{
          textAlign: 'center',
          color: focused ? props.theme.background : props.theme.font,
          backgroundColor: focused ? props.theme.font : undefined,
          fontSize: FontService.FONTS.h2,
          fontWeight: '500',
          borderRadius: 5,
          paddingVertical: 0,
          paddingHorizontal: 5,
          minWidth: 50,
          fontStyle: isLabelEmpty ? 'italic' : undefined,
        }}
        placeholder={R['Widget name']}
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
