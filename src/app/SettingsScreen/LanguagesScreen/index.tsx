import React, { useState, useMemo } from 'react';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';
import LanguageButtons from './LocalComponents/LanguageButtons';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';

export default function LanguagesScreen(): JSX.Element {

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);

  const [_, refresh] = useState<boolean>(false);

  const stringResources = useMemo(() => translations.Screens.LanguagesScreen[language], [language]);

  useBackPress(async () => await useNavigate('SETTINGS SCREEN'));

  return (
    <Layout.Root
      title={stringResources['Languages']}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      <Layout.View>
        <LanguageButtons
          onButtonClick={() => refresh(prev => !prev)}
        />
      </Layout.View>
    </Layout.Root>
  );
}
