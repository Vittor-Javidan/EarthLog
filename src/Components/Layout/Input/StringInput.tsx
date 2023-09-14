import React, { useState, useMemo } from 'react';
import { TextInput, StyleProp, TextStyle } from 'react-native';

import ConfigService from '@Services/ConfigService';

import IconButton from '../Button/IconButton';
import InputRoot from './Root';

/**
 * @REACT_NATIVE_BUG https://github.com/facebook/react-native/issues/36494
 * <TextInput /> ˜onChangeText˜ is fired on render. Be carefull on wich code is writed for this
 * callback to trigger.
 */
export default function StringInput(props: {
  label: string
  value: string
  placeholder: string
  locked: boolean
  style_TextInput?: StyleProp<TextStyle>
  backgroundColor?: string
  color?: string
  color_placeholder?: string
  inline?: boolean
  onChangeText: (text: string) => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const [showUndo, setShowUndo] = useState<boolean>(false);
  const [deletedText, setDeletedText] = useState<string>('');

  function deleteText() {
    if (props.value === '') {
      return;
    }
    setDeletedText(props.value);
    setShowUndo(true);
    props.onChangeText('');
  }

  function undoDelete() {
    props.onChangeText(deletedText);
    setShowUndo(false);
  }

  const backgroundColor = props.backgroundColor ? props.backgroundColor : theme.background;
  const color = props.color ? props.color : theme.onBackground;
  const color_placeholder = props.color_placeholder ? props.color_placeholder : theme.onBackground_Placeholder;

  return (
    <InputRoot

      label={props.label}
      backgroundColor={backgroundColor}
      color={color}

      iconButtons={
        <IconButtons
          color={color}
          showUndo={showUndo}
          locked={props.locked}
          onPress_UndoButton={() => undoDelete()}
          onPress_BackspaceButton={() => deleteText()}
        />
      }
    >
      <TextInput
        style={[{
          width: '100%',
          paddingVertical: 15,
          backgroundColor: backgroundColor,
          color: color,
        }, props.style_TextInput]}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={color_placeholder}
        textAlign="left"
        textAlignVertical="top"
        multiline={props.inline ? false : true}
        onChangeText={(text) => props.onChangeText(text)}
      />
    </InputRoot>
  );
}

function IconButtons(props: {
  locked: boolean
  showUndo: boolean
  color: string
  onPress_UndoButton: () => void
  onPress_BackspaceButton: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (<>
    {props.locked && (
      <IconButton
        iconName="lock-closed-sharp"
        color={theme.wrong}
        onPress={() => {}}
        style={{
          paddingHorizontal: 5,
          paddingVertical: 0,
          borderRadius: 10,
        }}
      />
    )}
    {!props.locked && (<>
      {props.showUndo && (
        <IconButton
          iconName="arrow-undo"
          color={props.color}
          onPress={() => props.onPress_UndoButton()}
          style={{
            paddingHorizontal: 5,
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
      )}
      <IconButton
        iconName="backspace-outline"
        color={props.color}
        onPress={() => props.onPress_BackspaceButton()}
        style={{
          paddingHorizontal: 5,
          paddingVertical: 0,
          borderRadius: 10,
        }}
      />
    </>)}
  </>);
}
