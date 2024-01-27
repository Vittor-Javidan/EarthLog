import React, { memo, useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

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

  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.height > 0) {
      setStartAnimation(true);
    }
  }, []);

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
      start={startAnimation}
      duration={300}
      onLayout={event => onLayout(event)}
      style={{
        gap: 20,
      }}
    >
      {AllInputs}
    </Animation.FadeOut>
  );
});
