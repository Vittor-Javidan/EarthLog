import React, { ReactNode, useState, memo, useCallback } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { WidgetRules } from '@Types/ProjectTypes';
import HapticsService from '@Services/HapticsService';

import { Text } from '@Text/index';
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
  onLabelChange: (label: string) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {

  const [label    , setLabel    ] = useState<string>(props.label);
  const [editLabel, setEditLabel] = useState<boolean>(false);

  const onLabelChange = useCallback((newLabel: string) => {
    if (newLabel.length <= 25) {
      setLabel(newLabel);
    }
  }, []);

  const confirmLabel = useCallback(() => {
    setEditLabel(false);
    props.onLabelChange(label);
  }, [label, props.onLabelChange]);

  const onEditLabel = useCallback(() => {
    if (!props.lockedLabel) {
      setEditLabel(true);
    }
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 5,
        paddingTop: 15,
      }}
    >
      <LabelButton
        label={label}
        locked={props.lockedLabel}
        editLabel={editLabel}
        onPress={() => onEditLabel()}
        confirmLabel={() => confirmLabel()}
        onLabelChange={(label) => onLabelChange(label)}
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
        style={{
          width: '100%',
          paddingTop: 5,
          paddingHorizontal: 10,
          gap: 10,
          backgroundColor: props.theme.background,
          borderColor: props.theme.font,
          borderWidth: 2,
          borderRadius: 10,
        }}
      >
        {props.children}
      </View>
    </View>
  );
});

const LabelButton = memo((props: {
  label: string
  locked: boolean | undefined
  editLabel: boolean
  theme: InputTheme
  onPress: () => void
  onLabelChange: (label: string) => void
  confirmLabel: () => void
}) => {

  function onPress() {
    props.onPress();
    HapticsService.vibrate('warning');
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: props.editLabel ? 2 : 0,
        paddingLeft: 15,
        zIndex: 1,
      }}
    >
      {props.editLabel ? (
        <TextInput
          style={{
            backgroundColor: props.theme.font,
            paddingHorizontal: 5,
            color: props.theme.background,
            fontSize: 20,
            borderRadius: 5,
            paddingVertical: 0,
            minWidth: 50,
            height: 25,
          }}
          value={props.label}
          onChangeText={(text) => props.onLabelChange(text)}
          onSubmitEditing={() => props.confirmLabel()}
          onBlur={() => props.confirmLabel()}
          autoFocus
        />
      ) : (
        <Pressable
          onPress={() => onPress()}
        >
          <Text
            style={{
              backgroundColor: props.theme.background,
              color: props.theme.font,
              fontSize: 20,
              paddingHorizontal: 5,
            }}
          >
            {props.label === '' ? '-------' : props.label}
          </Text>
        </Pressable>
      )}
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
