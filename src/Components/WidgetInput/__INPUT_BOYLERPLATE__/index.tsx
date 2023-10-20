import React, { memo, useCallback, useState } from 'react';

import { InputData, WidgetRules, WidgetTheme } from '@Types/ProjectTypes';
import UtilService from '@Services/UtilService';

import { LC } from '../__LC__';

/**
 * @WARNING
 * USE THIS TO START FASTER A NEW INPUT DEVELOPMENT
 */
export const BoylerPlateInput = memo((props: {
  inputData: InputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  widgetRules: WidgetRules
  theme: WidgetTheme
  onSave: (inputData: InputData) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {

  const [inputData, setInputData] = useState<InputData>(UtilService.deepCopy(props.inputData));

  const asyncSave = useCallback(async (inputData: InputData) => {
    props.onSave(UtilService.deepCopy(inputData));
  }, [props.onSave]);

  const onLabelChange = useCallback((newLabel: string, inputData: InputData) => {
    const newData: InputData = { ...inputData, label: newLabel};
    asyncSave(newData);
    setInputData(prev => ({ ...prev, label: newLabel}));
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
          locked={inputData.lockedData}
          theme={props.theme}
        />
      }
    >
      <></>
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
