import { useCallback } from "react";
import { MagnetometerMeasurement } from "expo-sensors";
import { useInterval } from "@V2/Hooks/index";
import { useMagnetometer } from "@V2/Sensors/Magnetometer";

type PhoneOffset = 'PORTRAIT_OFFSET';

export function useCompass(o: {
  phoneOffset: PhoneOffset,
  onUpdate: (heading: number) => void,
}, deps: [declination: number]) {

  const [declination] = deps;

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

  useMagnetometer({
    onUpdate: (measure) => {
      const angle = calculateNorth(measure, declination, o.phoneOffset);
      o.onUpdate(angle);
    },
  }, [declination, o.phoneOffset]);
}

export function useConfirmThreshold(o: {
  onConfirm: () => void,
}, deps: [trigger: boolean]) {
  const [trigger] = deps;
  useInterval(() => {
    if (trigger) {
      o.onConfirm();
    }
  }, [trigger], 100);
}