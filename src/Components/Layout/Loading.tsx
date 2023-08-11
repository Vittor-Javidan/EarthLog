import React, { useMemo } from 'react';

import { Languages, ThemeDTO } from '@Types/index';
import { translations } from '@Translations/index';
import { Translations_Layout_Loading } from '@Translations/Layout/LoadingScreen';

import ConfigService from '@Services/ConfigService';
import View from './View';
import H1 from './Text/H1';

export default function Loading(): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<Translations_Layout_Loading[Languages]>(
    () => translations.Layout.Loading[ConfigService.config.language], []
  );

  return (
    <View
      style={{
        backgroundColor: theme.modified,
        alignItems: 'center',
      }}
    >
      <H1
        style={{ color: theme.onModified }}
      >
        {stringResources['Loading...']}
      </H1>
    </View>
  );
}
