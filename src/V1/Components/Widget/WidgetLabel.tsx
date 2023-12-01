import React, { memo, useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';

import { WidgetTheme } from '@V1/Types/ProjectTypes';
import HapticsService from '@V1/Services/HapticsService';
import FontService from '@V1/Services/FontService';

export const WidgetLabel = memo((props: {
  label: string
  allowWidgetNameChange: boolean | undefined
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
