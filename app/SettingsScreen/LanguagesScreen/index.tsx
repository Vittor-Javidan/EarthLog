import React, { useState, useMemo } from 'react';
import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';
import { useBackPress, useNavigate } from 'app/GlobalHooks';
import AllButtons from './LanguageButtons';

import { LanguageTags } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export default function LanguagesScreen(): JSX.Element {

  const [currentLanguage, setCurrentLanguage] = useState(ConfigService.config.language);

  const stringResources = useMemo(
    () => translations.Screens.LanguagesScreen[currentLanguage], [currentLanguage]
  );

  useBackPress(() => useNavigate('SETTINGS SCREEN'));

  async function saveSelectedLanguage(languageTag: LanguageTags) {
    ConfigService.config.language = languageTag;
    await ConfigService.saveConfig();
    setCurrentLanguage(languageTag);
  }

  return (
    <Layout.Root
      title={stringResources['Languages']}
      iconName="language"
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => useNavigate('HOME SCREEN')}
        />,
        <Icon.Settings
          key="treeIcon_2"
          onPress={() => useNavigate('SETTINGS SCREEN')}
        />,
      ]}
    >
      <Layout.ScrollView>
        <AllButtons
          selectedLanguage={currentLanguage}
          onButtonClick={saveSelectedLanguage}
        />
      </Layout.ScrollView>
    </Layout.Root>
  );
}
