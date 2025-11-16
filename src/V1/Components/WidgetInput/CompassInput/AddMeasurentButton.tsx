import React, { memo } from 'react';
import { WidgetTheme } from '@V1/Types/ProjectTypes';
import { Button } from '@V1/Button/index';

export const AddMeasurementButton = memo((props: {
  showAddMeasurementButton: boolean | undefined
  theme: WidgetTheme
  onAddMeasurement: () => void
}) => {
  return props.showAddMeasurementButton ? (
    <Button.Icon
      iconName="compass"
      onPress={() => props.onAddMeasurement()}
      iconSize={40}
      theme={{
        font:              props.theme.background,
        font_active:       props.theme.font,
        background:        props.theme.font,
        background_active: props.theme.background,
      }}
      style={{
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
        height: 50,
        width: 50,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 25,
      }}
    />
  ) : <></>;
});
