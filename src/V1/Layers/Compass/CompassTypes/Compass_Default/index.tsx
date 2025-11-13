import React, { memo, useState } from "react";
import { View, Dimensions } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Vibration from 'expo-haptics'

import { DefaultCompassConfig } from "@V1/Types/AppTypes";
import { ConfigService } from "@V1/Services/ConfigService";
import { useTimeout } from "@V1/Hooks/index";
import { useAccelerometer } from "@V1/Sensors/Accelerometer";
import { useCompass } from "../../Hooks";

import { LC } from "../../__LC__";

const HORIZONTAL_DEGREES_THRESHOLD = 4;

export const Compass_Default = memo((props: {
  config: DefaultCompassConfig
}) => {

  const {top  , bottom} = useSafeAreaInsets();
  const {width, height} = Dimensions.get('screen');
  const [declination   ,setDeclination   ] = useState(ConfigService.config.compassDeclination);
  const [heading       ,setHeading       ] = useState(0);
  const [pitch         ,setPitch         ] = useState(0);
  const [roll          ,setRoll          ] = useState(0);
  const [z             ,setZ             ] = useState(0);

  useTimeout(() => {
    ConfigService.config.compassDeclination = declination;
    ConfigService.saveConfig();
  }, [declination], 200)

  useCompass({
    phoneOffset: 'PORTRAIT_OFFSET',
    onUpdate: (heading) => setHeading(heading),
  }, [declination]);

  useAccelerometer({
    threshold: HORIZONTAL_DEGREES_THRESHOLD,
    onUpdate: (pitch, roll, z) => {
      setPitch(pitch);
      setRoll(roll);
      setZ(z);
    },
    onHorizontal: () => Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success),
    onExitHorizontal: () => {},
    onMaxDip: () => {},
    onExitMaxDip: () => {},
  });

  return (
    <View
      style={{
        marginTop: top,
        height: height - top - bottom,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        borderWidth: 3,
        borderTopColor:    pitch >  HORIZONTAL_DEGREES_THRESHOLD ? '#f00' : undefined,
        borderBottomColor: pitch < -HORIZONTAL_DEGREES_THRESHOLD ? '#f00' : undefined,
        borderLeftColor:   roll  >  HORIZONTAL_DEGREES_THRESHOLD ? '#f00' : undefined,
        borderRightColor:  roll  < -HORIZONTAL_DEGREES_THRESHOLD ? '#f00' : undefined,
      }}
    >
      <LC.DeclinationInput
        value={declination}
        onDeclinationChange={(number) => setDeclination(number)}
      />
      <LC.Display.Compass
        isHorizontal={(
          Math.abs(pitch) < HORIZONTAL_DEGREES_THRESHOLD &&
          Math.abs(roll) < HORIZONTAL_DEGREES_THRESHOLD
        )}
        heading={heading}
      />
    </View>
  )
})
