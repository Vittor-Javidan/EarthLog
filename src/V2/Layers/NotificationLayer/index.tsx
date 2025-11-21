import { memo, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Z_INDEX } from "@V2/Globals/zIndex";
import { ConfigService } from "@V2/Services/ConfigService";
import { ThemeService } from "@V2/Services_Core/ThemeService";
import { NotificationAPI, NotificationIcons } from "../API/Notification";

import { Icon } from "@V2/Icon/index";

export const NotificationLayer = memo(() => {

  const { bottom } = useSafeAreaInsets();
  const config     = useMemo(() => ConfigService.config, []);
  const theme      = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const [blinking, setBlinking] = useState<boolean>(false);

  const [icons, setIcons] = useState<NotificationIcons>({
    gpsAcquisition: false,
    tutorialMode: ConfigService.config.tutorialMode,
  })

  NotificationAPI.registerIconSetter(setIcons);
  
  useEffect(() => {
    const anythingActive = Object.keys(icons).length > 0;
    const interval = setInterval(() => {
      anythingActive === true
      ? setBlinking(prev => !prev)
      : setBlinking(false);
    }, 250);
    return () => clearInterval(interval);
  }, [icons]);
  

  return blinking ? (
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        bottom: bottom,
        right: 0,
        zIndex: Z_INDEX.LAYER_NOTIFICATION,
        backgroundColor: theme.confirm,
        borderTopLeftRadius: 3,
      }}
    >
      {icons.gpsAcquisition && (
        <Icon
          iconName="crosshairs-gps"
          fontSize={20}
          color={theme.background}
        />
      )}
      {icons.tutorialMode && (
        <Icon
          iconName="menu-book"
          fontSize={20}
          color={theme.background}
        />
      )}
    </View>
  ) : <></>;
});