import React, { ReactNode, useState, memo, useCallback } from 'react';
import { StyleProp, TextInput, View, ViewStyle } from 'react-native';

import { WidgetRules } from '@Types/ProjectTypes';
import HapticsService from '@Services/HapticsService';

import { NavbarIconButton } from './NavbarIconButtons';

type InputTheme = {
  font: string
  background: string
  confirm: string
  wrong: string
}

export const InputRoot = memo((props: {
  label: string
  lockedLabel: boolean | undefined
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  widgetRules: WidgetRules
  theme: InputTheme
  iconButtons: JSX.Element
  children: ReactNode
  style?: StyleProp<ViewStyle>
  onLabelChange: (label: string) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {
  return (
    <View
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
    </View>
  );
});

const InputLabel = memo((props: {
  label: string
  editable: boolean
  theme: InputTheme
  onLabelChange: (label: string) => void
}) => {

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
        }}
        value={props.label}
        placeholder="-------"
        placeholderTextColor={focused ? props.theme.background : props.theme.font}
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
  theme: InputTheme
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
