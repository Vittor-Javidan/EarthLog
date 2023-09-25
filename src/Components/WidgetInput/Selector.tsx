import React, { memo } from 'react';

import { GPS_DTO, InputData, InputStatus, WidgetThemeDTO } from '@Types/ProjectTypes';
import { StringInput } from './StringInput';
import { BooleanInput } from './BooleanInput';
import { GPSInput } from './GPSInputs';

export const InputSelector = memo((props: {
  inputData: InputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  referenceGPSData: GPS_DTO | undefined
  widgetTheme: WidgetThemeDTO
  onSave: (inputData: InputData | null, status: InputStatus ) => void
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
        onSave={(data, status) => props.onSave(data, status)}
        onInputDelete={() => props.onInputDelete()}
        onInputMoveUp={() => props.onInputMoveUp()}
        onInputMoveDow={() => props.onInputMoveDow()}
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
        onSave={(data, status) => props.onSave(data, status)}
        onInputDelete={() => props.onInputDelete()}
        onInputMoveUp={() => props.onInputMoveUp()}
        onInputMoveDow={() => props.onInputMoveDow()}
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
        onSave={(data, status) => props.onSave(data, status)}
        onInputDelete={() => props.onInputDelete()}
        onInputMoveUp={() => props.onInputMoveUp()}
        onInputMoveDow={() => props.onInputMoveDow()}
        theme={props.widgetTheme}
      />
    );
  }
});
