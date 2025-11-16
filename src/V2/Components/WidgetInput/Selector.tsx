import React, { memo } from 'react';

import { GPS_DTO, InputData, WidgetRules, WidgetScope, WidgetTheme } from '@V2/Types/ProjectTypes';

import { StringInput } from './StringInput';
import { BooleanInput } from './BooleanInput';
import { GPSInput } from './GPSInputs';
import { OptionsInput } from './OptionsInput';
import { SelectionInput } from './SelectionInput';
import { PictureInput } from './PictureInput';
import { CompassInput } from './CompassInput';

export const InputSelector = memo((props: {
  widgetScope: WidgetScope
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
    case 'boolean': return (
      <BooleanInput
        inputData={props.inputData}
        editWidget={props.editWidget}
        isFirstInput={props.isFirstInput}
        isLastInput={props.isLastInput}
        onSave={props.onSave}
        onInputDelete={props.onInputDelete}
        onInputMoveUp={props.onInputMoveUp}
        onInputMoveDow={props.onInputMoveDow}
        widgetRules={props.widgetRules}
        theme={props.widgetTheme}
      />
    );
    case 'string': return (
      <StringInput
        inputData={props.inputData}
        editWidget={props.editWidget}
        isFirstInput={props.isFirstInput}
        isLastInput={props.isLastInput}
        onSave={props.onSave}
        onInputDelete={props.onInputDelete}
        onInputMoveUp={props.onInputMoveUp}
        onInputMoveDow={props.onInputMoveDow}
        widgetRules={props.widgetRules}
        theme={props.widgetTheme}
        multiline
      />
    );
    case 'options': return (
      <OptionsInput
        inputData={props.inputData}
        editWidget={props.editWidget}
        isFirstInput={props.isFirstInput}
        isLastInput={props.isLastInput}
        onSave={props.onSave}
        onInputDelete={props.onInputDelete}
        onInputMoveUp={props.onInputMoveUp}
        onInputMoveDow={props.onInputMoveDow}
        widgetRules={props.widgetRules}
        theme={props.widgetTheme}
      />
    );
    case 'selection': return (
      <SelectionInput
        inputData={props.inputData}
        editWidget={props.editWidget}
        isFirstInput={props.isFirstInput}
        isLastInput={props.isLastInput}
        onSave={props.onSave}
        onInputDelete={props.onInputDelete}
        onInputMoveUp={props.onInputMoveUp}
        onInputMoveDow={props.onInputMoveDow}
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
        onSave={props.onSave}
        onInputDelete={props.onInputDelete}
        onInputMoveUp={props.onInputMoveUp}
        onInputMoveDow={props.onInputMoveDow}
        widgetRules={props.widgetRules}
        theme={props.widgetTheme}
        referenceGPSData={props.referenceGPSData}
      />
    );
    case 'picture': return (
      <PictureInput
        widgetScope={props.widgetScope}
        inputData={props.inputData}
        editWidget={props.editWidget}
        isFirstInput={props.isFirstInput}
        isLastInput={props.isLastInput}
        onSave={props.onSave}
        onInputDelete={props.onInputDelete}
        onInputMoveUp={props.onInputMoveUp}
        onInputMoveDow={props.onInputMoveDow}
        widgetRules={props.widgetRules}
        theme={props.widgetTheme}
      />
    );
    case 'compass': return (
      <CompassInput
        inputData={props.inputData}
        editWidget={props.editWidget}
        isFirstInput={props.isFirstInput}
        isLastInput={props.isLastInput}
        onSave={props.onSave}
        onInputDelete={props.onInputDelete}
        onInputMoveUp={props.onInputMoveUp}
        onInputMoveDow={props.onInputMoveDow}
        widgetRules={props.widgetRules}
        theme={props.widgetTheme}
      />
    )
  }
});
