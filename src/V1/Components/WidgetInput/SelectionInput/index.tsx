import React, { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { deepCopy } from '@V1/Globals/DeepCopy';
import { SelectionInputData, WidgetRules, WidgetTheme } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';
import AlertService from '@V1/Services/AlertService';
import IDService from '@V1/Services/IDService';

import { LC } from '../__LC__';
import { AllSelectionOptions } from './AllSelectionOptions';
import { AddSelectionOptionButton } from './AddOptionButton';

export const SelectionInput = memo((props: {
  inputData: SelectionInputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  widgetRules: WidgetRules
  theme: WidgetTheme
  onSave: (inputData: SelectionInputData) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.selection[config.language], []);
  const [inputData, setInputData] = useState<SelectionInputData>(deepCopy(props.inputData));
  const [editMode , setEditMode ] = useState<boolean>(false);

  /**
   * @WARNING
   * Never call this function from inside a state setter.
   * It can cause `Cannot update a component while rendering a different component` react error.
   */
  const asyncSave = useCallback(async (inputData: SelectionInputData) => {
    props.onSave(deepCopy(inputData));
  }, [props.onSave]);

  const onLabelChange = useCallback((newLabel: string, inputData: SelectionInputData) => {
    const newData: SelectionInputData = { ...inputData, label: newLabel };
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave]);

  const addSelectionOption = useCallback((inputData: SelectionInputData) => {
    const newData: SelectionInputData = { ...inputData, value: { ...inputData.value, options: [
      ...inputData.value.options, {
      id: IDService.generateUuidV4(),
      optionLabel: '',
    }]}};
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave]);

  const onOptionLabelChange = useCallback((newLabel: string, index: number, inputData: SelectionInputData) => {
    const newData: SelectionInputData = { ...inputData };
    newData.value.options[index].optionLabel = newLabel;
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave]);

  const onOptionSelect = useCallback((id: string, inputData: SelectionInputData) => {
    if (inputData.lockedData !== true) {
      const newData: SelectionInputData = { ...inputData };
      newData.value.id_selected = id;
      asyncSave(newData);
      setInputData(newData);
    }
  }, [asyncSave]);

  const onOptionDelete = useCallback((index: number) => {
    AlertService.handleAlert(true, {
      question: R['Confirm to delete this option'],
      type: 'warning',
    }, () => {
      const newData: SelectionInputData = { ...inputData };
      newData.value.options.splice(index, 1);
      asyncSave(newData);
      setInputData(newData);
    });
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
          editMode={editMode}
          locked={inputData.lockedData}
          allowOptionDeletion={inputData.allowOptionDeletion}
          onPress_EditButton={() => setEditMode(prev => !prev)}
          theme={props.theme}
        />
      }
    >
      <View
        style={{
          alignItems: 'flex-start',
          paddingVertical: 10,
          gap: 5,
        }}
      >
        <AllSelectionOptions
          options={inputData.value}
          editMode={editMode}
          allowOptionLabelChange={inputData.allowOptionLabelChange}
          onOptionLabelChange={(newLabel, index) => onOptionLabelChange(newLabel, index, inputData)}
          onSelect={(id) => onOptionSelect(id, inputData)}
          onOptionDelete={(index) => onOptionDelete(index)}
          theme={props.theme}
        />
        <AddSelectionOptionButton
          showAddOptionButton={inputData.showAddOptionButton}
          onAddOption={() => addSelectionOption(inputData)}
          theme={props.theme}
        />
      </View>
    </LC.Root>
  );
});

const IconButtons = memo((props: {
  editMode: boolean
  locked: boolean | undefined
  allowOptionDeletion: boolean | undefined
  theme: WidgetTheme
  onPress_EditButton: () => void
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
    {(!props.locked && props.allowOptionDeletion === true) && (<>
      <LC.NavbarIconButton
        iconName={'options-outline'}
        onPress={() => props.onPress_EditButton()}
        selected={props.editMode}
        theme={props.theme}
      />
    </>)}
  </>);
});
