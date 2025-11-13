import React, { memo, useState } from "react";
import { View, Dimensions } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ConfigService } from "@V1/Services/ConfigService";
import { useTimeout } from "@V1/Hooks/index";
import { useAccelerometer } from "@V1/Sensors/Accelerometer";
import { useCompass } from "../../Hooks";

import { LC } from "../../__LC__";

const HORIZONTAL_DEGREES_THRESHOLD = 4;
const DIP_DEGREES_THRESHOLD = 4;

export const Compass_Default = memo(() => {

  const {top  , bottom} = useSafeAreaInsets();
  const {width, height} = Dimensions.get('screen');
  const [declination   ,setDeclination   ] = useState(ConfigService.config.compassDeclination);
  const [compass       ,setCompass       ] = useState<'COMPASS' | 'BUBBLE'>('COMPASS'); 
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
    threshold: compass === 'COMPASS' ? HORIZONTAL_DEGREES_THRESHOLD : DIP_DEGREES_THRESHOLD,
    onUpdate: (pitch, roll, z) => {
      setPitch(pitch);
      setRoll(roll);
      setZ(z);
    },
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
        paddingBottom: 80,
      }}
    >
      <LC.DeclinationInput
        value={declination}
        onDeclinationChange={(number) => setDeclination(number)}
      />
      {compass === 'COMPASS' && (<>
        <View>
          <LC.Display.Compass
            heading={heading}
            pitch={pitch}
            roll={roll}
            horizontalThreshold={HORIZONTAL_DEGREES_THRESHOLD}
          />
          <LC.Display.MiniBubbleLevel
            pitch={pitch}
            roll={roll}
            onPress={() => setCompass('BUBBLE')}
            style={{
              position: 'absolute',
              right: 0,
              bottom: -70,
            }}
          />
        </View>
      </>)}
      {compass === 'BUBBLE' && (<>
        <View>
          <LC.Display.BubbleLevel
            pitch={pitch}
            roll={roll}
            z={z}
            dipThreshold={DIP_DEGREES_THRESHOLD}
          />
          <LC.Display.MiniCompass
            heading={heading}
            onPress={() => setCompass('COMPASS')}
            style={{
              position: 'absolute',
              right: 0,
              bottom: -70,
            }}
          />
        </View>
      </>)}
    </View>
  )
})
