import React, { memo, useCallback, useMemo, useState } from 'react';
import { TextInput, View } from 'react-native';

import { WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import HapticsService from '@V2/Services/HapticsService';
import ConfigService from '@V2/Services/ConfigService';
import FontService from '@V2/Services/FontService';

import { Button } from '@V2/Button/index';

export const SelectionOptionButton = memo((props: {
  label: string
  checked: boolean
  editMode: boolean
  allowOptionLabelChange: boolean | undefined
  theme: WidgetTheme
  onPress: () => void
  onOptionLabelChange: (newLabel: string) => void
  onOptionDelete: () => void
}) => {

  const [label, setLabel] = useState<string>(props.label);

  const onOptionLabelChange = useCallback((newLabel: string) => {
    props.onOptionLabelChange(newLabel);
    setLabel(newLabel);
  }, [props.onOptionLabelChange, label]);

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('success');
  }, [props.onPress]);

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
            font:              props.theme.wrong,
            font_active:       props.theme.background,
            background:        props.theme.background,
            background_active: props.theme.wrong,
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
        <Button.Bullet
          value={props.checked}
          onChange={() => onPress()}
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

  const config                = useMemo(() => ConfigService.config, []);
  const R                     = useMemo(() => translations.widgetInput.selection[config.language], []);
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
          fontFamily: FontService.FONT_FAMILY.h3,
          fontSize: 14,
          borderRadius: 5,
          paddingVertical: 0,
          paddingHorizontal: 5,
          width: '100%',
        }}
        placeholder={R['Option name']}
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
