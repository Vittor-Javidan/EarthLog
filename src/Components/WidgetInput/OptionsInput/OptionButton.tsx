import React, { memo, useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';

import { WidgetTheme } from '@Types/ProjectTypes';
import FontService from '@Services/FontService';
import HapticsService from '@Services/HapticsService';

import { Button } from '@Button/index';

export const OptionButton = memo((props: {
  label: string
  checked: boolean
  theme: WidgetTheme
  onCheckedChange: (checked: boolean) => void
  onOptionLabelChange: (newLabel: string) => void
}) => {

  const [label          , setLabel          ] = useState<string>(props.label);
  const [editOptionLabel, setEditOptionLabel] = useState<boolean>(false);

  const onOptionLabelChange = useCallback((newLabel: string) => {
    props.onOptionLabelChange(newLabel);
    setLabel(newLabel);
  }, [label]);

  const onCheckChange = useCallback((checked: boolean) => {
    props.onCheckedChange(checked);
    HapticsService.vibrate('success');
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 5,
      }}
    >
      <Button.Checkbox
        value={props.checked}
        onChange={(checked) => onCheckChange(checked)}
        theme={props.theme}
      />
      <OptionLabel
        label={label}
        onPress={() => setEditOptionLabel(true)}
        onConfirm={() => setEditOptionLabel(false)}
        onLabelChange={(newLabel) => onOptionLabelChange(newLabel)}
        theme={props.theme}
        editLabel={editOptionLabel}
      />
    </View>
  );
});

export const OptionLabel = memo((props: {
  label: string
  editLabel: boolean
  theme: WidgetTheme
  onPress: () => void
  onConfirm: () => void
  onLabelChange: (label: string) => void
}) => {

  const [focused, setFocused] = useState<boolean>(false);

  const onConfirm = useCallback(() => {
    setFocused(false);
    props.onConfirm();
  }, [props.onConfirm]);

  const onFocus = useCallback(() => {
    setFocused(true);
    HapticsService.vibrate('warning');
  }, []);


  return (
    <View
      style={{
        alignItems: 'flex-start',
        alignSelf: 'center',
        flex: 1,
      }}
    >
      <TextInput
        style={{
          color: focused ? props.theme.background : props.theme.font,
          backgroundColor: focused ? props.theme.font : props.theme.background,
          fontSize: FontService.FONTS.h3,
          borderRadius: 5,
          paddingVertical: 0,
          paddingHorizontal: 5,
        }}
        placeholder=" -------"
        placeholderTextColor={focused ? props.theme.background : props.theme.font_placeholder}
        value={props.label}
        onChangeText={(text) => props.onLabelChange(text)}
        onFocus={() => onFocus()}
        onBlur={() => onConfirm()}
        multiline
      />
    </View>
  );
});
