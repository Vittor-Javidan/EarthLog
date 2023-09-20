import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { GPS_DTO, ID, InputData, InputStatus, WidgetThemeData } from '@Types/ProjectTypes';
import { Loading } from '@Types/otherTypes';

import { WidgetInput } from '@WidgetInput/index';

export function AllInputs(props: {
  inputs: InputData[]
  editInputs: boolean
  referenceGPSData: GPS_DTO | undefined
  theme: WidgetThemeData
  onSave: (inputData: InputData | null, status: InputStatus ) => void
  onInputDelete: (id_input: ID) => void
  onInputMoveUp: (id_input: ID) => void
  onInputMoveDow: (id_input: ID) => void
}) {

  const [loading, setLoading] = useState<Loading>(props.inputs.length < 4 ? 'Loaded' : 'Loading');

  useEffect(() => {
    setLoading('Loaded');
  }, []);

  const InputsArray = props.inputs.map((inputData, index) => {

    const isFirst = index === 0;
    const isLast = index === props.inputs.length - 1;

    return (
      <WidgetInput.Selector
        key={inputData.id_input + index}
        inputData={inputData}
        editWidget={props.editInputs}
        isFirstInput={isFirst}
        isLastInput={isLast}
        referenceGPSData={props.referenceGPSData}
        onSave={(inputData, status) => props.onSave(inputData, status)}
        onInputDelete={() => props.onInputDelete(inputData.id_input)}
        onInputMoveUp={() => props.onInputMoveUp(inputData.id_input)}
        onInputMoveDow={() => props.onInputMoveDow(inputData.id_input)}
        widgetTheme={props.theme}
      />
    );
  });

  return loading === 'Loaded' ? (
    <>{InputsArray}</>
  ) : (
    <ActivityIndicator
      size="large"
      color={props.theme.font}
    />
  );
}
