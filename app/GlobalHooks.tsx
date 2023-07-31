import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export default function useBackPress(onPress: () => void) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onPress();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
}
