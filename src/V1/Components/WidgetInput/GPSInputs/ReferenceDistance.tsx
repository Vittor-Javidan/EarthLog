import React, { memo } from "react";
import { View } from "react-native";

import { Text } from "@V1/Text/index";
import { WidgetTheme } from "@V1/Types/ProjectTypes";

export const ReferenceDistance = memo((props: {
  referenceDistance: number | null
  theme: WidgetTheme
}) => {

  if (!props.referenceDistance) {
    return <></>;
  }

  let threshHoldColor
  switch(true) {
    case props.referenceDistance <= 30: threshHoldColor = props.theme.confirm; break;
    case props.referenceDistance <= 100: threshHoldColor = props.theme.warning; break;
    default: threshHoldColor = props.theme.wrong; break;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 5,
        gap: 10,
      }}
    >
      <Text p>
        {'Reference Distance:'}
      </Text>
      <Text p
        style={{ color: threshHoldColor }}
      >
        {`${props.referenceDistance} meters`}
      </Text>
    </View>
  );
});