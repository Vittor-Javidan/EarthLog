import React, { memo, useMemo } from "react";
import { View } from "react-native";

import { translations } from "@V2/Translations/index";
import { ConfigService } from "@V2/Services/ConfigService";

import { Button } from "@V2/Button/index";
import { Text } from "@V2/Text/index";

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