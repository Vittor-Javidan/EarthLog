import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import * as Vibration from 'expo-haptics';

export function useBackPress(onPress: () => void) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onPress();
        Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
}

export function useTimeout(
  execute: () => void,
  deps: React.DependencyList | undefined,
  delay: number,
) {
  useEffect(() => {
    const timer = setTimeout(() => {
      execute();
    }, delay);

    return () => clearInterval(timer);
  }, deps);
}
