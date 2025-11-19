import React, { memo, useCallback, useMemo, useState } from "react";
import { View } from "react-native";

import { translations } from "@V1/Translations/index";
import { ConfigService } from "@V1/Services/ConfigService";

import { Text } from "@V1/Text/index";
import { LC } from "../__LC__";

export const Tutorial_Map = memo((props: {
  onFinish: () => void;
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.layers.tutorial[config.language], []);
  const [dontShowTutorialAgain, setDontShowTutorialAgain] = useState(!ConfigService.config.tutorial_map);

  const onDontShowTutorialAgain = useCallback(async (boolean: boolean) => {
    setDontShowTutorialAgain(boolean);
    ConfigService.config.tutorial_map = !boolean;
    await ConfigService.saveConfig();
  }, [dontShowTutorialAgain])

  return (
    <LC.TutorialScreen>
      <View
        style={{ gap: 10 }}
      >
        <Text h1
          style={{
            color: "#fff",
            paddingHorizontal: 30,
            textAlign: "justify",
          }}
        >
          {R['Important']}
        </Text>
        <Text h3
          style={{
            color: "#fff",
            paddingHorizontal: 30,
            textAlign: "justify",
          }}
        >
          {R['Every time the app starts fresh, it assumes no subscription is active. The subscription status is then retrieved directly from the Play Store when an internet connection is available.']}
        </Text>
        <Text h3
          style={{
            color: "#fff",
            paddingHorizontal: 30,
            textAlign: "justify",
          }}
        >
          {R['So, to access the map offline, please open the app at least once before starting your work, while you have an internet connection.']}
        </Text>
        <Text p
          style={{
            color: "#fff",
            paddingHorizontal: 30,
            textAlign: "justify",
          }}
        >
          {R['PS: You can minimize the app afterward, but avoid killing its background process to ensure the map remains available offline.']}
        </Text>
      </View>
      <View>
        <LC.DontShowAgainCheckbox value={dontShowTutorialAgain} onChange={(value: boolean) => onDontShowTutorialAgain(value)} />
        <LC.TutorialButton label={R['Finish']} onPress={() => props.onFinish()} />
      </View>
    </LC.TutorialScreen>
  )
})