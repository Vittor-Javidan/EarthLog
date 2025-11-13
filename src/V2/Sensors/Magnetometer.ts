import { useEffect } from "react";
import { Magnetometer, MagnetometerMeasurement } from "expo-sensors";

export function useMagnetometer(o: {
  onUpdate: (measure: MagnetometerMeasurement) => void,
}, deps: React.DependencyList) {
    useEffect(() => {
    const sensorSubscription = Magnetometer.addListener(measure => {
      o.onUpdate(measure);
    })
    Magnetometer.setUpdateInterval(100);
    return () => sensorSubscription.remove();
  }, [deps]);
}