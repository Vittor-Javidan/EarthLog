import React, { memo, useCallback, useState } from "react";
import { TextInput } from "react-native";

import { WidgetTheme } from "@V1/Types/ProjectTypes";
import { FontService } from "@V2/Services_Core/FontService";
import { HapticsService } from "@V2/Services/HapticsService";

export const ItemLabel = memo((props: {
  label: string
  lockedData: boolean | undefined
  allowMeasurementLabelChange: boolean | undefined
  theme: WidgetTheme
  onLabelChange: (label: string) => void
}) => {

  const [focused, setFocused] = useState<boolean>(false);

  const onFocus = useCallback(() => {
    setFocused(true);
    HapticsService.vibrate('success');
  }, []);

  const isLabelEmpty = props.label === '';

  return (
    <TextInput
      editable={(props.allowMeasurementLabelChange ?? false) && (!props.lockedData)}
      style={{
        color: focused ? props.theme.background : props.theme.font,
        backgroundColor: focused ? props.theme.font : props.theme.background,
        fontFamily: isLabelEmpty ? FontService.FONT_FAMILY.p : FontService.FONT_FAMILY.h3,
        fontSize: 14,
        borderRadius: 5,
        paddingVertical: 0,
        paddingHorizontal: 5,
        width: '100%',
      }}
      placeholder={'Measurement name'}
      placeholderTextColor={focused ? props.theme.background : props.theme.font_placeholder}
      value={props.label}
      onChangeText={(text) => props.onLabelChange(text)}
      onBlur={() => setFocused(false)}
      onFocus={() => onFocus()}
      multiline
    />
  );
});