import React, { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';

import AppRoutes from '@Globals/AppRoutes';
import { languageLabels, Languages, languageTags, LanguageTags, ThemeDTO } from '@Types/index';
import { translations } from '@Translations/index';
import { Translations_LanguagesScreen } from '@Translations/Screens/SettingsScreen/LanguagesScreen';

import ConfigService from '@Services/ConfigService';
import useBackPress from 'app/GlobalHooks';

export default function LanguagesScreen(): JSX.Element {

  const [currentLanguage, setCurrentLanguage] = useState<Languages>(ConfigService.config.language);
  const navController = useRouter();
  const stringResources = useMemo<Translations_LanguagesScreen[Languages]>(
    () => translations.Screens.LanguagesScreen[currentLanguage], [currentLanguage]
  );

  useBackPress(() => exitScreen());

  function exitScreen() {
    navController.push(AppRoutes.SETTINGS_SCREEN);
  }

  function goToHomeScreen() {
    navController.push(AppRoutes.HOME);
  }

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
        <Icon.Home
          key="treeIcon_1"
          onPress={() => goToHomeScreen()}
        />,
        <Icon.Settings
          key="treeIcon_2"
          onPress={() => exitScreen()}
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
