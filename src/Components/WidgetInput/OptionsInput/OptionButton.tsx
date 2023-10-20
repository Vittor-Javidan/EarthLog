import React, { memo, useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';

import { WidgetTheme } from '@Types/ProjectTypes';
import FontService from '@Services/FontService';
import HapticsService from '@Services/HapticsService';

import { Button } from '@Button/index';

export const OptionButton = memo((props: {
  label: string
  checked: boolean
  editMode: boolean
  allowOptionLabelChange: boolean | undefined
  theme: WidgetTheme
  onCheckedChange: (checked: boolean) => void
  onOptionLabelChange: (newLabel: string) => void
  onOptionDelete: () => void
}) => {

  const [label          , setLabel          ] = useState<string>(props.label);

  const onOptionLabelChange = useCallback((newLabel: string) => {
    props.onOptionLabelChange(newLabel);
    setLabel(newLabel);
  }, [props.onOptionLabelChange, label]);

  const onCheckChange = useCallback((checked: boolean) => {
    props.onCheckedChange(checked);
    HapticsService.vibrate('success');
  }, [props.onCheckedChange]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 5,
      }}
    >
      {props.editMode ? (
        <Button.Icon
          iconName="trash-outline"
          onPress={() => props.onOptionDelete()}
          theme={{
            font: props.theme.wrong,
            font_Pressed: props.theme.background,
            background: props.theme.background,
            background_Pressed: props.theme.wrong,
          }}
          style={{
            height: 25,
            width: 25,
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: 6,
          }}
        />
      ) : (
        <Button.Checkbox
          value={props.checked}
          onChange={(checked) => onCheckChange(checked)}
          theme={props.theme}
        />
      )}
      <OptionLabel
        label={label}
        allowOptionLabelChange={props.allowOptionLabelChange}
        onLabelChange={(newLabel) => onOptionLabelChange(newLabel)}
        theme={props.theme}
      />
    </View>
  );
});

export const OptionLabel = memo((props: {
  label: string
  allowOptionLabelChange: boolean | undefined
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
        flex: 1,
      }}
    >
      <TextInput
        editable={props.allowOptionLabelChange ?? false}
        style={{
          color: focused ? props.theme.background : props.theme.font,
          backgroundColor: focused ? props.theme.font : props.theme.background,
          fontSize: FontService.FONTS.h3,
          borderRadius: 5,
          paddingVertical: 0,
          paddingHorizontal: 5,
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
