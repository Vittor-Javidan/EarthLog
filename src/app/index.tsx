import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, FiraCode_300Light, FiraCode_400Regular, FiraCode_500Medium, FiraCode_600SemiBold, FiraCode_700Bold } from '@expo-google-fonts/fira-code';

import VersionManager from '@VersionManager';
import NetworkManager from '@NetworkManager';

SplashScreen.preventAutoHideAsync();

export default function Home() {

  useLoadResources({
    onFinish: async () => {
      await VersionManager.selectLTSVersion();
    },
  });

  return <></>;
}

function useLoadResources(o: {onFinish: () => void}) {

  const [isFontLoaded] = useFonts({
    FiraCode_300Light,
    FiraCode_400Regular,
    FiraCode_500Medium,
    FiraCode_600SemiBold,
    FiraCode_700Bold,
  });

  useEffect(() => {
    NetworkManager.hasInternetConection().then(connected => {
      if (!connected) {
        o.onFinish();
        return;
      }
      if (isFontLoaded) {
        o.onFinish();
      }
    });
  }, [isFontLoaded]);
}

