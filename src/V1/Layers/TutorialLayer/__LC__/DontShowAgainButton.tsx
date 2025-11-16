import React, { memo, useMemo } from "react";
import { View } from "react-native";

import { translations } from "@V1/Translations/index";
import { ConfigService } from "@V1/Services/ConfigService";

import { Button } from "@V1/Button/index";
import { Text } from "@V1/Text/index";

export const DontShowAgainCheckbox = memo((props: {
  value: boolean;
  onChange: (value: boolean) => void;
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.layers.tutorial[config.language], []);

  return (
    <View
      style={{
        marginBottom: 30,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Button.Checkbox
        value={props.value}
        onChange={(value: boolean) => props.onChange(value)}
        theme={{
          background: "#fff",
          confirm: "#0f0",
          font: "#fff"
        }}
      />
      <Text
        style={{ color: "#fff" }}
      >
        {R["Don't show this tutorial again."]}
      </Text>
    </View>
  )
});