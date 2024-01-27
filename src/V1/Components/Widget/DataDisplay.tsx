import React, { memo } from 'react';

import { GPS_DTO, InputData, WidgetRules, WidgetScope, WidgetTheme } from '@V1/Types/ProjectTypes';

import { Animation } from '@V1/Animation/index';
import { WidgetInput } from '@V1/WidgetInput/index';

export const DataDisplay = memo((props: {
  widgetScope: WidgetScope
  inputs: InputData[]
  editInputs: boolean
  referenceGPSData: GPS_DTO | undefined
  rules: WidgetRules
  theme: WidgetTheme
  onSave: (inputData: InputData) => void
  onInputDelete: (id_input: string) => void
  onInputMoveUp: (id_input: string) => void
  onInputMoveDow: (id_input: string) => void
}) => {

  const AllInputs = props.inputs.map((inputData, index) => {

    const isFirst = index === 0;
    const isLast = index === props.inputs.length - 1;

    return (
      <WidgetInput.Selector
        key={inputData.id_input + index}
        widgetScope={props.widgetScope}
        inputData={inputData}
        editWidget={props.editInputs}
        isFirstInput={isFirst}
        isLastInput={isLast}
        referenceGPSData={props.referenceGPSData}
        onSave={(inputData) => props.onSave(inputData)}
        onInputDelete={() => props.onInputDelete(inputData.id_input)}
        onInputMoveUp={() => props.onInputMoveUp(inputData.id_input)}
        onInputMoveDow={() => props.onInputMoveDow(inputData.id_input)}
        widgetRules={props.rules}
        widgetTheme={props.theme}
      />
    );
  });

  return (
    <Animation.FadeOut
      duration={300}
      style={{
        gap: 20,
      }}
    >
      {AllInputs}
    </Animation.FadeOut>
  );
});
