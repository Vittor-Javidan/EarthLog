import React, { useMemo } from 'react';
import View from './View';
import H1 from './Text/H1';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export default function Loading(): JSX.Element {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Layout.Loading[language], []);

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
