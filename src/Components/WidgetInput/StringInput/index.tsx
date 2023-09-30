import React, { useState, memo, useCallback, useMemo } from 'react';
import { TextInput, Platform } from 'react-native';

import { InputStatus, StringInputData, WidgetRules } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import { useTimeout } from '@Hooks/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';

import { LC } from '../__LC__';

type InputTheme = {
  font: string
  font_placeholder: string
  background: string
  confirm: string
  wrong: string
}

export const StringInput = memo((props: {
  inputData: StringInputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  widgetRules: WidgetRules
  theme: InputTheme
  multiline: boolean
  onSave: (inputData: StringInputData | null, status: InputStatus ) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {

  /**
   * @BUG https://github.com/facebook/react-native/issues/36494
   * <TextInput /> ˜onChangeText˜ is fired on render when `multiline === true` on IOS. Be carefull on wich code is writed for this
   * callback to trigger.
  */

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.stringInput[config.language], []);

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

  const onTextDelete = useCallback(() => {
    if (inputData.value !== '') {
      props.onSave(null, 'modifying');
      setDeletedText(inputData.value);
      setInputData(prev => ({ ...prev, value: ''}));
      setShowUndo(true);
      setSaveSignal(true);
    }
  }, [props.onSave, inputData.value]);

  const undoDelete = useCallback(() => {
    props.onSave(null, 'modifying');
    setInputData(prev => ({ ...prev, value: deletedText}));
    setShowUndo(false);
    setSaveSignal(true);
  }, [props.onSave, deletedText]);

  const onTextChange = useCallback((text: string) => {
    if (inputData.lockedData !== true) {
      props.onSave(null, 'modifying');
      setInputData(prev => ({ ...prev, value: text }));
      setSaveSignal(true);
    }
  }, [props.onSave, inputData.lockedData]);

  const onLabelChange = useCallback((newLabel: string) => {
    props.onSave(null, 'modifying');
    setInputData(prev => ({ ...prev, label: newLabel}));
    setSaveSignal(true);
  }, [props.onSave]);

  return (
    <LC.Root

      label={inputData.label}
      lockedLabel={inputData.lockedLabel}
      editWidget={props.editWidget}
      isFirstInput={props.isFirstInput}
      isLastInput={props.isLastInput}
      onLabelChange={(label) => onLabelChange(label)}
      onInputDelete={() => props.onInputDelete()}
      onInputMoveUp={() => props.onInputMoveUp()}
      onInputMoveDow={() => props.onInputMoveDow()}
      widgetRules={props.widgetRules}
      theme={props.theme}

      iconButtons={
        <IconButtons
          showUndo={showUndo}
          locked={inputData.lockedData}
          theme={props.theme}
          onPress_UndoButton={() => undoDelete()}
          onPress_BackspaceButton={() => onTextDelete()}
        />
      }
    >
      <TextInput
        value={inputData.value}
        placeholder={inputData.placeholder ?? R['Write something here...']}
        placeholderTextColor={props.theme.font_placeholder}
        textAlign="left"
        textAlignVertical="top"
        multiline={props.multiline}
        onChangeText={(text) => onTextChange(text)}
        style={{
          width: '100%',
          paddingVertical: 15,
          paddingBottom: props.multiline || Platform.OS === 'ios' ? 10 : 0,
          backgroundColor: props.theme.background,
          color: props.theme.font,
          fontStyle: props.inputData.value === '' ? 'italic' : 'normal',
        }}
      />
    </LC.Root>
  );
});

function IconButtons (props: {
  locked: boolean | undefined
  showUndo: boolean
  theme: InputTheme
  onPress_UndoButton: () => void
  onPress_BackspaceButton: () => void
}) {
  return (<>
    {props.locked && (
      <LC.NavbarIconButton
        iconName="lock-closed-sharp"
        onPress={() => {}}
        theme={{
          font: props.theme.wrong,
          background: props.theme.background,
        }}
      />
    )}
    {!props.locked && (<>
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
    </>)}
  </>);
}

