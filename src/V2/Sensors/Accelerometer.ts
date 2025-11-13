import { useEffect } from "react";
import { Accelerometer } from "expo-sensors";

export function useAccelerometer(o: {
  threshold: number,
  onUpdate: (pitch: number, roll: number, z: number) => void,
}) {
  useEffect(() => {

    Accelerometer.setUpdateInterval(100);

    const sensorSubscription = Accelerometer.addListener(({ x, y, z }) => {

      const radToDeg = (r: number) => (r * 180) / Math.PI;
      const pitchRad = Math.atan2(y, Math.sqrt(x * x + z * z));
      const rollRad = Math.atan2(-x, Math.sqrt(y * y + z * z));
      const zRad = Math.atan2(z, Math.sqrt(x * x + y * y));
      const pitchDeg = radToDeg(pitchRad);
      const rollDeg = radToDeg(rollRad);
      const zDeg = radToDeg(zRad);

      o.onUpdate(pitchDeg, rollDeg, zDeg);
    });

    return () => {
      sensorSubscription.remove();
    };

  }, []);
}
