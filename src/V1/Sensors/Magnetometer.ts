import { useEffect } from "react";
import { Magnetometer, MagnetometerMeasurement } from "expo-sensors";

export function useMagnetometer(o: {
  onUpdate: (measure: MagnetometerMeasurement) => void,
}, deps: React.DependencyList) {
    Magnetometer.setUpdateInterval(100);
    useEffect(() => {
    const sensorSubscription = Magnetometer.addListener(measure => {
      o.onUpdate(measure);
    })
    return () => sensorSubscription.remove();
  }, deps);
}