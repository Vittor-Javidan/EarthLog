import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';

import { Text } from '@Text/index';

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
          backgroundColor: pressed ? theme.background : theme.background_Button,
          paddingHorizontal: 10,
        }}
      >
        <Text h2
          numberOfLine={1}
          style={{
            color: theme.font_Button,
            fontWeight: '900',
          }}
        >
          {lastProjectSettings.name}
        </Text>
        <Text p
          style={{
            color: theme.font_Button,
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
}
