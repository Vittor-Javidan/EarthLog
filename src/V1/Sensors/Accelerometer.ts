import { useEffect } from "react";
import { Accelerometer as ExpoAccelerometer } from "expo-sensors";

export function useAccelerometer(o: {
  threshold: number,
  onUpdate: (pitch: number, roll: number, z: number) => void,
  onHorizontal: () => void,
  onExitHorizontal: () => void
  onMaxDip: () => void,
  onExitMaxDip: () => void
}) {
  useEffect(() => {

    ExpoAccelerometer.setUpdateInterval(100);

    const sensorSubscription = ExpoAccelerometer.addListener(({ x, y, z }) => {

      const radToDeg = (r: number) => (r * 180) / Math.PI;
      const pitchRad = Math.atan2(y, Math.sqrt(x * x + z * z));
      const rollRad = Math.atan2(-x, Math.sqrt(y * y + z * z));
      const zRad = Math.atan2(z, Math.sqrt(x * x + y * y));
      const pitchDeg = radToDeg(pitchRad);
      const rollDeg = radToDeg(rollRad);
      const zDeg = radToDeg(zRad);


      o.onUpdate(pitchDeg, rollDeg, zDeg);

      // For Heading Measurement
      (Math.abs(pitchDeg) < o.threshold && Math.abs(rollDeg) < o.threshold)
      ? o.onHorizontal()
      : o.onExitHorizontal();

      // For Dip Measurement
      (Math.abs(zDeg) < o.threshold)
      ? o.onMaxDip()
      : o.onExitMaxDip();
    });

    return () => {
      sensorSubscription.remove();
    };

  }, []);
}
