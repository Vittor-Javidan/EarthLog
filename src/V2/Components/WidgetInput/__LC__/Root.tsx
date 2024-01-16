import React, { ReactNode, useState, memo, useCallback, useMemo } from 'react';
import { StyleProp, TextInput, View, ViewStyle } from 'react-native';

import { WidgetRules, WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import HapticsService from '@V2/Services/HapticsService';
import ConfigService from '@V2/Services/ConfigService';

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
  iconButtons: JSX.Element
  children: ReactNode
  style?: StyleProp<ViewStyle>
  onLabelChange: (label: string) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {
  return (
    <Animation.FadeOut
      delay={30}
      duration={100}
      style={{
        paddingHorizontal: 5,
        paddingTop: 15,
      }}
    >
      <InputLabel
        label={props.label}
        editable={!props.lockedLabel}
        onLabelChange={(label) => props.onLabelChange(label)}
        theme={props.theme}
      />
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          backgroundColor: props.theme.background,
          zIndex: 1,
          height: 30,
          top: 0,
          right: 15,
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
      <View
        style={[{
          width: '100%',
          paddingTop: 5,
          paddingHorizontal: 10,
          gap: 10,
          backgroundColor: props.theme.background,
          borderColor: props.theme.font,
          borderWidth: 2,
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
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.Root[config.language], []);
  const [focused, setFocused] = useState<boolean>(false);

  const onLabelChange = useCallback((newLabel: string) => {
    if (newLabel.length <= 25) {
      props.onLabelChange(newLabel);
    }
  }, [props.onLabelChange]);

  const onFocus = useCallback(() => {
    setFocused(true);
    HapticsService.vibrate('success');
  }, []);

  const isLabelEmpty = props.label === '';

  return (
    <View
      style={{
        position: 'absolute',
        top: 2,
        paddingLeft: 15,
        zIndex: 1,
      }}
    >
      <TextInput
        style={{
          color: focused ? props.theme.background : props.theme.font,
          backgroundColor: focused ? props.theme.font : props.theme.background,
          fontSize: 18,
          borderRadius: 5,
          paddingVertical: 0,
          paddingHorizontal: 5,
          textAlign: 'center',
          height: 25,
          fontStyle: isLabelEmpty ? 'italic' : undefined,
        }}
        value={props.label}
        placeholder={isLabelEmpty ? R['Input name'] : ''}
        placeholderTextColor={focused ? props.theme.background : props.theme.font_placeholder}
        onChangeText={(text) => onLabelChange(text)}
        onSubmitEditing={() => setFocused(false)}
        onBlur={() => setFocused(false)}
        onFocus={() => onFocus()}
        editable={props.editable}
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