import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';

import { Text } from '@Text/index';
import HapticsService from '@Services/HapticsService';

export default function LastProjectButton() {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.homeScreen[config.language], []);

  const [pressed, setPressed] = useState<boolean>(false);

  const lastProjectSettings = CacheService.lastOpenProject;
  const lastProjectOpenExist = lastProjectSettings.id_project !== '';

  function onPressIn() {
    setPressed(true);
    HapticsService.vibrate('success');
  }

  function onPress() {
    navigate('PROJECT SCOPE', lastProjectSettings.id_project);
    HapticsService.vibrate('success');
  }

  return lastProjectOpenExist ? (
    <View
      style={{
        height: 55,
        width: '100%',
      }}
    >
      <Pressable
        onPressIn={() => onPressIn()}
        onPressOut={() => setPressed(false)}
        onPress={() => onPress()}
        style={{
          flex: 1,
          justifyContent: 'center',
          borderRadius: 10,
          backgroundColor: pressed ? theme.background : theme.background_Button,
          paddingLeft: 10,
        }}
      >
        <Text h1
          style={{
            color: theme.font_Button,
            fontWeight: '900',
          }}
        >
          {lastProjectSettings.name}
        </Text>
        <Text p
          style={{
            position: 'absolute',
            right: 5,
            bottom: 0,
            color: theme.font_Button,
            alignSelf: 'flex-end',
          }}
        >
          {R['Recently Open']}
        </Text>
      </Pressable>
    </View>
  ) : <></>;
}
