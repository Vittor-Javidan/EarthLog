import React, { useState, memo, useCallback, useMemo } from 'react';
import { TextInput, View } from 'react-native';

import { deepCopy } from '@V1/Globals/DeepCopy';
import { StringInputData, WidgetRules, WidgetTheme } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import { FontService } from '@V1/Services_Core/FontService';
import { ConfigService } from '@V1/Services/ConfigService';

import { LC } from '../__LC__';

export const StringInput = memo((props: {
  inputData: StringInputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  widgetRules: WidgetRules
  theme: WidgetTheme
  multiline: boolean
  secureTextEntry?: boolean
  onSave: (inputData: StringInputData) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {

  /**
   * @BUG https://github.com/facebook/react-native/issues/36494
   * <TextInput /> ˜onChangeText˜ is fired on render when `multiline === true` on IOS. Be carefull on wich code is writed for this
   * callback to trigger.
  */

  const config                        = useMemo(() => ConfigService.config, []);
  const R                             = useMemo(() => translations.widgetInput.string[config.language], []);
  const [inputData  , setInputData  ] = useState<StringInputData>(deepCopy(props.inputData));
  const [deletedText, setDeletedText] = useState<string>('');
  const [showUndo   , setShowUndo   ] = useState<boolean>(false);

  /**
   * @WARNING
   * Never call this function from inside a state setter.
   * It can cause `Cannot update a component while rendering a different component` react error.
   */
  const asyncSave = useCallback(async (inputData: StringInputData) => {
    props.onSave(deepCopy(inputData));
  }, [props.onSave]);

  const onLabelChange = useCallback((newLabel: string, inputData: StringInputData) => {
    const newData: StringInputData = { ...inputData, label: newLabel };
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave]);

  const onTextChange = useCallback((text: string, inputData: StringInputData) => {
    if (inputData.lockedData !== true) {
      const newData: StringInputData = { ...inputData, value: text };
      asyncSave(newData);
      setInputData(newData);
    }
  }, [asyncSave]);

  const onTextDelete = useCallback((inputData: StringInputData) => {
    if (inputData.value !== '') {
      const newData: StringInputData = { ...inputData, value: '' };
      asyncSave(newData);
      setInputData(newData);
      setDeletedText(inputData.value);
      setShowUndo(true);
    }
  }, [asyncSave]);

  const undoDelete = useCallback((deletedText: string, inputData: StringInputData) => {
    const newData: StringInputData = { ...inputData, value: deletedText };
    asyncSave(newData);
    setInputData(newData);
    setShowUndo(false);
  }, [asyncSave]);

  return (
    <LC.Root

      label={inputData.label}
      lockedLabel={inputData.lockedLabel}
      editWidget={props.editWidget}
      isFirstInput={props.isFirstInput}
      isLastInput={props.isLastInput}
      onLabelChange={(label) => onLabelChange(label, inputData)}
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
          onPress_UndoButton={() => undoDelete(deletedText, inputData)}
          onPress_BackspaceButton={() => onTextDelete(inputData)}
        />
      }
    >
      <View
        style={{
          paddingVertical: 0,
        }}
      >
        <TextInput
          value={inputData.value}
          placeholder={inputData.placeholder ?? R['Write something here...']}
          placeholderTextColor={props.theme.font_placeholder}
          textAlign="left"
          textAlignVertical="top"
          multiline={props.multiline}
          secureTextEntry={props.secureTextEntry}
          onChangeText={(text) => onTextChange(text, inputData)}
          style={{
            width: '100%',
            paddingVertical: 15,
            paddingBottom: props.multiline ? 10 : 0,
            backgroundColor: props.theme.background,
            color: props.theme.font,
            fontFamily: FontService.FONT_FAMILY.p,
            fontStyle: 'normal',
          }}
        />
      </View>
    </LC.Root>
  );
});

const IconButtons = memo((props: {
  locked: boolean | undefined
  showUndo: boolean
  theme: WidgetTheme
  onPress_UndoButton: () => void
  onPress_BackspaceButton: () => void
}) => {
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
});
