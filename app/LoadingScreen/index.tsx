import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import ConfigService from '@Services/ConfigService';
import { Languages } from '@Services/LanguageService';
import { ThemeDTO } from '@Services/ThemeService';

import { LoadingScreenTranslations, languages } from './translations';

export default function LoadingScreen(): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<LoadingScreenTranslations[Languages]>(
    () => languages[ConfigService.config.language], []
  );

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        adjustsFontSizeToFit={true}
        style={{
          fontSize: 36,
          color: theme.onBackground,
        }}
      >
        {stringResources['Loading...']}
      </Text>
    </View>
  );
}
