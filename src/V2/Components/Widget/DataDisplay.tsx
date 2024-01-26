import React, { useState, useEffect, memo } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Loading } from '@V2/Types/AppTypes';
import { GPS_DTO, InputData, WidgetRules, WidgetScope, WidgetTheme } from '@V2/Types/ProjectTypes';

import { Animation } from '@V2/Animation/index';
import { WidgetInput } from '@V2/WidgetInput/index';

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

  const [loading, setLoading] = useState<Loading>(props.inputs.length < 4 ? 'Loaded' : 'Loading');

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

  useEffect(() => {
    setLoading('Loaded');
  }, []);

  return loading === 'Loaded' ? (
    <Animation.FadeOut
      delay={30}
      duration={100}
      style={{
        gap: 20,
      }}
    >
      {AllInputs}
    </Animation.FadeOut>
  ) : (
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
