import React, { useState } from 'react';
import { TextInput, Platform } from 'react-native';

import { LC } from '../__LC__';

type InputTheme = {
  font: string
  font_placeholder: string
  background: string
}

export function StringInput(props: {
  label: string
  value: string
  placeholder: string
  theme: InputTheme
  multiline: boolean
  onTextChange: (text: string) => void
}) {

  /**
   * @BUG https://github.com/facebook/react-native/issues/36494
   * <TextInput /> ˜onChangeText˜ is fired on render when `multiline === true` on IOS. Be carefull on wich code is writed for this
   * callback to trigger.
  */
  const { theme } = props;

  const [deletedText, setDeletedText] = useState<string>('');
  const [showUndo   , setShowUndo   ] = useState<boolean>(false);


  function onTextDelete() {
    if (props.value !== '') {
      setDeletedText(props.value);
      setShowUndo(true);
      props.onTextChange('');
    }
  }

  function undoDelete() {
    props.onTextChange(deletedText);
    setShowUndo(false);
    setDeletedText('');
  }

  return (
    <LC.Root

      label={props.label}
      theme={theme}

      iconButtons={
        <IconButtons
          showUndo={showUndo}
          theme={theme}
          onPress_UndoButton={() => undoDelete()}
          onPress_BackspaceButton={() => onTextDelete()}
        />
      }
    >
      <TextInput
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={theme.font_placeholder}
        textAlign="left"
        textAlignVertical="top"
        multiline={props.multiline}
        onChangeText={(text) => props.onTextChange(text)}
        style={{
          width: '100%',
          paddingVertical: 15,
          paddingBottom: props.multiline || Platform.OS === 'ios' ? 10 : 0,
          backgroundColor: theme.background,
          color: theme.font,
        }}
      />
    </LC.Root>
  );
}

function IconButtons (props: {
  showUndo: boolean
  theme: InputTheme
  onPress_UndoButton: () => void
  onPress_BackspaceButton: () => void
}) {

  const { theme } = props;

  return (<>
    {props.showUndo && (
      <LC.NavbarIconButton
        iconName="arrow-undo"
        onPress={() => props.onPress_UndoButton()}
        theme={{
          font: theme.font,
          background: theme.background,
        }}
      />
    )}
    <LC.NavbarIconButton
      iconName="backspace-outline"
      onPress={() => props.onPress_BackspaceButton()}
      theme={{
        font: theme.font,
        background: theme.background,
      }}
    />
  </>);
}

