import { useEffect } from 'react';
import { BackHandler } from 'react-native';

import { HapticsService } from '@V2/Services/HapticsService';

export function useBackPress(
  onPress: () => void,
  deps: React.DependencyList,
) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onPress();
        HapticsService.vibrate('success');
        return true;
      },
    );
    return () => backHandler.remove();
  }, deps);
}

export function useTimeout(
  execute: () => void,
  deps: React.DependencyList,
  delay: number,
) {
  useEffect(() => {
    const timer = setTimeout(() => {
      execute();
    }, delay);

    return () => clearInterval(timer);
  }, deps);
}
