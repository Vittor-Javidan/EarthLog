import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';

import { Text } from '@Text/index';

export const LastProjectButton = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.homeScreen[config.language], []);

  const [pressed, setPressed] = useState<boolean>(false);

  const lastProjectSettings = CacheService.lastOpenProject;
  const lastProjectOpenExist = lastProjectSettings.id_project !== '';

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    navigate('PROJECT SCOPE', lastProjectSettings.id_project);
    HapticsService.vibrate('success');
  }, [lastProjectSettings.id_project]);

  return lastProjectOpenExist ? (
    <View
      style={{
        minHeight: 55,
        width: '100%',
      }}
    >
      <Pressable
        onPressIn={() => onPressIn()}
        onPressOut={() => setPressed(false)}
        onPress={() => onPress()}
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingTop: 4,
          borderRadius: 10,
          backgroundColor: pressed ? theme.background_active : theme.background_Button,
          paddingHorizontal: 10,
          elevation: 3,
        }}
      >
        <Text h2
          numberOfLine={1}
          style={{
            color: pressed ? theme.font_active : theme.font_Button,
            fontWeight: '900',
          }}
        >
          {lastProjectSettings.name}
        </Text>
        <Text p
          style={{
            color: pressed ? theme.font_active : theme.font_Button,
            alignSelf: 'flex-end',
            paddingBottom: 4,
            paddingHorizontal: 4,
          }}
        >
          {R['Recently Open']}
        </Text>
      </Pressable>
    </View>
  ) : <></>;
});
