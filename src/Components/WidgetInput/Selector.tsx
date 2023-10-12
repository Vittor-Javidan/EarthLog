import React, { memo } from 'react';

import { GPS_DTO, InputData, WidgetRules, WidgetTheme } from '@Types/ProjectTypes';

import { StringInput } from './StringInput';
import { BooleanInput } from './BooleanInput';
import { GPSInput } from './GPSInputs';

export const InputSelector = memo((props: {
  inputData: InputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  referenceGPSData: GPS_DTO | undefined
  widgetRules: WidgetRules
  widgetTheme: WidgetTheme
  onSave: (inputData: InputData) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {
  switch (props.inputData.type) {
    case 'string': return (
      <StringInput
        inputData={props.inputData}
        editWidget={props.editWidget}
        isFirstInput={props.isFirstInput}
        isLastInput={props.isLastInput}
        onSave={(inputData) => props.onSave(inputData)}
        onInputDelete={() => props.onInputDelete()}
        onInputMoveUp={() => props.onInputMoveUp()}
        onInputMoveDow={() => props.onInputMoveDow()}
        widgetRules={props.widgetRules}
        theme={props.widgetTheme}
        multiline
      />
    );
    case 'boolean': return (
      <BooleanInput
        inputData={props.inputData}
        editWidget={props.editWidget}
        isFirstInput={props.isFirstInput}
        isLastInput={props.isLastInput}
        onSave={(inputData) => props.onSave(inputData)}
        onInputDelete={() => props.onInputDelete()}
        onInputMoveUp={() => props.onInputMoveUp()}
        onInputMoveDow={() => props.onInputMoveDow()}
        widgetRules={props.widgetRules}
        theme={props.widgetTheme}
      />
    );
    case 'gps': return (
      <GPSInput
        inputData={props.inputData}
        editWidget={props.editWidget}
        isFirstInput={props.isFirstInput}
        isLastInput={props.isLastInput}
        referenceGPSData={props.referenceGPSData}
        onSave={(inputData) => props.onSave(inputData)}
        onInputDelete={() => props.onInputDelete()}
        onInputMoveUp={() => props.onInputMoveUp()}
        onInputMoveDow={() => props.onInputMoveDow()}
        widgetRules={props.widgetRules}
        theme={props.widgetTheme}
      />
    );
  }
});
