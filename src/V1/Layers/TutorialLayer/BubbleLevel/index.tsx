import { memo, useCallback, useMemo, useState } from "react";
import { Image, View, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AssetManager } from "@AssetManager";
import { translations } from "@V1/Translations/index";
import { ConfigService } from "@V1/Services/ConfigService";

import { Text } from "@V1/Text/index";
import { LC } from "../__LC__";

export const Tutorial_BubbleLevel = memo((o: {
  onFinish: () => void;
}) => {

  const {top, bottom}    = useSafeAreaInsets();
  const {width, height } = Dimensions.get("screen");
  const config           = useMemo(() => ConfigService.config, []);
  const R                = useMemo(() => translations.layers.tutorial[config.language], []);
  const [dontShowTutorialAgain, setDontShowTutorialAgain] = useState(!ConfigService.config.tutorial_bubbleLevel);
  const [step                 , setStep                 ] = useState(1);

  const onDontShowTutorialAgain = useCallback(async (boolean: boolean) => {
    setDontShowTutorialAgain(boolean);
    ConfigService.config.tutorial_bubbleLevel = !boolean;
    await ConfigService.saveConfig();
  }, [dontShowTutorialAgain])

  return (
    <View
      style={{
        marginTop: top,
        height: height - top - bottom,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >
      {step === 1 && (<>
        <Image
          source={{ uri: AssetManager.getTutorialImage("TUTORIAL_BUBBLE_LEVEL_SURFACE_ANGLE") }}
          height={width - 80}
          width={width - 80}
          resizeMode="contain"
        />
        <Text
          h3
          style={{
            color: "#fff",
            padding: 30,
          }}
        >
          {R['1. Place the side of your device on a surface, at 90° angle.']}
        </Text>
        <LC.TutorialButton label={R['Next']} onPress={() => setStep(2)} />
      </>)}
      {step === 2 && (<>
        <Image
          source={{ uri: AssetManager.getTutorialImage("TUTORIAL_BUBBLE_LEVEL_BASE_ROTATION") }}
          height={width - 80}
          width={width - 80}
          resizeMode="contain"
        />
        <Text
          h3
          style={{
            color: "#fff",
            paddingHorizontal: 30
          }}
        >
          {R['2. Rotate only the base or top of your device, until you see a green circle indicator.']}
        </Text>
        <Text
          p
          style={{
            color: "#fff",
            paddingHorizontal: 30,
            paddingBottom: 30,
          }}
        >
          {R['PS: If you use this often, consider buying your phone a case to protect it while using this feature.']}
        </Text>
        <LC.DontShowAgainCheckbox value={dontShowTutorialAgain} onChange={(value: boolean) => onDontShowTutorialAgain(value)} />
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <LC.TutorialButton label={R['Back']} onPress={() => setStep(1)} />
          <LC.TutorialButton label={R['Finish']} onPress={() => o.onFinish()} />
        </View>
      </>)}
    </View>
  )
})
