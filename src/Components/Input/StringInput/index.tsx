import React, { useState } from 'react';
import { TextInput, Platform } from 'react-native';

import { InputStatus, StringInputData } from '@Types/ProjectTypes';
import { useTimeout } from '@Hooks/index';
import UtilService from '@Services/UtilService';

import { LC } from '../__LC__';

type InputTheme = {
  font: string
  font_placeholder: string
  background: string
  confirm: string
  wrong: string
}

export function StringInput(props: {
  inputData: StringInputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  theme: InputTheme
  multiline: boolean
  onSave: (inputData: StringInputData | null, status: InputStatus ) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) {

  /**
   * @BUG https://github.com/facebook/react-native/issues/36494
   * <TextInput /> ˜onChangeText˜ is fired on render when `multiline === true` on IOS. Be carefull on wich code is writed for this
   * callback to trigger.
  */
  const { theme } = props;

  const [inputData  , setInputData  ] = useState<StringInputData>(UtilService.deepCopy(props.inputData));
  const [deletedText, setDeletedText] = useState<string>('');
  const [showUndo   , setShowUndo   ] = useState<boolean>(false);
  const [saveSignal , setSaveSignal ] = useState<boolean>(false);

  useTimeout(async () => {
    if (saveSignal) {
      props.onSave(UtilService.deepCopy(inputData), 'ready to save');
      setSaveSignal(false);
    }
  }, [inputData, saveSignal], 200);

  function onTextDelete() {
    if (inputData.value !== '') {
      props.onSave(null, 'modifying');
      setDeletedText(inputData.value);
      setInputData(prev => ({ ...prev, value: ''}));
      setShowUndo(true);
      setSaveSignal(true);
    }
  }

  function undoDelete() {
    props.onSave(null, 'modifying');
    setInputData(prev => ({ ...prev, value: deletedText}));
    setShowUndo(false);
    setSaveSignal(true);
  }

  function onTextChange(text: string) {
    props.onSave(null, 'modifying');
    setInputData(prev => ({ ...prev, value: text }));
    setSaveSignal(true);
  }

  function onLabelChange(newLabel: string) {
    props.onSave(null, 'modifying');
    setInputData(prev => ({ ...prev, label: newLabel}));
    setSaveSignal(true);
  }

  return (
    <LC.Root

      label={inputData.label}
      editWidget={props.editWidget}
      isFirstInput={props.isFirstInput}
      isLastInput={props.isLastInput}
      onLabelChange={(label) => onLabelChange(label)}
      onInputDelete={() => props.onInputDelete()}
      onInputMoveUp={() => props.onInputMoveUp()}
      onInputMoveDow={() => props.onInputMoveDow()}
      theme={theme}

      iconButtons={
        <IconButtons
          showUndo={showUndo}
          locked={inputData.lockedData}
          theme={theme}
          onPress_UndoButton={() => undoDelete()}
          onPress_BackspaceButton={() => onTextDelete()}
        />
      }
    >
      <TextInput
        value={inputData.value}
        placeholder={inputData.placeholder ?? 'Write Something here'}
        placeholderTextColor={theme.font_placeholder}
        textAlign="left"
        textAlignVertical="top"
        multiline={props.multiline}
        onChangeText={(text) => onTextChange(text)}
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
  locked: boolean | undefined
  showUndo: boolean
  theme: InputTheme
  onPress_UndoButton: () => void
  onPress_BackspaceButton: () => void
}) {

  const { theme } = props;

  return (<>
    {props.locked && (
      <LC.NavbarIconButton
        iconName="lock-closed-sharp"
        onPress={() => {}}
        theme={{
          font: theme.wrong,
          background: theme.background,
        }}
      />
    )}
    {!props.locked && (<>
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
    </>)}
  </>);
}

