import { useEffect } from 'react';
import { BackHandler } from 'react-native';

import ApticsService from '@Services/ApticsService';

export function useBackPress(onPress: () => void) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onPress();
        ApticsService.vibrate('success');
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
