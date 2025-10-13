import React, { ReactNode, useState, memo, useCallback, useMemo } from 'react';
import { LayoutChangeEvent, StyleProp, TextInput, View, ViewStyle } from 'react-native';

import { WidgetRules, WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import HapticsService from '@V2/Services/HapticsService';
import ConfigService from '@V2/Services/ConfigService';
import FontService from '@V2/Services/FontService';

import { Animation } from '@V2/Animation/index';
import { NavbarIconButton } from './NavbarIconButtons';

export const InputRoot = memo((props: {
  label: string
  lockedLabel: boolean | undefined
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  widgetRules: WidgetRules
  theme: WidgetTheme
  iconButtons: React.JSX.Element
  children: ReactNode
  style?: StyleProp<ViewStyle>
  onLabelChange: (label: string) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {

  const [inputTopPadding, setInputTopPadding] = useState<number | null>(null);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setInputTopPadding(Math.round(event.nativeEvent.layout.height - 17));
  }, []);

  return (
    <Animation.FadeOut
      duration={300}
      style={{
        paddingHorizontal: 5,
        paddingTop: 15,
      }}
    >
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 1,
          width: '95%',
          top: 0,
          marginHorizontal: 15,
        }}
      >
        <InputLabel
          label={props.label}
          editable={!props.lockedLabel}
          onLabelChange={(label) => props.onLabelChange(label)}
          theme={props.theme}
          onLayout={(event) => onLayout(event)}
        />
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: props.theme.background,
            height: 30,
          }}
        >
          {props.editWidget ? (
            <IconButton
              widgetRules={props.widgetRules}
              isFirstInput={props.isFirstInput}
              isLastInput={props.isLastInput}
              onPress_Trash={() => props.onInputDelete()}
              onPress_ChevronUp={() => props.onInputMoveUp()}
              onPress_ChevronDown={() => props.onInputMoveDow()}
              theme={props.theme}
            />
          ) : ( props.iconButtons )}
        </View>
      </View>
      <View
        style={[{
          width: '100%',
          paddingTop: inputTopPadding ?? 17,
          paddingHorizontal: 10,
          gap: 10,
          backgroundColor: props.theme.background,
          borderColor: props.theme.font,
          borderWidth: 3,
          borderRadius: 10,
        }, props.style]}
      >
        {props.children}
      </View>
    </Animation.FadeOut>
  );
});

const InputLabel = memo((props: {
  label: string
  editable: boolean
  theme: WidgetTheme
  onLabelChange: (label: string) => void
  onLayout: (event: LayoutChangeEvent) => void
}) => {

  const config                = useMemo(() => ConfigService.config, []);
  const R                     = useMemo(() => translations.widgetInput.Root[config.language], []);
  const [focused, setFocused] = useState<boolean>(false);

  const onFocus = useCallback(() => {
    setFocused(true);
    HapticsService.vibrate('success');
  }, []);

  const isLabelEmpty = props.label === '';

  return (
    <View
      style={{
        top: 2,
        zIndex: 1,
      }}
      onLayout={(event) => props.onLayout(event)}
    >
      <TextInput
        style={{
          color: focused ? props.theme.font : props.theme.background,
          backgroundColor: focused ? props.theme.background : props.theme.font,
          fontFamily: isLabelEmpty ? FontService.FONT_FAMILY.p : FontService.FONT_FAMILY.h2,
          fontSize: 14,
          borderRadius: 5,
          paddingVertical: 0,
          paddingHorizontal: 5,
          width: 225,
          borderWidth: 3,
          borderColor: props.theme.font,
        }}
        value={props.label}
        placeholder={isLabelEmpty ? R['Input name'] : ''}
        placeholderTextColor={focused ? props.theme.background : props.theme.font_placeholder}
        onChangeText={(text) => props.onLabelChange(text)}
        onSubmitEditing={() => setFocused(false)}
        onBlur={() => setFocused(false)}
        onFocus={() => onFocus()}
        editable={props.editable}
        multiline
      />
    </View>
  );
});

const IconButton = memo((props: {
  isFirstInput: boolean
  isLastInput: boolean
  widgetRules: WidgetRules
  theme: WidgetTheme
  onPress_Trash: () => void
  onPress_ChevronUp: () => void
  onPress_ChevronDown: () => void
}) => {
  return (<>
    {props.widgetRules.showMoveButton_Inputs && (<>
      {props.isFirstInput !== true && (
        <NavbarIconButton
          iconName="chevron-up-circle-outline"
          onPress={() => props.onPress_ChevronUp()}
          selected={false}
          theme={{
            background: props.theme.background,
            font: props.theme.font,
          }}
        />
      )}
      {props.isLastInput !== true && (
        <NavbarIconButton
          iconName="chevron-down-circle-outline"
          onPress={() => props.onPress_ChevronDown()}
          selected={false}
          theme={{
            background: props.theme.background,
            font: props.theme.font,
          }}
        />
      )}
    </>)}
    {props.widgetRules.showDeleteButton_Inputs && (
      <NavbarIconButton
        iconName="trash-outline"
        onPress={() => props.onPress_Trash()}
        selected={false}
        theme={{
          background: props.theme.background,
          font: props.theme.wrong,
        }}
      />
    )}
  </>);
});
