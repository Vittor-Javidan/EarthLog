import React, { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '../../../Components/Layout';

import LogService from '../../../Services/LogService';
import ConfigService from '../../../Services/ConfigService';
import { ThemeDTO } from '../../../Services/ThemeService';

import AppRoutes from '../../Routes';
import { AvailableLanguagesScreen_Translations, languages } from './translations';
import { LanguageTags, Languages, languageLabels, languageTags } from '../../../Types/LanguageTypes';

export default function AvailableLanguagesScreen(): JSX.Element {

  LogService.useLog('LANGUAGES SCREEN: rendered');

  const [currentLanguage, setCurrentLanguage] = useState<Languages>(ConfigService.config.language);
  const navController = useRouter();
  const stringResources = useMemo<AvailableLanguagesScreen_Translations[Languages]>(
    () => languages[currentLanguage], [currentLanguage]
  );


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
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Layout.Icon.Home
          key="treeIcon_1"
          onPress={() => navController.push(AppRoutes.PROJECTS_SCREEN)}
        />,
        <Layout.Icon.Settings
          key="treeIcon_2"
          onPress={() => navController.push(AppRoutes.SETTINGS_SCREEN)}
        />,
      ]}
    >
      <Layout.ScrollView
        style={{ flex: 1 }}
      >
        <AllButtons
          selectedLanguage={currentLanguage}
          onButtonClick={saveSelectedLanguage}
        />
      </Layout.ScrollView>
      <Layout.View>
        <Layout.Button
          title={stringResources['Back']}
          onPress={() => navController.push(AppRoutes.SETTINGS_SCREEN)}
        />
      </Layout.View>
    </Layout.Root>
  );
}

function Drawer() {
  return <></>;
}

function AllButtons(props: {
  selectedLanguage: LanguageTags
  onButtonClick: (languageTag: LanguageTags) => void
}): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return <>
    {
      languageLabels.map((languageLabel, index) => {
        const isSelected = props.selectedLanguage === languageTags[index];
        return (
          <Layout.Button
            key={languageLabel}
            title={languageLabel}
            overrideBackgroundColor={isSelected ? theme.confirm : undefined}
            overrideTextColor={isSelected ? theme.onConfirm : undefined}
            onPress={() => props.onButtonClick(languageTags[index])}
          />
        );
      })
    }
  </>;
}
