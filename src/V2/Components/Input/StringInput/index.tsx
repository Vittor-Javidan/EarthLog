import React, { useState, memo, useCallback, useRef } from 'react';
import { TextInput, Platform } from 'react-native';

import { useTimeout } from '@V2/Hooks/index';
import FontService from '@V2/Services/FontService';

import { LC } from '../__LC__';

type InputTheme = {
  font: string
  font_placeholder: string
  background: string
}

export const StringInput = memo((props: {
  label: string
  value: string
  placeholder: string
  theme: InputTheme
  multiline?: boolean
  autoFocus?: boolean
  secureTextEntry?: boolean
  onTextChange: (text: string) => void
}) => {

  /**
   * @BUG https://github.com/facebook/react-native/issues/36494
   * <TextInput /> ˜onChangeText˜ is fired on render when `multiline === true` on IOS. Be carefull on wich code is writed for this
   * callback to trigger.
  */

  const [deletedText, setDeletedText] = useState<string>('');
  const [showUndo   , setShowUndo   ] = useState<boolean>(false);
  const inputRef = useRef<TextInput | null>(null);

  const onTextDelete = useCallback(() => {
    if (props.value !== '') {
      setDeletedText(props.value);
      setShowUndo(true);
      props.onTextChange('');
    }
  }, [props.value]);

  const undoDelete = useCallback(() => {
    props.onTextChange(deletedText);
    setShowUndo(false);
    setDeletedText('');
  }, [deletedText]);

  useTimeout(() => {
    if (props.autoFocus) {
      inputRef.current?.focus();
    }
  }, [], 150);

  return (
    <LC.Root

      label={props.label}
      theme={props.theme}

      iconButtons={
        <IconButtons
          showUndo={showUndo}
          theme={props.theme}
          onPress_UndoButton={() => undoDelete()}
          onPress_BackspaceButton={() => onTextDelete()}
        />
      }
    >
      <TextInput
        ref={inputRef}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={props.theme.font_placeholder}
        textAlign="left"
        textAlignVertical="top"
        multiline={props.multiline}
        secureTextEntry={props.secureTextEntry}
        onChangeText={(text) => props.onTextChange(text)}
        style={{
          width: '100%',
          paddingVertical: 15,
          paddingBottom: (props.multiline || Platform.OS === 'ios') ? 10 : 0,
          backgroundColor: props.theme.background,
          fontFamily: FontService.FONT_FAMILY.p,
          color: props.theme.font,
        }}
      />
    </LC.Root>
  );
});

const IconButtons = memo((props: {
  showUndo: boolean
  theme: InputTheme
  onPress_UndoButton: () => void
  onPress_BackspaceButton: () => void
}) => {
  return (<>
    {props.showUndo && (
      <LC.NavbarIconButton
        iconName="arrow-undo"
        onPress={() => props.onPress_UndoButton()}
        theme={{
          font: props.theme.font,
          background: props.theme.background,
        }}
      />
    )}
    <LC.NavbarIconButton
      iconName="backspace-outline"
      onPress={() => props.onPress_BackspaceButton()}
      theme={{
        font: props.theme.font,
        background: props.theme.background,
      }}
    />
  </>);
});
