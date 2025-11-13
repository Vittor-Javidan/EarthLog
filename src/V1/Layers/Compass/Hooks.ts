import { useMagnetometer } from "@V1/Sensors/Magnetometer";
import { MagnetometerMeasurement } from "expo-sensors";
import { useCallback, useEffect, useState } from "react";

type PhoneOffset = 'PORTRAIT_OFFSET';

export function useCompass(o: {
  phoneOffset: PhoneOffset,
  onUpdate: (heading: number) => void,
}, deps: [declination: number]) {

  const [declination] = deps;
  const [lastValues    ,setLastValues    ] = useState<number[]>([]);

  const calculateNorth = useCallback((
    measure: MagnetometerMeasurement,
    declination: number,
    phoneOffset: PhoneOffset
  ) => {

    let PORTRAIT_OFFSET;
    switch (phoneOffset) {
      case 'PORTRAIT_OFFSET': PORTRAIT_OFFSET = -90; break;
    }

    let { x, y } = measure;
    let angle = 0;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }

    angle += declination;
    angle += PORTRAIT_OFFSET;

    if (angle >= 360) {
      angle -= 360;
    } else if (angle < 0) {
      angle += 360;
    }

    return angle;

  }, [o.phoneOffset])

  useEffect(() => {
    if (lastValues.length === 0) return;
    const avg = lastValues.reduce((a, b) => a + b, 0) / lastValues.length;
    o.onUpdate(avg);
  }, [lastValues, declination]);

  useMagnetometer({
    onUpdate: (measure) => {
      const angle = calculateNorth(measure, declination, o.phoneOffset);
      setLastValues(prev => {
        const lastValues = [...prev, angle];
        if (lastValues.length > 20) { lastValues.shift() }
        return lastValues;
      })
    },
  }, [declination, o.phoneOffset]);
}