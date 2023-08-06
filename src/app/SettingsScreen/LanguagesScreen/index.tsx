import React, { useState, useMemo } from 'react';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';
import AllButtons from './LanguageButtons';

import { LanguageTags } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export default function LanguagesScreen(): JSX.Element {

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const stringResources = useMemo(
    () => translations.Screens.LanguagesScreen[currentLanguage], [currentLanguage]
  );

  useBackPress(async () => await useNavigate('SETTINGS SCREEN'));

  async function saveSelectedLanguage(languageTag: LanguageTags) {
    ConfigService.config.language = languageTag;
    await ConfigService.saveConfig();
    setCurrentLanguage(languageTag);
  }

  return (
    <Layout.Root
      title={stringResources['Languages']}
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={async () => await useNavigate('HOME SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="settings"
          onPress={async () => await useNavigate('SETTINGS SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_3"
          iconName="language"
        />,
      ]}
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.primary}
          color={theme.onPrimary}
          onPress={async () =>   await useNavigate('SETTINGS SCREEN')}
        />
      }
    >
      <AllButtons
        selectedLanguage={currentLanguage}
        onButtonClick={saveSelectedLanguage}
      />
    </Layout.Root>
  );
}
