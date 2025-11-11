import React, { memo, useEffect, useState } from "react";
import { View } from "react-native";
import { Magnetometer } from 'expo-sensors';

import { ConfigService } from "@V2/Services/ConfigService";
import { CompassService } from "@V2/Services/CompassService";
import { useTimeout } from "@V2/Hooks/index";

import { CompassType_Default } from "./CompassTypes/Default";
import { DeclinationInput } from "./DeclinationInput";

export const Compass = memo(() => {

  const [declination   , setDeclination   ] = useState(ConfigService.config.compassDeclination);
  const [heading       , setHeading       ] = useState(0);
  const [lastValues    , setLastValues    ] = useState<number[]>([]);

  useEffect(() => {
    // calculate average of lastValues to smooth heading
    if (lastValues.length === 0) return;
    const avg = lastValues.reduce((a, b) => a + b, 0) / lastValues.length;
    setHeading(avg);
  }, [lastValues, declination]);

  useEffect(() => {
    // Initialize magnetometer subscription
    const compassSubscription = Magnetometer.addListener(measure => {

      CompassService.calculateNorth({ declination, measure,
        onResult: (angle: number) => {
          setLastValues(prev => {
            const lastValues = [...prev, angle];
            if (lastValues.length > 10) { lastValues.shift() }
            return lastValues;
          })
        }
      });

    })
    Magnetometer.setUpdateInterval(100);
    return () => compassSubscription.remove();
  }, [declination]);

  useTimeout(() => {
    ConfigService.config.compassDeclination = declination;
    ConfigService.saveConfig();
  }, [declination], 200)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
      }}
    >
      <CompassType_Default
        heading={heading}
      />
      <DeclinationInput
        value={declination}
        onDeclinationChange={(number) => setDeclination(number)}
      />
    </View>
  )
})
