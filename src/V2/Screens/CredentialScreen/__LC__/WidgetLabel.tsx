import React, { memo, useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';

import { WidgetTheme } from '@V2/Types/ProjectTypes';
import HapticsService from '@V2/Services/HapticsService';
import FontService from '@V2/Services/FontService';

export const WidgetLabel = memo((props: {
  label: string
  theme: WidgetTheme
  onLabelChange: (label: string) => void
}) => {

  const [focused, setFocused] = useState<boolean>(false);

  const onFocus = useCallback(() => {
    setFocused(true);
    HapticsService.vibrate('success');
  }, []);

  return (
    <View
      style={{
        alignItems: 'flex-start',
        alignSelf: 'center',
        paddingHorizontal: 5,
      }}
    >
      <TextInput
        style={{
          textAlign: 'center',
          color: focused ? props.theme.background : props.theme.font,
          backgroundColor: focused ? props.theme.font : props.theme.background,
          fontSize: FontService.FONTS.h2,
          borderRadius: 5,
          paddingVertical: 0,
          paddingHorizontal: 5,
          minWidth: 50,
        }}
        placeholder="-------"
        placeholderTextColor={focused ? props.theme.background : props.theme.font}
        value={props.label}
        onChangeText={(text) => props.onLabelChange(text)}
        onBlur={() => setFocused(false)}
        onFocus={() => onFocus()}
        multiline
      />
    </View>
  );
});