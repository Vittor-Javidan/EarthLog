import React, { useState, useEffect, memo } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { GPS_DTO, ID, InputData, InputStatus, WidgetRules, WidgetThemeDTO } from '@Types/ProjectTypes';
import { Loading } from '@Types/AppTypes';

import { WidgetInput } from '@WidgetInput/index';

export const DataDisplay = memo((props: {
  inputs: InputData[]
  editInputs: boolean
  referenceGPSData: GPS_DTO | undefined
  rules: WidgetRules
  theme: WidgetThemeDTO
  onSave: (inputData: InputData | null, status: InputStatus ) => void
  onInputDelete: (id_input: ID) => void
  onInputMoveUp: (id_input: ID) => void
  onInputMoveDow: (id_input: ID) => void
}) => {

  const [loading, setLoading] = useState<Loading>(props.inputs.length < 4 ? 'Loaded' : 'Loading');

  useEffect(() => {
    setLoading('Loaded');
  }, []);

  const AllInputs = props.inputs.map((inputData, index) => {

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
        widgetRules={props.rules}
        widgetTheme={props.theme}
      />
    );
  });

  return loading === 'Loaded' ? (<>
    {AllInputs}
  </>) : (
    <View
      style={{
        paddingVertical: 20,
      }}
    >
      <ActivityIndicator
        size="large"
        color={props.theme.font}
      />
    </View>
  );
});
