import React, { memo, useCallback, useState } from 'react';
import { View } from 'react-native';

import { OptionsInputData, WidgetRules, WidgetTheme } from '@Types/ProjectTypes';
import UtilService from '@Services/UtilService';

import { LC } from '../__LC__';
import { Button } from '@Button/index';
import { AllOptions } from './AllOptions';

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

  const [inputData, setInputData] = useState<OptionsInputData>(UtilService.deepCopy(props.inputData));

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
        optionLabel: 'Option ' + (prevInputData.value.length + 1),
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
          locked={inputData.lockedData}
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
          onOptionLabelChange={(newLabel, index) => onOptionLabelChange(newLabel, index)}
          onCheckedChange={(checked, index) => onOptionCheckChange(checked, index)}
          theme={props.theme}
        />
        <Button.Icon
          iconName="add"
          onPress={() => addOption()}
          theme={{
            font: props.theme.background,
            font_Pressed: props.theme.font,
            background: props.theme.font,
            background_Pressed: props.theme.background,
          }}
          style={{
            alignSelf: 'center',
            marginTop: 5,
            height: 25,
            width: '50%',
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: 6,
          }}
        />
      </View>
    </LC.Root>
  );
});

const IconButtons = memo((props: {
  locked: boolean | undefined
  theme: WidgetTheme
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
  </>);
});
