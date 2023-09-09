import React, { useState, useMemo } from 'react';

import { Layout } from '@Layout/index';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { LC } from './__LC__';
import { TC } from './__TC__';

export default function LanguagesScreen(): JSX.Element {

  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.LanguagesScreen[language], [language]);
  const [_, refresh] = useState<boolean>(false);

  useBackPress(() => navigate('SETTINGS SCREEN'));

  return (
    <Layout.Root
      title={stringResources['Languages']}
      drawerChildren={<></>}
      navigationTree={<TC.NavigationTree />}
      screenButtons={<TC.ScreenButtons />}
    >
      <Layout.View
        style={{
          paddingTop: 1,
          gap: 1,
        }}
      >
        <LC.LanguageButtons
          onButtonClick={() => refresh(prev => !prev)}
        />
      </Layout.View>
    </Layout.Root>
  );
}
