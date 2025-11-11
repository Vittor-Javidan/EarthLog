import { MagnetometerMeasurement } from "expo-sensors";

/** 
 * - `Key`: Device heading
 * - `Value`: Real Compass heading*/
type DeviceDriftMap = Record<number, number>;

export class CompassService {

  /** Not used yet */
  static getRealCompassHeading(
    dictionaryDeviceCompass: DeviceDriftMap,
    deviceCompassHeading: number
  ): number {

    /**
     * Converts dictionary into sorted array of pairs
     * - pair[index][ `0: deviceCompass` | `1: realCompass` ]
     */
    const pairs = Object.entries(dictionaryDeviceCompass)
    .map(([x, y]) => [Number(x), Number(y)])
    .sort((a, b) => a[0] - b[0]);

    const maxIndex = pairs.length - 1;
    let realHeading = 0;

    // Value smaller than min index case
    if (deviceCompassHeading < pairs[0][0]) {
      const y1 = 0;
      const y2 = pairs[0][1];
      const x1 = 0;
      const x2 = pairs[0][0];

      const m = (y2 - y1) / (x2 - x1);
      const b = y1 - m * x1;
      realHeading = m * deviceCompassHeading + b;
      return realHeading;
    }

    for (let i = 0; i < pairs.length; i++) {
      if (
        i !== maxIndex &&
        deviceCompassHeading >= pairs[i][0] &&
        deviceCompassHeading < pairs[i + 1][0]
      ) {
        const y1 = pairs[i][1];
        const y2 = pairs[i + 1][1];
        const x1 = pairs[i][0];
        const x2 = pairs[i + 1][0];

        // f(x) = mx + b
        // f(x) = real compass heading
        // x = device compass heading
        const m = (y2 - y1) / (x2 - x1);
        const b = y1 - m * x1;
        realHeading = m * deviceCompassHeading + b;
        break;
      }
    }

    // Max index case
    const y1 = pairs[maxIndex][1];
    const y2 = 360;
    const x1 = pairs[maxIndex][0];
    const x2 = 360;

    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;
    realHeading = m * deviceCompassHeading + b;
    return realHeading;
  }

  static calculateNorth (o: {
    measure: MagnetometerMeasurement,
    declination: number
    onResult: (angle: number) => void
  }) {

    const PORTRAIT_OFFSET = -90;

    let { x, y } = o.measure;
    let angle = 0;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }

    angle += o.declination;
    angle += PORTRAIT_OFFSET;

    if (angle >= 360) {
      angle -= 360;
    } else if (angle < 0) {
      angle += 360;
    }

    o.onResult(angle);
  }
}