import React, { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { OptionsInputData, WidgetRules, WidgetTheme } from '@Types/ProjectTypes';
import UtilService from '@Services/UtilService';
import AlertService from '@Services/AlertService';

import { LC } from '../__LC__';
import { AllOptions } from './AllOptions';
import { AddOptionButton } from './AddOptionButton';
import ConfigService from '@Services/ConfigService';
import { translations } from '@Translations/index';

export const OptionsInput = memo((props: {
  inputData: OptionsInputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  widgetRules: WidgetRules
  theme: WidgetTheme
  onSave: (inputData: OptionsInputData) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.options[config.language], []);
  const [inputData, setInputData] = useState<OptionsInputData>(UtilService.deepCopy(props.inputData));
  const [editMode , setEditMode ] = useState<boolean>(false);

  const asyncSave = useCallback(async (inputData: OptionsInputData) => {
    props.onSave(UtilService.deepCopy(inputData));
  }, [props.onSave]);

  const onLabelChange = useCallback((newLabel: string) => {
    setInputData((prevInputData) => {
      const newData = { ...prevInputData, label: newLabel };
      asyncSave(newData);
      return newData;
    });
  }, [asyncSave]);

  const addOption = useCallback(() => {
    setInputData((prevInputData) => {
      const newData = { ...prevInputData, value: [ ...prevInputData.value, {
        id: UtilService.generateUuidV4(),
        optionLabel: '',
        checked: false,
      }]};
      asyncSave(newData);
      return newData;
    });
  }, [asyncSave]);

  const onOptionLabelChange = useCallback((newLabel: string, index: number) => {
    setInputData((prevInputData) => {
      const newData = { ...prevInputData };
      newData.value[index].optionLabel = newLabel;
      asyncSave(newData);
      return newData;
    });
  }, [asyncSave]);

  const onOptionCheckChange = useCallback((checked: boolean, index: number) => {
    setInputData((prevInputData) => {
      const newData = { ...prevInputData };
      newData.value[index].checked = checked;
      asyncSave(newData);
      return newData;
    });
  }, [asyncSave]);

  const onOptionDelete = useCallback((index: number) => {
    AlertService.handleAlert(true, {
      question: R['Confirm to delete this option'],
      type: 'warning',
    }, () => {
      setInputData((prevInputData) => {
        const newData = { ...prevInputData };
        newData.value.splice(index, 1);
        asyncSave(newData);
        return newData;
      });
    });
  }, [asyncSave]);

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
        <AllOptions
          options={inputData.value}
          editMode={editMode}
          allowOptionLabelChange={inputData.allowOptionLabelChange}
          onOptionLabelChange={(newLabel, index) => onOptionLabelChange(newLabel, index)}
          onCheckedChange={(checked, index) => onOptionCheckChange(checked, index)}
          onOptionDelete={(index) => onOptionDelete(index)}
          theme={props.theme}
        />
        <AddOptionButton
          showAddOptionButton={inputData.showAddOptionButton}
          onAddOption={() => addOption()}
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
