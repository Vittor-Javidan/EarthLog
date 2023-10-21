import React, { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { SelectionInputData, WidgetRules, WidgetTheme } from '@Types/ProjectTypes';
import UtilService from '@Services/UtilService';
import AlertService from '@Services/AlertService';

import { LC } from '../__LC__';
import { AllSelectionOptions } from './AllSelectionOptions';
import { AddSelectionOptionButton } from './AddOptionButton';
import ConfigService from '@Services/ConfigService';
import { translations } from '@Translations/index';

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
  const R      = useMemo(() => translations.widgetInput.options[config.language], []);
  const [inputData, setInputData] = useState<SelectionInputData>(UtilService.deepCopy(props.inputData));
  const [editMode , setEditMode ] = useState<boolean>(false);

  /**
   * @WARNING
   * Never call this function from inside a state setter.
   * It can cause `Cannot update a component while rendering a different component` react error.
   */
  const asyncSave = useCallback(async (inputData: SelectionInputData) => {
    props.onSave(UtilService.deepCopy(inputData));
  }, [props.onSave]);

  const onLabelChange = useCallback((newLabel: string, inputData: SelectionInputData) => {
    const newData: SelectionInputData = { ...inputData, label: newLabel };
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave]);

  const addSelectionOption = useCallback((inputData: SelectionInputData) => {
    const newData: SelectionInputData = { ...inputData, value: { ...inputData.value, options: [
      ...inputData.value.options, {
      id: UtilService.generateUuidV4(),
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
  }, [asyncSave, inputData]);

  const onOptionSelect = useCallback((id: string, inputData: SelectionInputData) => {
    const newData: SelectionInputData = { ...inputData };
    newData.value.id_selected = id;
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave, inputData]);

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
